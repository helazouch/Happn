import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import "./Participation.css";
import Navbar from "./components/NavbarParticipant";
import UploadInvoiceModal from "./UploadInvoiceModal";
import { Version } from "../../DataLayer/models/Version";

interface ParticipationWithVersion {
  versionId?: string;
  paymentSubmitted?: boolean;
  paymentProofUrl?: string;
  paymentVerified?: boolean;
  status?: string;
  id?: string;
  version?: Version;
}

const Participation = () => {
  const [participations, setParticipations] = useState<
    ParticipationWithVersion[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedParticipation, setSelectedParticipation] =
    useState<ParticipationWithVersion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const participationsQuery = query(
          collection(db, "participations"),
          where("participantId", "==", user.uid)
        );
        const participationsSnapshot = await getDocs(participationsQuery);

        const participationsData: ParticipationWithVersion[] = [];

        for (const docSnap of participationsSnapshot.docs) {
          const participation = {
            id: docSnap.id,
            ...docSnap.data(),
          } as ParticipationWithVersion;

          if (participation.versionId) {
            const versionRef = doc(db, "versions", participation.versionId);
            const versionSnap = await getDoc(versionRef);
            if (versionSnap.exists()) {
              participation.version = versionSnap.data() as Version;
            }
          }

          participationsData.push(participation);
        }

        setParticipations(participationsData);
      } catch (error) {
        console.error("Error fetching participations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  const openModal = (participation: ParticipationWithVersion) => {
    setSelectedParticipation(participation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParticipation(null);
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (date: any) => {
    const d = date instanceof Date ? date : date?.toDate?.();
    if (!d) return "Unknown Date";
    return (
      <div className="date-format">
        <span className="month">
          {d.toLocaleString("en-US", { month: "short" }).toUpperCase()}
        </span>
        <span className="day">{d.getDate()}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="main-container1">
        <Navbar />
        <div className="content-container1">
          <div className="loading-state">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  const isAuthenticated = sessionStorage.getItem("connexion");
    if (!isAuthenticated || isAuthenticated.trim() === "") {
      return (
        <div style={{ textAlign: "center", marginTop: "100px", fontSize: "24px", color: "red" }}>
          Accès non autorisé
        </div>
      );
    }

  return (
    <div className="main-container1">
      <Navbar />
      <div className="content-container1">
        {participations.length === 0 ? (
          <div className="empty-state">No participations found.</div>
        ) : (
          <div className="participation-list">
            {participations.map((participation) => (
              <div key={participation.id} className="participation-item">
                <div className="date-column">
                  {formatDate(participation.version?.date)}
                </div>

                <div className="info-column1">
                  <h3 className="version-name">
                    {participation.version?.versionName}
                  </h3>
                  {participation.paymentSubmitted &&
                  participation.paymentProofUrl ? (
                    <a
                      href={participation.paymentProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="invoice-link"
                    >
                      View Submitted Invoice
                    </a>
                  ) : (
                    <a
                      className="invoice-link invoice-submit"
                      onClick={() => openModal(participation)}
                    >
                      Submit Invoice
                    </a>
                  )}
                </div>

                <div className="status-column">
                  <div className="status-circle participation"></div>
                  <span className="status-label">Participation</span>
                  <div
                    className={`status-circle ${
                      participation.paymentSubmitted ? "payment" : "pending"
                    }`}
                  ></div>
                  <span className="status-label">Payment</span>
                  <div
                    className={`status-circle ${
                      participation.paymentVerified ? "confirmation" : "pending"
                    }`}
                  ></div>
                  <span className="status-label">Confirmation</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedParticipation?.id && (
        <UploadInvoiceModal
          participation={{ id: selectedParticipation.id }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Participation;

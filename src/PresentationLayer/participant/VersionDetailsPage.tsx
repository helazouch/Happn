import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../ServiceLayer/firebase/firebaseConfig.ts";
import { Version } from "../../DataLayer/models/Version.ts";
import "./VersionDetailsPage.css";
import NavbarParticipant from "./components/NavbarParticipant.tsx";

const VersionDetailsPage: React.FC = () => {
  const { id_version } = useParams<{ id_version: string }>();
  const [version, setVersion] = useState<Version | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id_version) return;

    const fetchVersionDetails = async () => {
      try {
        const versionRef = doc(db, "versions", id_version);
        const versionSnapshot = await getDoc(versionRef);

        if (versionSnapshot.exists()) {
          setVersion(versionSnapshot.data() as Version);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Failed to load event details");
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersionDetails();
  }, [id_version]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="version-details-page">
      <NavbarParticipant />
      <div className="version-details-container">
        {version && (
          <>
            {/* First Column - Image, Description and Planning */}
            <div className="content-column image-description-column">
              <div className="event-image-container">
                <img
                  src={version.img || "/LunarHack.jpg"}
                  alt={version.versionName}
                  className="event-image"
                />
              </div>
              <div className="description-section">
                <h3>Description</h3>
                <p>{version.specificDescription}</p>
              </div>
              <div className="planning-section">
                <h3>Event Planning</h3>
                {version.planning ? (
                  <a
                    href={version.planning}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the detailed planning here
                  </a>
                ) : (
                  <p>No planning available</p>
                )}
              </div>
            </div>

            {/* Second Column - Event Info */}
            <div className="content-column info-column">
              <div className="info-box">
                <h3>Event Info</h3>
                <div className="info-item">
                  <strong>Place:</strong> <span>{version.place}</span>
                </div>
                <div className="info-item">
                  <strong>Date:</strong>{" "}
                  <span>
                    {version.date instanceof Date
                      ? version.date.toLocaleDateString()
                      : version.date.toDate().toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Price:</strong> <span>${version.price}</span>
                </div>
                <div className="info-item">
                  <strong>Capacity:</strong> <span>{version.capacity}</span>
                </div>
                <div className="info-item">
                  <strong>Participants:</strong>{" "}
                  <span>{version.nbparticipants}</span>
                </div>
              </div>
            </div>

            {/* Third Column - Chatbot (full height) */}
            <div className="content-column chatbot-column">
              <div className="chatbot-box-wrapper">
                <div className="chatbot-box">
                  <h4>Need Help? Ask our Chatbot!</h4>
                  <div className="chatbot-container">
                    <textarea
                      placeholder="Ask me anything..."
                      className="chatbot-input"
                    />
                    <button className="chatbot-submit">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VersionDetailsPage;

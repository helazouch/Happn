import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../ServiceLayer/firebase/firebaseConfig";

import EventSlider from "./components/EventSlider";
import "./LandingPage.css";
import HeaderComponent from "./components/HeaderComponent";

import Footer from "./Landing_stuff/HappnComponents/Footer/Footer";
import { Version } from "../../DataLayer/models/Version";
import EventSectionWithSearch from "./Landing_stuff/EventSectionWithSearch";

const LandingPage = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch versions for EventSlider
        const versionsSnapshot = await getDocs(collection(db, "versions"));
        const fetchedVersions: Version[] = versionsSnapshot.docs.map((doc) => ({
          id_version: doc.id,
          ...doc.data(),
        })) as Version[];
        setVersions(fetchedVersions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="landing-page">
        <HeaderComponent />
        {loading ? (
          <p className="loading-text">Loading versions...</p>
        ) : (
          <EventSlider versions={versions} autoSlideInterval={6000} />
        )}
      </div>

      <div>
        <EventSectionWithSearch versions={versions} />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

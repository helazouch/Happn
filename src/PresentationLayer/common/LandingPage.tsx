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
  console.log("Contenu de sessionStorage :");
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      console.log(`${key}: ${sessionStorage.getItem(key)}`);
    }
  }

  return (
    <div>
      <div className="landing-page" >
        <HeaderComponent />
        {loading ? (
          <p className="loading-text">Loading versions...</p>
        ) : (
          <EventSlider versions={versions} autoSlideInterval={6000} />
        )}
      </div>
        <div id="events">
            <EventSectionWithSearch versions={versions} />
            <div className="about-us-section" id="aboutus">
          <h2>About Us</h2>
          <p>
          We are a passionate and driven team committed to organizing meaningful and innovative events that inspire, connect, and empower people. Our goal is to create a dynamic space where creativity, collaboration, and knowledge sharing thrive.
          With a strong focus on community and growth, we strive to bring together individuals from diverse backgrounds to learn from one another, build valuable relationships, and explore new opportunities.
          Every event we organize is designed to leave a lasting impact — not just through engaging content and experiences, but by fostering a sense of belonging and inspiration that continues long after the event is over.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

import EventSlider from "./components/EventSlider";
import "./LandingPage.css";
import HeaderComponent from "./components/HeaderComponent";

const LandingPage = () => {
  const events = [
    {
      id: 1,
      imageUrl: "CyberHorizon.jpg",
      title: "Summer Music Festival",
      date: "June 15-17, 2023",
    },
    {
      id: 2,
      imageUrl: "LunarHack.jpg",
      title: "Tech Conference",
      date: "July 22-24, 2023",
    },
  ];

  return (
    <div className="landing-page">
      <HeaderComponent></HeaderComponent>
      <EventSlider events={events} autoSlideInterval={6000} />
    </div>
  );
};

export default LandingPage;

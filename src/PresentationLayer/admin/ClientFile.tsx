import EventCard from "./components/EventCard";
import Navbar from "./components/Navbar";
import img1 from "../../assets/clientfile1.jpg";
import img2 from "../../assets/clientfile2.png";

const ClientFile = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content-container">
        <div className="flex flex-col items-center gap-4 p-6">
          <EventCard
            image={img1}
            eventName="Wonder Girls 2010 World Tour San Francisco"
            clientName="John Doe"
          />
          <EventCard
            image={img2}
            eventName="Coachella 2025"
            clientName="Alice Smith"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientFile;

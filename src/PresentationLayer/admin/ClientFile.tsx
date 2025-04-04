import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import { Participation } from "../../DataLayer/models/Participation";
import { ParticipationRepository } from "../../DataLayer/repositories/ParticipationRepository";
import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import { VersionRepository } from "../../DataLayer/repositories/VersionRepository";
import { Event } from "../../DataLayer/models/Event";
import { Version } from "../../DataLayer/models/Version";
import img1 from "../../assets/clientfile1.jpg";
import img2 from "../../assets/clientfile2.png";

const ClientFile = () => {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [eventsMap, setEventsMap] = useState<Record<string, Event>>({});
  const [versionNames, setVersionNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      const participationsList = await ParticipationRepository.getAll1();
      setParticipations(participationsList);

      // Récupérer tous les événements
      const eventIds = Array.from(new Set(participationsList.map((p) => p.eventId)));
      const eventFetches = await Promise.all(eventIds.map(id => EventRepository.getById(id)));
      
      const eventMap: Record<string, Event> = {};
      const versionPromises: Promise<void>[] = [];

      eventFetches.forEach((event, idx) => {
        const eventId = eventIds[idx];
        if (event) {
          eventMap[eventId] = event;

          // Charger la première version si elle existe
          const versionId = event.versions?.[0];
          if (versionId) {
            const versionPromise = VersionRepository.getById(versionId).then(version => {
              if (version) {
                setVersionNames(prev => ({ ...prev, [eventId]: version.versionName }));
              }
            });
            versionPromises.push(versionPromise);
          }
        }
      });

      setEventsMap(eventMap);
      await Promise.all(versionPromises);
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Participation["status"]) => {
    // Définir paymentVerified en fonction de newStatus
    const paymentVerified = newStatus === "confirmed" ? true : false;
  
    // Mettre à jour le statut et paymentVerified dans la base de données
    await ParticipationRepository.updateStatus(id, newStatus, paymentVerified);
  
    // Mettre à jour l'état local des participations
    setParticipations((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus, paymentVerified } : p
      )
    );
  };
  

  return (
    <div className="main-container">
      <Navbar />
      <div className="content-container">
        <div className="flex flex-col items-center gap-4 p-6">
          {participations.map((p) => {
            console.log(p);
            const event = eventsMap[p.eventId];
            const versionName = versionNames[p.eventId];
            if (!event) return null;

            return (
              <EventCard
                key={p.id}
                image={p.paymentProofUrl || ""}
                eventName={`${event.name}${versionName ? " - " + versionName : ""}`}
                onAccept={() => handleStatusChange(p.id||"", "confirmed")}
                onReject={() => handleStatusChange(p.id||"", "cancelled")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientFile;

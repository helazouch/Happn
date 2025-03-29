import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import { VersionRepository } from "../../DataLayer/repositories/VersionRepository";
import type { Event } from "../../DataLayer/models/Event";
import type { Version } from "../../DataLayer/models/Version";

export class EventService {
  static async createEventWithVersion(
    eventData: Omit<Event, "id_event">,
    versionData: Omit<Version, "id_version" | "eventId" | "versionName" |"nbparticipants" | "plan_mediatique" | "participants" >
  ): Promise<{ eventId: string; versionId: string }> {
    try {
      // Cas 1: Création d'un nouvel événement avec sa première version
      if (eventData.organizer && eventData.description) {
        return await this.createNewEventWithVersion(eventData, {versionData});
      }
      // Cas 2: Ajout d'une nouvelle version à un événement existant
      // else if (eventData) {   //.id_event
      //   return await this.addVersionToExistingEvent(eventData.id_event, versionData);
      // }
      else {
        throw new Error("Données invalides : soit organizer+description pour un nouvel événement, soit id_event pour une nouvelle version");
      }
    } catch (error) {
      console.error("Échec de l'opération :", error);
      throw error;
    }
  }

  private static async createNewEventWithVersion(
    eventData: Omit<Event, "id_event">,
    versionData: Omit<Version, "id_version" | "eventId" | "versionName">
  ): Promise<{ eventId: string; versionId: string }> {
    // 1. Créer l'événement (sans les URLs qui appartiennent à la version)
    const eventStruct = {
      name: eventData.name,
      organizer: eventData.organizer,
      description: eventData.description
    };
    
    const eventId = await EventRepository.create(eventStruct);
    
    // 2. Créer la version V1.0
    const versionWithName = {
      ...versionData,
      versionName: "V1.0"
    };
    
    const versionId = await VersionRepository.create({
      ...versionWithName,
      eventId
    });

    // 3. Lier la version à l'événement
    await EventRepository.addVersion(eventId, versionId);

    return { eventId, versionId };
  }

  private static async addVersionToExistingEvent(
    eventId: string,
    versionData: Omit<Version, "id_version" | "eventId" | "versionName">
  ): Promise<{ eventId: string; versionId: string }> {
    // 1. Récupérer la dernière version de l'événement
    const lastVersion = await VersionRepository.getLastVersionByEventId(eventId);
    
    // 2. Calculer le nouveau nom de version (Vx+1)
    const newVersionNumber = lastVersion 
      ? parseInt(lastVersion.versionName.substring(1)) + 1 
      : 1;
    const newVersionName = `V${newVersionNumber}.0`;
    
    // 3. Créer la nouvelle version
    const versionId = await VersionRepository.create({
      ...versionData,
      versionName: newVersionName,
      eventId
    });

    // 4. Lier la version à l'événement
    await EventRepository.addVersion(eventId, versionId);

    return { eventId, versionId };
  }
}
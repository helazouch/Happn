import { EventRepository } from "../../DataLayer/repositories/EventRepository";
import { VersionRepository } from "../../DataLayer/repositories/VersionRepository";
import type { Event } from "../../DataLayer/models/Event";
import type { Version } from "../../DataLayer/models/Version";

export class EventService {
  static async createEventWithVersion(
    eventData: Omit<Event, "id_event">,
    versionData: Omit<Version, "id_version" | "eventId">
  ): Promise<{ eventId: string; versionId: string }> {
    try {
      // 1. Create event
      const eventId = await EventRepository.create(eventData);
      
      // 2. Create version
      const versionId = await VersionRepository.create({
        ...versionData,
        eventId
      });

      // 3. Link version to event
      await EventRepository.addVersion(eventId, versionId);

      return { eventId, versionId };
    } catch (error) {
      console.error("Event creation failed:", error);
      throw error;
    }
  }
}
// src/ServicesLayer/eventManagement/EventService.ts
import { FirebaseService } from "../firebase/FirebaseService";
import { Event } from "../../DataLayer/models/Event";

export class EventService {
  static async createEvent(eventData: Omit<Event, "id_event">): Promise<string> {
    this.validateEventData(eventData); // Validation moved here
    
    try {
      const enrichedData = {
        ...eventData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft"
      };
      
      return await FirebaseService.createEvent(enrichedData);
    } catch (error) {
      this.handleEventError(error);
      throw error;
    }
  }

  private static validateEventData(data: Omit<Event, "id_event">): void {
    if (!data.name?.trim()) throw new Error("Event name is required");
    if (!data.organizer?.trim()) throw new Error("Organizer is required");
  }

  private static handleEventError(error: unknown): void {
    console.error("[EventService] Error:", error);
    // Add error transformation logic here if needed
  }
}
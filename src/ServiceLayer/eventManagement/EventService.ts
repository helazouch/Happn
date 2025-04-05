// src/ServicesLayer/eventManagement/EventService.ts
import { FirebaseService } from "../firebase/FirebaseService";
import { Event } from "../../DataLayer/models/Event";
import { EventRepository } from "../../DataLayer/repositories/EventRepository"
import { Connector } from "../../RoutingLayer/serviceRoutes/Connector";
import { Version } from "../../DataLayer/models/Version";

export class EventService {
  static async createEvent(eventData: Omit<Event, "id_event">): Promise<string> {
    this.validateEventData(eventData);
    
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
  }

  static async getEventExistence(eventName: string): Promise<boolean> {
    try {
      const test = await EventRepository.nameExists(eventName);
      return test;
    } catch (error) {
      console.error("[EventService] Error fetching event by name:", error);
      throw error;
    }
  }

  static async getEventId(eventName: string): Promise<string> {
    try {
      const eventId = await EventRepository.getByName(eventName);
      return eventId ?? "";
    } catch (error) {
      console.error("[EventService] Error fetching event by name:", error);
      throw error;
    }
  }

  static async uploadEventFile(imageFile: File): Promise<string> {
    try {
      return await Connector.uploadEventFile(imageFile);
    } catch (error) {
      console.error("[ServiceConnector] Error uploading event image:", error);
      throw error;
    }
  }

  static async createAndAttachVersion(
    eventId: string, 
    versionData: Omit<Version, 'id_version'>
  ): Promise<string> {
    try {
      const versionId = await Connector.createAndAttachVersion(eventId, versionData);
      return versionId;
    } catch (error) {
      console.error("[ServiceConnector] Error in createAndAttachVersion:", error);
      throw new Error("Failed to create and attach version to event");
    }
  }
  
  static async getAllVersions(): Promise<Version[]> {
    try {
      return await FirebaseService.getAllVersions();
    } catch (error) {
      console.error("[ServiceConnector] Error fetching all versions:", error);
      throw new Error("Failed to fetch versions");
    }
  }

  
  static async getVersionsByStatus( canceled: boolean): Promise<Version[]> {
    try {
      return await FirebaseService.getVersionsByStatus( canceled);
    } catch (error) {
      console.error("[ServiceConnector] Error fetching versions by status:", error);
      throw new Error(`Failed to fetch ${canceled ? 'canceled' : 'active'} versions`);
    }
  }

  static async updateVersion(
    versionId: string,
    versionData: Partial<Omit<Version, 'id_version' | 'createdAt'>>
  ): Promise<void> {
    try {
      // Validate required fields
      if (!versionId) throw new Error("Version ID is required");
      
      const dataToUpdate = {
        ...versionData,
        updatedAt: new Date().toISOString()
      };

      await FirebaseService.updateVersion(versionId, dataToUpdate);
    } catch (error) {
      console.error("[EventService] Error updating version:", error);
      throw new Error("Failed to update version");
    }
  }
  
}
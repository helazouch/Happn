// src/RoutingLayer/serviceRoutes/serviceConnector.ts
import { Event } from '../../DataLayer/models/Event';
import { Version } from '../../DataLayer/models/Version';
import { EventService } from '../../ServiceLayer/eventManagement/EventService';

export class ServiceConnector {
  static async createEvent(eventData: Omit<Event, 'id_event'>): Promise<string> {
    // Implementation that creates the event and returns the ID
    try {
      const eventToCreate = {
        ...eventData,
        categories: eventData.categories || [], // Ensure categories exists
        versions: eventData.versions || [],    // Ensure versions exists
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Call to your actual service method
      return await EventService.createEvent(eventToCreate);
    } catch (error) {
      console.error('ServiceConnector Error:', error);
      throw error;
    }
  }


  static async doesEventExist(eventName: string): Promise<boolean> {
    try {
      const test = await EventService.getEventExistence(eventName);
      return test; // Retourne true si l'événement existe, sinon false
    } catch (error) {
      console.error('Error checking event existence:', error);
      throw error;
    }
  }


  static async getEventId(eventName: string): Promise<string> {
    try {
      const eventId = await EventService.getEventId(eventName);
      return eventId; // Retourne true si l'événement existe, sinon false
    } catch (error) {
      console.error('Error checking event existence:', error);
      throw error;
    }
  }


  static async uploadEventFile(imageFile: File): Promise<string> {
    try {
      return await EventService.uploadEventFile(imageFile);
    } catch (error) {
      console.error("[ServiceConnector] Error uploading event image:", error);
      throw error;
    }
  }


  static async createAndAttachVersion(eventId: string, versionData: Omit<Version, 'id_version'>): Promise<string> {
    try {
      const versionId=await EventService.createAndAttachVersion(eventId,versionData);

      return versionId;
    } catch (error) {
      console.error("[ServiceConnector] Error in createAndAttachVersion:", error);
      throw new Error("Failed to create and attach version to event");
    }
  }
}
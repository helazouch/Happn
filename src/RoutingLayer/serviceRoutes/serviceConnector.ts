// src/RoutingLayer/serviceRoutes/serviceConnector.ts
import { Event } from '../../DataLayer/models/Event';
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
}
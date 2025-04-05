// src/RoutingLayer/serviceRoutes/serviceConnector.ts
import { Event } from '../../DataLayer/models/Event';
import { Version } from '../../DataLayer/models/Version';
import { EventService } from '../../ServiceLayer/eventManagement/EventService';

export class ServiceConnector {
  static async createEvent(eventData: Omit<Event, 'id_event'>): Promise<string> {
    try {
      const eventToCreate = {
        ...eventData,
        categories: eventData.categories || [],
        versions: eventData.versions || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return await EventService.createEvent(eventToCreate);
    } catch (error) {
      console.error('ServiceConnector Error:', error);
      throw error;
    }
  }

  static async doesEventExist(eventName: string): Promise<boolean> {
    try {
      const test = await EventService.getEventExistence(eventName);
      return test;
    } catch (error) {
      console.error('Error checking event existence:', error);
      throw error;
    }
  }

  static async getEventId(eventName: string): Promise<string> {
    try {
      const eventId = await EventService.getEventId(eventName);
      return eventId;
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

  static async createAndAttachVersion(
    eventId: string, 
    versionData: Omit<Version, 'id_version'>
  ): Promise<string> {
    try {
      const versionId = await EventService.createAndAttachVersion(eventId, versionData);
      return versionId;
    } catch (error) {
      console.error("[ServiceConnector] Error in createAndAttachVersion:", error);
      throw new Error("Failed to create and attach version to event");
    }
  }

  static async updateVersion(
    versionId: string,
    versionData: Partial<Omit<Version, 'id_version' | 'createdAt'>>
  ): Promise<void> {
    try {
      // Add updatedAt timestamp
      const dataToUpdate = {
        ...versionData,
        updatedAt: new Date().toISOString()
      };
  
      await EventService.updateVersion(versionId, dataToUpdate);
    } catch (error) {
      console.error("[ServiceConnector] Error updating version:", error);
      throw new Error("Failed to update version");
    }
  }


  static async getAllVersions(): Promise<Version[]> {
    try {
      return await EventService.getAllVersions();
    } catch (error) {
      console.error("[ServiceConnector] Error fetching all versions:", error);
      throw new Error("Failed to fetch versions");
    }
  }


  static async getVersionsByStatus( canceled: boolean): Promise<Version[]> {
    try {
      return await EventService.getVersionsByStatus( canceled);
    } catch (error) {
      console.error("[ServiceConnector] Error fetching versions by status:", error);
      throw new Error(`Failed to fetch ${canceled ? 'canceled' : 'active'} versions`);
    }
  }

  /**
   * Alternative method that combines both filters in one call
   * @param eventId The ID of the parent event
   * @param filterType 'all' | 'active' | 'canceled'
   * @returns Promise<Version[]> Array of filtered versions
   */
  static async getFilteredVersions(filterType: 'all' | 'active' | 'canceled'): Promise<Version[]> {
    try {
      switch (filterType) {
        case 'all':
          return await this.getAllVersions();
        case 'active':
          return await this.getVersionsByStatus( false);
        case 'canceled':
          return await this.getVersionsByStatus( true);
        default:
          return await this.getAllVersions();
      }
    } catch (error) {
      console.error("[ServiceConnector] Error fetching filtered versions:", error);
      throw new Error(`Failed to fetch ${filterType} versions`);
    }
  }
}
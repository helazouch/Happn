import { User } from "firebase/auth";
import { Version } from "../../DataLayer/models/Version";
import { FirebaseService } from "../../ServiceLayer/firebase/FirebaseService";



export class Connector {
    //event managment fait appel a firebase service
    static async uploadEventFile(imageFile: File): Promise<string> {
        try {
          return await FirebaseService.uploadFile(imageFile, "event-images");
        } catch (error) {
          console.error("[ServiceConnector] Error uploading event image:", error);
          throw error;
        }
      }

      static async createAndAttachVersion(eventId: string, versionData: Omit<Version, 'id_version'>): Promise<string> {
          try {
            const versionId=await FirebaseService.createVersion(versionData);
            // 4. Link version to parent event
            await FirebaseService.addVersionToEvent(eventId, versionId);
            return versionId;
          } catch (error) {
            console.error("[ServiceConnector] Error in createAndAttachVersion:", error);
            throw new Error("Failed to create and attach version to event");
          }
        }
        
      static async signUpWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          const { user, isSpecialUser }=await FirebaseService.signUpWithEmail(email,password);
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }


      static async signWithGoogle(): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          const { user, isSpecialUser }=await FirebaseService.signWithGoogle();
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }

      static async signInWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          const { user, isSpecialUser }=await FirebaseService.signInWithEmail(email,password);
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }

}
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, User } from "firebase/auth";
import { Connector } from "../../RoutingLayer/serviceRoutes/Connector";
import { updatePassword } from "firebase/auth";
import { ParticipationRepository } from "../../DataLayer/repositories/ParticipationRepository";


export class AuthService {
  static async signUpWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const { user, isSpecialUser } =await Connector.signUpWithEmail(email, password);
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

  static async signWithGoogle(): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const { user, isSpecialUser } =await Connector.signWithGoogle();
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }


  static async signInWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
    try {
      const { user, isSpecialUser } =await Connector.signInWithEmail(email, password);
      return { user, isSpecialUser };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

  static async updatePasswordForEmailUser(
    user: User,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      if (!user.email) throw new Error("User email is not available");

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      console.log("Password updated successfully.");
    } catch (error: any) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  static async deleteCurrentUser(): Promise<void> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("no user found");
        throw new Error("Aucun utilisateur connecté.");
      }
      await ParticipationRepository.deleteParticipationsByParticipantId(user.uid);
      console.log("Participations supprimées.");
      await deleteUser(user);
      
      console.log("Utilisateur supprimé avec succès.");
    } catch (error: any) {
      alert("erreur fi authservice");
      // Cas fréquent : si la session est ancienne, Firebase demande une re-authentification
      if (error.code === "auth/requires-recent-login") {
        console.log("ici");
        throw new Error("Veuillez vous reconnecter pour supprimer votre compte.");
      }
      console.error("Erreur lors de la suppression du compte :", error);
      throw error;
    }
  }

}



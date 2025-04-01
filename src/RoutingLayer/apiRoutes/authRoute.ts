import { User } from "firebase/auth";
import { AuthService } from "../../ServiceLayer/authentication/AuthService";

export class ServiceConnector {

    static async signUpWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          
          const { user, isSpecialUser } =await AuthService.signUpWithEmail(email, password);  
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }


      static async signWithGoogle(): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          
          const { user, isSpecialUser }= await AuthService.signWithGoogle();  
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }


      static async signInWithEmail(email: string, password: string): Promise<{ user: User; isSpecialUser: boolean }> {
        try {
          
          const { user, isSpecialUser } =await AuthService.signInWithEmail(email, password);  
          return { user, isSpecialUser };
        } catch (error) {
          console.error("Error during sign-up:", error);
          throw error;
        }
      }

}
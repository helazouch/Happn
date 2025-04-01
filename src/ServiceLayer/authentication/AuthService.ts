import { User } from "firebase/auth";
import { Connector } from "../../RoutingLayer/serviceRoutes/Connector";


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

}



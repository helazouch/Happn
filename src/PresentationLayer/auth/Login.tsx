import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import "./Login.css";
import { useNavigationServiceAuth } from "../../RoutingLayer/navigation/NavigationServiceAuth";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/authRoute";

const Login = () => {
  const navigation = useNavigationServiceAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { user, isSpecialUser }= await ServiceConnector.signInWithEmail(email,password);

      // alert("Connexion réussie !");
      if (isSpecialUser){
        navigation.goToAdminDashboard(user.uid,user.email||"","1");
      }
      else {
        navigation.goToParticipantDashboard(user.uid,user.email||"","1");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        // alert("erreur de connexion");
        navigation.goToAuthError();
      } else {
        setError("Une erreur inconnue s'est produite !");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
       const { user, isSpecialUser } = await ServiceConnector.signWithGoogle();
      // alert("Connexion avec Google réussie !");
      if (isSpecialUser){
        navigation.goToAdminDashboard(user.uid,user.email||"","2");
      }
      else {
        navigation.goToParticipantDashboard(user.uid,user.email||"","2");
      }
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite !");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Image column - hidden on mobile */}
      <div className="image-column">
        <img src="Happn.png" alt="Login visual" width={520} height={404} />
      </div>

      {/* Login form column */}
      <div className="login-column">
        <h2 className="login-title">Sign In</h2>

        <button className="google-btn" onClick={handleGoogleSignIn} type="button">
          <FaGoogle className="google-icon" />
          Sign in with Google
        </button>

        <div className="divider">or</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="action-row">
            <span className="create-account">
              Don't have an account? <a onClick={navigation.goToSignUp}>Create one</a>
            </span>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

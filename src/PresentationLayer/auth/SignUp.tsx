import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import "./SignUp.css";
import { useNavigationServiceAuth } from "../../RoutingLayer/navigation/NavigationServiceAuth";
import { ServiceConnector } from "../../RoutingLayer/apiRoutes/authRoute";
const SignUp = () => {
  const navigation = useNavigationServiceAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      // alert("Les mots de passe ne correspondent pas.");
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { user, isSpecialUser } = await ServiceConnector.signUpWithEmail(
        email,
        password
      );
      // alert("Compte créé avec succès ! et le user id est");
      // alert(user.uid);
      // alert(user.email);
      if (isSpecialUser) {
        navigation.goToAdminDashboard(user.uid, user.email || "", "1");
      } else {
        navigation.goToParticipantDashboard(user.uid, user.email || "", "1");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { user, isSpecialUser } = await ServiceConnector.signWithGoogle();
      // alert("Connexion avec Google réussie !");
      // alert(user.uid);
      // alert(user.email);
      if (isSpecialUser) {
        navigation.goToAdminDashboard(user.uid, user.email || "", "2");
      } else {
        navigation.goToParticipantDashboard(user.uid, user.email || "", "2");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite!!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sign-up-container">
        {/* Left Column - Sign Up Form */}
        <div className="sign-up-form-column">
          <div className="sign-up-form-box">
            <button
              className="google-btn"
              onClick={handleGoogleSignUp}
              type="button"
            >
              <FaGoogle className="google-icon" />
              Register with Google
            </button>

            <div className="divider">or</div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="action-row">
              {/* <button type="submit" className="sign-up-btn">
                Sign Up
              </button> */}
              {/* <span className="have-account">
                Have an account? <a onClick={navigation.goToSignIn}>Sign in</a>
              </span> */}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Additional Form */}
        <div className="right-column">
          {/* Image Row */}
          <div className="image-row">
            <img
              src="Happn.png"
              alt="Sign up visual"
              className="sign-up-image"
            />
          </div>

          {/* Confirm Password Row */}
          <div className="confirm-password-box">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="secondary-action-row">
              <span className="have-account">
              Have an account? <a onClick={navigation.goToSignIn}>Sign in</a>
            </span>
              <button type="submit" className="sign-up-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;

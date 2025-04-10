import { useNavigationServiceAuth } from "../../RoutingLayer/navigation/NavigationServiceAuth";
import './AuthError.css';

const AuthError = () => {
  const navigationService = useNavigationServiceAuth();

  const handleReturnToLogin = () => {
    navigationService.goToSignIn(); // Assurez-vous que cette méthode existe dans ton service de navigation
  };

  return (
    <div className="auth-error-container">
      <h2 className="auth-error-title">Erreur d'authentification</h2>
      <p className="auth-error-message">
        Une erreur s'est produite lors de l'authentification. Veuillez réessayer.
      </p>
      <button className="auth-error-button" onClick={handleReturnToLogin}>
        Retour à la connexion
      </button>
    </div>
  );
};

export default AuthError;

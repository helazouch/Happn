
const AuthError = () => {

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Erreur d'authentification</h2>
      <p style={styles.message}>
        Une erreur s'est produite lors de l'authentification. Veuillez réessayer.
      </p>
      <button style={styles.button}>
        Retour à la connexion
      </button>
    </div>
  );
};

// Styles en ligne pour une mise en page simple
const styles = {
  container: {
    textAlign: "center" as "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#d32f2f",
  },
  message: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AuthError;

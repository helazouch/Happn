import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Signing in with Google");
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

        <button
          className="google-btn"
          onClick={handleGoogleSignIn}
          type="button"
        >
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

          <div className="action-row">
            <span className="create-account">
              Don't have an account? <a href="#">Create one</a>
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

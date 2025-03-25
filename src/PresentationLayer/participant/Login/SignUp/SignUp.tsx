import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log({ email, password, confirmPassword });
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log("Signing up with Google");
  };

  return (
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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="action-row">
              <button type="submit" className="sign-up-btn">
                Sign Up
              </button>
              <span className="have-account">
                Have an account? <a href="#">Sign in</a>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Image and Additional Form */}
      <div className="right-column">
        {/* Image Row */}
        <div className="image-row">
          <img src="Happn.png" alt="Sign up visual" className="sign-up-image" />
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
              Have an account? <a href="#">Sign in</a>
            </span>
            <button type="button" className="sign-up-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

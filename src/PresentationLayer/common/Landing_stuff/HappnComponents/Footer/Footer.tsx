import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-col">
          <div className="footer-logo">Happn</div>
          <div className="footer-text">
            Happn is a global self-service ticketing platform for live
            experiences that allows anyone to create, share, find and attend
            events that fuel their passions and enrich their lives.
          </div>
          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-title">Stay in the Loop</div>
          <div className="footer-text">
            Join our mailing list to stay in the loop with our newest for Event
            and concert.
          </div>
          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe Now</button>
          </div>
        </div>
      </div>

      {/* Copyright Section (10vh) */}
      <div className="footer-copyright">
        <p>© 2023 Happn. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <NavLink className="social-logo" to="/">
              TRVL <i className="fab fa-typo3"></i>
            </NavLink>
          </div>
          <small className="website-rights">Nimrod Rokach &copy; 2020</small>
          <div className="social-icons">
            <a
              className="social-icon-link facebook"
              href="https://www.facebook.com/nimrod.rokach/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="social-icon-link linkedin"
              href="https://www.linkedin.com/in/nimrod-rokach/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

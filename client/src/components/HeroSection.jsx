import React from "react";
import Button from "./Button";
import "./HeroSection.css";
import "../App.css";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const user = useSelector((state) => state.isUserLoggedIn);
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      {user.login ? (
        <h1>ADVENTURE AWAITS</h1>
      ) : (
        <h1>LOGIN FOR THE BEST VACATIONS!</h1>
      )}
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns login-button"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          LOG IN
        </Button>
        <Button
          className="btns signup-button"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import Button from "./Button";
import "./HeroSection.css";
import "../App.css";

export default function HeroSection() {
	return (
		<div className="hero-container">
			<h1>LOGIN FOR THE BEST DEALS!</h1>
			<p>What are you waiting for?</p>
			<div className="hero-btns">
				<Button className="btns login-button" buttonStyle="btn--outline" buttonSize="btn--large">
					LOG IN
				</Button>
				<Button className="btns signup-button" buttonStyle="btn--primary" buttonSize="btn--large">
					SIGN UP
				</Button>
			</div>
		</div>
	);
}

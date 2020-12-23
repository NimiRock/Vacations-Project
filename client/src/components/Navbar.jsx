import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import "./Navbar.css";
import { isUserLoggedIn } from "../actions/index";

export default function Navbar() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.isUserLoggedIn);
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
						TRVL <i className="fab fa-typo3"></i>
					</NavLink>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"}></i>
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
							<li className="nav-item">
								<NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
									Home
								</NavLink>
							</li>
						{user.login && user.userRole === "admin" && (
							<li className="nav-item">
								<NavLink to="/reports" className="nav-links" onClick={closeMobileMenu}>
									Reports
								</NavLink>
							</li>
						)}

						{user.login && (
							<li className="nav-item">
								<NavLink
									to="/"
									className="nav-links"
									onClick={() => {
										closeMobileMenu();
										localStorage.removeItem("token");
										dispatch(isUserLoggedIn(false));
									}}
								>
									Sign-Out
								</NavLink>
							</li>
						)}
					</ul>
					{button && <Button buttonStyle="btn--outline">{user.login ? `Welcome ${user.userFName}` : "SIGN UP"}</Button>}
				</div>
			</nav>
		</>
	);
}

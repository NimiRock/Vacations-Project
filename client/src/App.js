import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Reports from "./components/Reports";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import { isUserLoggedIn } from "./actions";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.isUserLoggedIn);
	const localStorageUserData = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		if (localStorageUserData) {
			getUserData();
		}
		// eslint-disable-next-line
	}, []);

	const getUserData = async () => {
		const res = await fetch("https://mighty-wildwood-99145.herokuapp.com/auth/refresh", {
			method: "GET",
			headers: {
				authorization: localStorageUserData.refresh_token,
			},
		});
		const data = await res.json();
		if (data.err) {
			localStorage.removeItem("token");
		} else {
			localStorage.setItem(
				"token",
				JSON.stringify({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
				})
			);
			dispatch(isUserLoggedIn(data));
		}
	};

	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" exact component={user.login ? Cards : HeroSection} />
					<Route path="/reports" component={Reports} />
					<Route path="/sign-up" render={() => (user.login ? <Redirect to="/" /> : <SignUp />)} />
					<Route path="/login" render={() => (user.login ? <Redirect to="/" /> : <Login />)} />
					<Route path="/forgot-pwd" render={() => (user.login ? <Redirect to="/" /> : <ForgotPassword />)} />
					{/* to catch bad URL path*/}
					<Route render={() => <Redirect to={{pathname: "/"}} />} />
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

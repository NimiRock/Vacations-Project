import React, { useState } from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../actions/index";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			backgroundColor: "rgba(241, 250, 238, 0.7)",
		},
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	submitSignUpBtn: {
		width: 100,
	},
}));

export default function SignUp() {
	const [registrationFirstName, setRegistrationFirstName] = useState("");
	const [registrationLastName, setRegistrationLastName] = useState("");
	const [registrationUsername, setRegistrationUsername] = useState("");
	const [registrationPassword, setRegistrationPassword] = useState("");
	const [usernameTaken, setUsernameTaken] = useState(false);
	const [showOrHideErrorMessage, setShowOrHideErrorMessage] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const signUp = async () => {
		try {
			const res = await fetch("/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fname: registrationFirstName,
					lname: registrationLastName,
					username: registrationUsername,
					password: registrationPassword,
				}),
			});
			const data = await res.json();
			if (!data.err) {
				await userLogin();
				setShowOrHideErrorMessage(false);
				setRegistrationFirstName("");
				setRegistrationLastName("");
				setRegistrationUsername("");
				setRegistrationPassword("");
				history.push("/");
			}else{
				setUsernameTaken(true)
			}

		} catch (error) {
			console.log(error);
		}
	};

	const userLogin = async () => {
		try {
			const res = await fetch("/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: registrationUsername,
					password: registrationPassword,
				}),
			});
			const data = await res.json();
			localStorage.setItem(
				"token",
				JSON.stringify({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
				})
			);
			dispatch(isUserLoggedIn(data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center flex-column sign-up">
			<h1 className="display-2 signup-header">Sign Up to TRVL</h1>
			{usernameTaken && <h3 className="invalid-login-entry-error">Username already exist</h3>}
			{showOrHideErrorMessage && <h3 className="invalid-login-entry-error">Please fill all fields</h3>}
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="outlined-error"
						label="First Name"
						variant="outlined"
						value={registrationFirstName}
						error={!registrationFirstName && showOrHideErrorMessage}
						required
						onChange={(e) => setRegistrationFirstName(e.target.value)}
					/>
					<TextField
						id="outlined-error-helper-text"
						label="Last Name"
						variant="outlined"
						value={registrationLastName}
						error={!registrationLastName && showOrHideErrorMessage}
						required
						onChange={(e) => setRegistrationLastName(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id="outlined-error"
						label="Username"
						variant="outlined"
						value={registrationUsername}
						error={!registrationUsername && showOrHideErrorMessage}
						required
						onChange={(e) => setRegistrationUsername(e.target.value)}
					/>
				</div>
				<div>
					<FormControl className="MuiTextField-root" variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							value={registrationPassword}
							error={!registrationPassword && showOrHideErrorMessage}
							required
							onChange={(e) => setRegistrationPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPassword(!showPassword)}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</div>
				<Typography className="p-2" color="secondary" variant="caption" display="block" gutterBottom>
					* Required field
				</Typography>
			</form>

			<Button
				className={`${classes.submitSignUpBtn} mb-3`}
				variant="contained"
				color="primary"
				onClick={async () => {
					if ((registrationFirstName, registrationLastName, registrationUsername, registrationPassword)) {
						setShowOrHideErrorMessage(false);
						await signUp();
					} else {
						setShowOrHideErrorMessage(true);
					}
				}}
			>
				Register
			</Button>
			<Link className="login-link" to="/login">
				Already a member? Click here to login
			</Link>
		</div>
	);
}

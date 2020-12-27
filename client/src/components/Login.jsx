import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { isUserLoggedIn } from "../actions/index";
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
	submitLoginBtn: {
		width: 100,
	},
}));

export default function Login() {
	const dispatch = useDispatch();
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [showOrHideErrorMessage, setShowOrHideErrorMessage] = useState(false);
	const [invalidLoginEntry, setInvalidLoginEntry] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const userLogin = async () => {
		try {
			const res = await fetch("/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: loginUsername,
					password: loginPassword,
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
			setLoginUsername("");
			setLoginPassword("");
			setShowOrHideErrorMessage(false);
		} catch (error) {
			console.log(error);
			setInvalidLoginEntry(true);
		}
	};

	return (
		<div className={`d-flex justify-content-center align-items-center flex-column log-in`}>
			<h1 className="login-header">Login to TRVL</h1>
			{invalidLoginEntry && <h3 className="invalid-login-entry-error">Username or Password are incorrect</h3>}
			{showOrHideErrorMessage && <h3 className="invalid-login-entry-error">Please fill all fields</h3>}
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="outlined-error"
						label="Username"
						error={!loginUsername && showOrHideErrorMessage}
						variant="outlined"
						value={loginUsername}
						required
						onChange={(e) => setLoginUsername(e.target.value)}
					/>
				</div>
				<div>
					<FormControl className="MuiTextField-root" variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password outlined-error"
							type={showPassword ? "text" : "password"}
							value={loginPassword}
							error={!loginPassword && showOrHideErrorMessage}
							required
							onChange={(e) => setLoginPassword(e.target.value)}
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
				className={classes.submitLoginBtn}
				variant="contained"
				color="primary"
				size="large"
				onClick={async () => {
					if (loginUsername && loginPassword) {
						setShowOrHideErrorMessage(false);
						setInvalidLoginEntry(false);
						await userLogin();
					} else {
						setShowOrHideErrorMessage(true);
					}
				}}
			>
				Login
			</Button>
			<div className="signup-passReset-links d-flex justify-content-around w-25 mt-5">
				<Link className="sign-up-link" to="/sign-up">
					Not a member yet? REGISTER HERE
				</Link>
				<Link className="forgot-pwd-link" to="/forgot-pwd">
					Forgot Password?
				</Link>
			</div>
		</div>
	);
}

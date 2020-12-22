import React, { useState } from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
	usernameAndPassword: {
		width: 460,
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	backBtn: {
		backgroundColor: "salmon",
		color: "whitesmoke",
		'&:hover': {
			backgroundColor: "rgb(250, 160, 150)"
		}
	}
}));

export default function ForgotPassword() {
	const [resetPwdUserLastName, setResetPwdUserLastName] = useState("");
	const [resetPwdUserUsername, setResetPwdUserUsername] = useState("");
	const [resetPwdNewPassword, setResetPwdNewPassword] = useState("");
	const [showOrHideErrorMessage, setShowOrHideErrorMessage] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const passwordReset = async () => {
		try {
			const res = await fetch("http://localhost:1000/auth/reset-pwd", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					lname: resetPwdUserLastName,
					username: resetPwdUserUsername,
					password: resetPwdNewPassword,
				}),
			});
			const data = await res.json();
			console.log(data);
			/**
			 * TODO - This is where I need to enter signup error, like username is already taken
			 */
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center flex-column forgot-password">
			<h1 className="display-2 reset-header">Reset Password</h1>
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="outlined-error-helper-text"
						label="Last Name"
						variant="outlined"
						value={resetPwdUserLastName}
						error={!resetPwdUserLastName && showOrHideErrorMessage}
						required
						onChange={(e) => setResetPwdUserLastName(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						className={classes.usernameAndPassword}
						id="outlined-error"
						label="Username"
						variant="outlined"
						value={resetPwdUserUsername}
						error={!resetPwdUserUsername && showOrHideErrorMessage}
						required
						onChange={(e) => setResetPwdUserUsername(e.target.value)}
					/>
				</div>
				<div>
					<FormControl className={`MuiTextField-root ${classes.usernameAndPassword}`} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							value={resetPwdNewPassword}
							error={!resetPwdNewPassword && showOrHideErrorMessage}
							required
							onChange={(e) => setResetPwdNewPassword(e.target.value)}
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

			<div className="login-and-reset-btns d-flex justify-content-around w-25">
				<Button className={classes.backBtn}  variant="contained" to="/login" component={Link}>
					Back to login
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={async () => {
						if ((resetPwdUserLastName, resetPwdUserUsername, resetPwdNewPassword)) {
							await passwordReset();
							setShowOrHideErrorMessage(false);
							setResetPwdUserLastName("");
							setResetPwdUserUsername("");
							setResetPwdNewPassword("");
						} else {
							setShowOrHideErrorMessage(true);
						}
					}}
				>
					Reset Password
				</Button>
			</div>
		</div>
	);
}

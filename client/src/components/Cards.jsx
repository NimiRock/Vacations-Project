import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardItem from "./CardItem";
import "./Cards.css";
import { useSelector, useDispatch } from "react-redux";
import { allVacations } from "../actions/index";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

//* * ==========================Styles for Material UI */
const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));
//* =================End of Material UI */

//* Start of the main function */
export default function Cards() {
	//* =========================Variables
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [modalModeNewOrUpdate, setModalModeNewOrUpdate] = useState("");
	const [showOrHideErrorMessage, setShowOrHideErrorMessage] = useState(false);
	const [vacationID, setVacationID] = useState("");
	const [followedVacations, setFollowedVacations] = useState([]);
	const [vacationUserIsNotFollowing, setVacationsTheUserIsNotFollowing] = useState([]);
	//*====================== Add new vacation
	const [vacationDestination, setVacationDestination] = useState("");
	const [vacationDescription, setVacationDescription] = useState("");
	const [vacationArrivalDate, setVacationArrivalDate] = useState("");
	const [vacationLeaveDate, setVacationLeaveDate] = useState("");
	const [vacationPrice, setVacationPrice] = useState("");
	const [vacationImgURL, setVacationImgURL] = useState("");
	//* ==================================
	const dispatch = useDispatch();
	const vacations = useSelector((state) => state.getAllVacations);
	const user = useSelector((state) => state.isUserLoggedIn);
	const getLocalStorageUserInformation = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		getFollowedVacations();
		getVacationsThatAreNotFollowed();
		// eslint-disable-next-line
	}, [vacations]);

	//*============================== Main Functions

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//* This function get all the vacations. It's mainly used for useEffect to render if the admin add a new vacation
	const getAllVacations = async () => {
		if (getLocalStorageUserInformation) {
			const res = await fetch("http://localhost:1000/vacations", {
				headers: {
					authorization: getLocalStorageUserInformation.access_token,
				},
			});
			const data = await res.json();
			dispatch(allVacations(data.vacations));
			if (data.err) {
				console.log(data);
			}
		}
	};

	//* This function get the vacations that the user follow
	const getFollowedVacations = async () => {
		const res = await fetch("http://localhost:1000/vacations/following", {
			method: "GET",
			headers: {
				authorization: getLocalStorageUserInformation.access_token,
			},
		});
		const data = await res.json();
		setFollowedVacations(data.followed_Vacations);
	};

	//* This function get the tables combination of vacations and follow table, and filter the vacations the user is following
	const getVacationsThatAreNotFollowed = async () => {
		const res = await fetch("http://localhost:1000/vacations/not-following", {
			method: "GET",
			headers: {
				authorization: getLocalStorageUserInformation.access_token,
			},
		});
		const data = await res.json();
		setVacationsTheUserIsNotFollowing(
			data.vacations_not_following.filter((vacation) => vacation.following_user_id !== user.userid)
		);
	};

	//* This function handles the follow button
	const followAVacation = async (vacation_id) => {
		const res = await fetch("http://localhost:1000/vacations/follow", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: getLocalStorageUserInformation.access_token,
			},
			body: JSON.stringify({
				vacation_id: vacation_id,
			}),
		});
		const data = await res.json();
		if (!data.err) {
			setFollowedVacations(data.newFollowedVacations);
			setVacationsTheUserIsNotFollowing(
				data.newUnFollowedVacations.filter((vacation) => vacation.following_user_id !== user.userid)
			);
		}
	};

	//* This function handles the unfollow button
	const unFollowVacation = async (vacation_id) => {
		const res = await fetch("http://localhost:1000/vacations/stop-follow", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: getLocalStorageUserInformation.access_token,
			},
			body: JSON.stringify({
				vacation_id: vacation_id,
			}),
		});
		const data = await res.json();
		if (!data.err) {
			setFollowedVacations(data.newFollowedVacations);
			setVacationsTheUserIsNotFollowing(
				data.newUnFollowedVacations.filter((vacation) => vacation.following_user_id !== user.userid)
			);
		}
	};

	//* This function add a new vacation
	const addVacation = async () => {
		await fetch("http://localhost:1000/vacations/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: getLocalStorageUserInformation.refresh_token,
			},
			body: JSON.stringify({
				destination: vacationDestination,
				description: vacationDescription,
				arrival_date: vacationArrivalDate,
				leave_date: vacationLeaveDate,
				price: vacationPrice,
				img_url: vacationImgURL,
			}),
		});
	};

	const editVacation = async () => {
		try {
			await fetch(`http://localhost:1000/vacations/${vacationID}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: getLocalStorageUserInformation.refresh_token,
				},
				body: JSON.stringify({
					destination: vacationDestination,
					description: vacationDescription,
					arrival_date: vacationArrivalDate,
					leave_date: vacationLeaveDate,
					price: vacationPrice,
					img_url: vacationImgURL,
				}),
			});
			const res = await fetch("http://localhost:1000/vacations", {
				headers: {
					authorization: getLocalStorageUserInformation.access_token,
				},
			});
			const data = await res.json();
			dispatch(allVacations(data.vacations));
			if (data.err) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="cards" id="cards">
			<div className="admin-user-header">
				{user.userRole === "admin" ? (
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setShowOrHideErrorMessage(false);
							setModalModeNewOrUpdate("new");
							handleOpen();
							setVacationDestination("");
							setVacationDescription("");
							setVacationArrivalDate("");
							setVacationLeaveDate("");
							setVacationPrice("");
							setVacationImgURL("");
						}}
					>
						Add new Vacation
					</Button>
				) : (
					<h1>Followed Vacations!</h1>
				)}
			</div>
			<div className="cards__container">
				<div className="cards__wrapper">
					<ul className="cards__items">
						{followedVacations.map((vacation) => (
							<CardItem
								key={vacation.vacation_id}
								vacation={vacation}
								iconColor="secondary"
								followFunction={unFollowVacation}
								editVacation={editVacation}
								handleOpen={handleOpen}
								setVacationID={setVacationID}
								setModalModeNewOrUpdate={setModalModeNewOrUpdate}
								setVacationDestination={setVacationDestination}
								setVacationDescription={setVacationDescription}
								setVacationArrivalDate={setVacationArrivalDate}
								setVacationLeaveDate={setVacationLeaveDate}
								setVacationPrice={setVacationPrice}
								setVacationImgURL={setVacationImgURL}
							/>
						))}
					</ul>
					<hr />
					{user.userRole === "user" && <h1 className="d-flex justify-content-center">Don't Miss These Vacations!</h1>}
					<ul className="cards__items">
						{vacationUserIsNotFollowing.map((vacation) => (
							<CardItem
								key={vacation.vacation_id}
								vacation={vacation}
								iconColor="inherit"
								followFunction={followAVacation}
								editVacation={editVacation}
								handleOpen={handleOpen}
								setVacationID={setVacationID}
								setModalModeNewOrUpdate={setModalModeNewOrUpdate}
								setVacationDestination={setVacationDestination}
								setVacationDescription={setVacationDescription}
								setVacationArrivalDate={setVacationArrivalDate}
								setVacationLeaveDate={setVacationLeaveDate}
								setVacationPrice={setVacationPrice}
								setVacationImgURL={setVacationImgURL}
							/>
						))}
					</ul>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<div className={classes.paper}>
								<h2 id="transition-modal-title" className="d-flex justify-content-center">
									{modalModeNewOrUpdate === "new" ? "New Vacation Details" : "Edit Vacation"}
								</h2>
								<form className={classes.root} noValidate autoComplete="off">
									<TextField
										id="outlined-multiline-flexible"
										label="Destination"
										multiline
										rowsMax={4}
										variant="outlined"
										value={vacationDestination}
										required
										error={!vacationDestination && showOrHideErrorMessage}
										helperText={!vacationDestination && showOrHideErrorMessage && "Please Insert Destination"}
										onChange={(e) => setVacationDestination(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static"
										label="Description"
										multiline
										rows={4}
										variant="outlined"
										value={vacationDescription}
										required
										error={!vacationDescription && showOrHideErrorMessage}
										helperText={!vacationDescription && showOrHideErrorMessage && "Please Insert Description"}
										onChange={(e) => setVacationDescription(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-flexible"
										label="Arrival Date"
										multiline
										rowsMax={4}
										variant="outlined"
										value={vacationArrivalDate}
										required
										error={!vacationArrivalDate && showOrHideErrorMessage}
										helperText={!vacationArrivalDate && showOrHideErrorMessage && "Please Insert Arrival Date"}
										onChange={(e) => setVacationArrivalDate(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-flexible"
										label="Leave Date"
										multiline
										rowsMax={4}
										variant="outlined"
										value={vacationLeaveDate}
										required
										error={!vacationLeaveDate && showOrHideErrorMessage}
										helperText={!vacationLeaveDate && showOrHideErrorMessage && "Please Insert Leave Date"}
										onChange={(e) => setVacationLeaveDate(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-flexible"
										label="Price"
										multiline
										rowsMax={4}
										variant="outlined"
										value={vacationPrice}
										required
										error={!vacationPrice && showOrHideErrorMessage}
										helperText={!vacationPrice && showOrHideErrorMessage && "Please Insert Price"}
										onChange={(e) => setVacationPrice(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-flexible"
										label="Img URL"
										multiline
										rowsMax={4}
										variant="outlined"
										value={vacationImgURL}
										required
										error={!vacationImgURL && showOrHideErrorMessage}
										helperText={!vacationImgURL && showOrHideErrorMessage && "Please Insert Image URL"}
										onChange={(e) => setVacationImgURL(e.target.value)}
									/>
								</form>
								<Button
									variant="contained"
									color="primary"
									className={classes.button}
									startIcon={modalModeNewOrUpdate === "new" ? <AddIcon /> : <ArrowUpwardIcon />}
									onClick={async () => {
										modalModeNewOrUpdate === "new" ? await addVacation() : await editVacation();

										if (
											vacationDestination &&
											vacationDescription &&
											vacationArrivalDate &&
											vacationLeaveDate &&
											vacationPrice &&
											vacationImgURL
										) {
											handleClose();
											getAllVacations();
											setVacationDestination("");
											setVacationDescription("");
											setVacationArrivalDate("");
											setVacationLeaveDate("");
											setVacationPrice("");
											setVacationImgURL("");
										} else {
											setShowOrHideErrorMessage(true);
										}
									}}
								>
									{modalModeNewOrUpdate === "new" ? "Add Vacation" : "Update Vacation"}
								</Button>
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		</div>
	);
}

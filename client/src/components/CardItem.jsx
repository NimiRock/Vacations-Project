import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { allVacations } from "../actions/index";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	followButton: {
		width: "2rem",
		height: "2rem",
		cursor: "pointer"
	}
}));

export default function CardItem({
	vacation,
	iconColor,
	followFunction,
	handleOpen,
	setVacationID,
	setModalModeNewOrUpdate,
	setVacationDestination,
	setVacationDescription,
	setVacationArrivalDate,
	setVacationLeaveDate,
	setVacationPrice,
	setVacationImgURL,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.isUserLoggedIn);
	const getLocalStorageUserInformation = JSON.parse(localStorage.getItem("token"));

	//* This function handles deleteion of a vacation, with any follows
	const deleteVacation = async () => {
		try {
			await fetch(`http://localhost:1000/vacations/${vacation.vacation_id}`, {
				method: "DELETE",
				headers: {
					authorization: getLocalStorageUserInformation.refresh_token,
				},
			});
			const res = await fetch("http://localhost:1000/vacations", {
				headers: {
					authorization: getLocalStorageUserInformation.access_token,
				},
			});
			const data = await res.json();
			dispatch(allVacations(data.vacations));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<li className="cards__item">
				<div className="cards__item__link">
					<figure className="cards__item__pic-wrap">
						<img src={vacation.vacation_img_url} alt="Travel Images" className="cards__item__img" />
					</figure>
					<div className="follow-button-and-information d-flex justify-content-between">

					<div className="cards__item__info">
						<h3 className="cards__item__text">{vacation.vacation_destination}</h3>
						<h5>Arrival: {vacation.vacation_arrival_date}</h5>
						<h5>Leave: {vacation.vacation_leave_date}</h5>
						<h5>{vacation.vacation_description}</h5>

					</div>
					{user.userRole === "user" && (
						<div className="like-button">
							<FavoriteIcon className={classes.followButton} color={iconColor} onClick={() => followFunction(vacation.vacation_id)} />
						</div>
					)}
					</div>
					<div className="vacation-price d-flex justify-content-center">
							<h2>${vacation.vacation_price}</h2>
						</div>


					<div className="admin-edit-and-delete">
						{user.userRole === "admin" && (
							<Button
								variant="contained"
								color="primary"
								className={`${classes.button} admin-edit-button`}
								startIcon={<EditIcon />}
								onClick={() => {
									setVacationDestination(vacation.vacation_destination);
									setVacationDescription(vacation.vacation_description);
									setVacationArrivalDate(vacation.vacation_arrival_date);
									setVacationLeaveDate(vacation.vacation_leave_date);
									setVacationPrice(vacation.vacation_price);
									setVacationImgURL(vacation.vacation_img_url);
									handleOpen();
									setVacationID(vacation.vacation_id);
									setModalModeNewOrUpdate("update");
								}}
							>
								Edit
							</Button>
						)}
						{user.userRole === "admin" && (
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								startIcon={<DeleteIcon />}
								onClick={deleteVacation}
							>
								Delete
							</Button>
						)}
					</div>
				</div>
			</li>
		</>
	);
}

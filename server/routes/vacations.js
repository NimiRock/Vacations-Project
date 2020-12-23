const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Query = require("../dbconfig");
const { everyUser, onlyStaff } = require("../verification");

// -------THIS FUNCTION HANDLES REQUEST FOR ALL VACATIONS-----------------------
router.get("/", everyUser, async (req, res) => {
	try {
		const q = `SELECT * FROM vacations_list`;
		const vacations = await Query(q);
		res.json({ err: false, vacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION RETURNS ALL THE USER'S FOLLOWED VACATIONS-------------------------
router.get("/following", everyUser, async (req, res) => {
	const { user_id } = jwt.decode(req.headers.authorization);
	try {
		const q = `SELECT * 
        FROM vacations_list
        INNER JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND vacation_followers.following_user_id = ${user_id};`;
		const followed_Vacations = await Query(q);
		res.json({ err: false, followed_Vacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES FOLLOW EVENTS BY THE USER----------------------------------------
router.post("/follow", everyUser, async (req, res) => {
	const { user_id } = jwt.decode(req.headers.authorization);
	const { vacation_id } = req.body;
	try {
		const q = `INSERT INTO vacation_followers(following_user_id, following_vacation_id)
        values(${user_id},${vacation_id});`;
		const s_followed_vacations = `SELECT * 
        FROM vacations_list
        INNER JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND vacation_followers.following_user_id = ${user_id};`;
		const s_Unfollowed_vacations = `SELECT * 
        FROM vacations_list
        LEFT JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND following_user_id=${user_id}
        GROUP BY vacations_list.vacation_id;`;
		await Query(q);
		const newFollowedVacations = await Query(s_followed_vacations);
		const newUnFollowedVacations = await Query(s_Unfollowed_vacations);
		res.status(200).json({ err: false, newFollowedVacations, newUnFollowedVacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION RETURNS THE VACATIONS THAT THE USER IS NOT FOLLOWING----------------------------------------
router.get("/not-following", everyUser, async (req, res) => {
	const { user_id } = jwt.decode(req.headers.authorization);
	try {
		const q = `SELECT * 
        FROM vacations_list
        LEFT JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND following_user_id=${user_id}
        GROUP BY vacations_list.vacation_id;`;
		const vacations_not_following = await Query(q);
		res.json({ err: false, vacations_not_following });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES UN-FOLLOW EVENTS BY THE USER----------------------------------------
router.post("/stop-follow", everyUser, async (req, res) => {
	const { user_id } = jwt.decode(req.headers.authorization);
	const { vacation_id } = req.body;
	try {
		const q = `DELETE FROM vacation_followers WHERE following_user_id=${user_id} AND following_vacation_id=${vacation_id};`;
		const s_followed_vacations = `SELECT * 
        FROM vacations_list
        INNER JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND vacation_followers.following_user_id = ${user_id}`;
		const s_Unfollowed_vacations = `SELECT * 
        FROM vacations_list
        LEFT JOIN vacation_followers ON vacations_list.vacation_id = vacation_followers.following_vacation_id AND following_user_id=${user_id}
        GROUP BY vacations_list.vacation_id;`;
		await Query(q);
		const newFollowedVacations = await Query(s_followed_vacations);
		const newUnFollowedVacations = await Query(s_Unfollowed_vacations);
		res.json({ err: false, newFollowedVacations, newUnFollowedVacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES ADD NEW VACATION----------------------------------------
router.post("/", onlyStaff, async (req, res) => {
	const { destination, description, arrival_date, leave_date, price, img_url } = req.body;
	try {
		const insert_q = `INSERT INTO vacations_list (vacation_destination, vacation_description, vacation_arrival_date, vacation_leave_date, vacation_price, vacation_img_url) VALUES("${destination}", "${description}", "${arrival_date}", "${leave_date}", ${price}, "${img_url}")`;
		const select_q = `SELECT * FROM vacations_list`;
		await Query(insert_q);
		const vacations = await Query(select_q);
		res.json({ err: false, vacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES EDIT VACATION----------------------------------------
router.put("/:id", onlyStaff, async (req, res) => {
	const vacation_id = req.params.id;
	const { destination, description, arrival_date, leave_date, price, img_url } = req.body;
	try {
		const insert_q = `UPDATE vacations_list
    SET vacation_destination='${destination}', vacation_description='${description}', vacation_arrival_date='${arrival_date}', vacation_leave_date='${leave_date}', vacation_price=${price}, vacation_img_url='${img_url}'
    WHERE vacation_id=${vacation_id};`;
		const select_q = `SELECT * FROM vacations_list`;
		await Query(insert_q);
		const vacations = await Query(select_q);
		res.json({ err: false, vacations });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES DELETE VACATION AND ALSO DELETES ANY FOLLOWS IT HAD----------------------------------------
router.delete("/:id", onlyStaff, async (req, res) => {
	try {
		const delete_vacation = `DELETE FROM vacations_list WHERE vacation_id=${req.params.id};`;
		const delete_followers = `DELETE FROM vacation_followers WHERE following_vacation_id=${req.params.id};`;
		await Query(delete_followers);
		await Query(delete_vacation);
		res.json({ err: false, msg: "success!" });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

// -------THIS FUNCTION HANDLES THE FOLLOW DATA FOR THHE CHART----------------------------------------
router.get("/chart-data", onlyStaff, async (req, res) => {
	try {
		const q = `SELECT vacation_destination, COUNT(*) AS number_of_followers
    FROM vacation_followers
    INNER JOIN vacations_list ON vacations_list.vacation_id = vacation_followers.following_vacation_id
    GROUP BY vacations_list.vacation_destination`;
		const chart_data = await Query(q);
		res.json({ err: false, chart_data });
	} catch (error) {
		res.status(500).json({ err: true, error });
	}
});

module.exports = router;

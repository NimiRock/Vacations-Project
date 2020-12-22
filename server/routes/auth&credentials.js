const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Query = require("../dbconfig");
const { everyUser } = require("../verification");

router.post("/login", async (req, res) => {
  const users = await Query(
    `SELECT user_id, user_username, user_password, user_role, user_fname FROM users`
  );
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ err: true, message: "please fill all fields" });
  const user = users.find((u) => u.user_username == username);
  if (!user)
    return res
      .status(401)
      .json({ err: true, message: "username or password are incorrect" });
  const match = await bcrypt.compare(password, user.user_password);
  if (!match)
    return res
      .status(401)
      .json({ err: true, message: "username or password are incorrect" });
  const access_token = jwt.sign(
    { ...user, password: "******" },
    "HS256",
    {
      expiresIn: "10m",
    }
  );
  const refresh_token = jwt.sign(
    { ...user, password: "******" },
    "HS256",
    {
      expiresIn: "15m",
    }
  );
  res.json({ err: false, access_token, refresh_token, user });
});

router.post("/register", async (req, res) => {
  const select_q = `SELECT user_username FROM users`;
  const users = await Query(select_q);
  const { fname, lname, username, password } = req.body;
  if (!fname || !lname || !password || !username)
    return res.status(400).json({ err: true, message: "missing some info" });
  if (users.find((u) => u.user_username == username))
    return res
      .status(400)
      .json({ err: true, message: "username is taken, try something else" });
  const hash = await bcrypt.hash(password, 10);
  try {
    const insert_q = `INSERT INTO users (user_fname, user_lname, user_username, user_password) VALUES("${fname}", "${lname}", "${username}", "${hash}")`;
    await Query(insert_q);
    res.json({ err: false, users });
  } catch (error) {
    res.status(500).json({ err: true, error });
  }
});

router.put("/reset-pwd", async (req, res) => {
  const users = await Query(
    `SELECT user_id, user_username, user_password, user_lname FROM users`
  );
  const { lname, username, password } = req.body;
  if (!lname || !password || !username)
    return res.status(400).json({ err: true, message: "missing some info" });
  const user = users.find((u) => u.user_username == username)
  console.log(user)
  if (!user.user_lname == lname)
    return res
      .status(400)
      .json({ err: true, message: "last name is incorrect" });
  const hash = await bcrypt.hash(password, 10);
  try {
    const insert_q = `UPDATE users
    SET user_password="${hash}"
    WHERE user_id=${user.user_id};`;
    await Query(insert_q);
    res.json({ err: false, users });
  } catch (error) {
    res.status(500).json({ err: true, error });
  }
});

router.get("/refresh", everyUser, async (req, res) => {
  const users = await Query(`SELECT * FROM users`);
  const refresh_token = req.headers.authorization;
  jwt.verify(refresh_token, "HS256", (err, payload) => {
    if (err) return res.status(401).json({ error: true, msg: err });
    const user = users.find((u) => u.user_id == payload.user_id);
    if (!user)
      return res.status(405).json({ err: true, msg: "user not found" });
    const access_token = jwt.sign({ ...user, password: "****" }, "HS256", {
      expiresIn: "10m",
    });
    const refresh_token = jwt.sign(
      { ...user, password: "******", role: user.user_role },
      "HS256",
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ err: false, user, access_token, refresh_token });
  });
});

module.exports = router;

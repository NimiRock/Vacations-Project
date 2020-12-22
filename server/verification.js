const jwt = require("jsonwebtoken");

const everyUser = async (req, res, next) => {
  jwt.verify(req.headers["authorization"], "HS256", (err, payload) => {
    if (err) return res.status(403).json({ err: true, message: err.message });
    next();
  });
};

const onlyStaff = async (req, res, next) => {
  jwt.verify(req.headers["authorization"], "HS256", (err, payload) => {
    if (err) return res.status(403).json({ err: true, message: err.message });
    if (!["admin"].includes(payload.user_role))
      return res
        .status(403)
        .json({
          err: true,
          message: "you don't have permission to access this",
        });
    req.user = payload;
    next();
  });
};

module.exports = { everyUser, onlyStaff };

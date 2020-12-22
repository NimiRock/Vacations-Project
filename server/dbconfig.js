const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_three_vacations",
});

con.connect((err) => {
  if (err) throw err;
  console.log("cool! connected to mySql");
});

const Query = (q, ...values) => {
  return new Promise((resolve, reject) => {
    con.query(q, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = Query;

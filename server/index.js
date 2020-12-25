const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;


app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use('/auth', require('./routes/auth&credentials'));
app.use('/vacations', require('./routes/vacations'));

app.listen(port, () => console.log('up & running'));
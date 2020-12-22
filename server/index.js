const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use('/auth', require('./routes/auth&credentials'));
app.use('/vacations', require('./routes/vacations'));

app.listen(1000, () => console.log('up & running'));
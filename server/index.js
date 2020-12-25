const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path')
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use('/auth', require('./routes/auth&credentials'));
app.use('/vacations', require('./routes/vacations'));



app.listen(port, () => console.log('up & running'));
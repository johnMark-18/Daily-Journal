const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();


const app = express();

app.set("view engine", 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(express.json({extended: false}));


const cookieParser = require('cookie-parser');
app.use(cookieParser());



mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



app.use('/home',require("./api/home"));
app.use('/register',require("./api/register"));
app.use('/login',require("./api/login"));
app.use('/logout',require("./api/logout"));
app.use('/compose',require("./api/compose"));
app.use('/profile',require("./api/profile"));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
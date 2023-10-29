const express = require("express");
const mongoose = require("mongoose");
const { connectMongoDb } = require("./config/db");
const blogModel = require("./models/blogs");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const morgan = require("morgan");
const userController = require("./Controllers/userController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT;

// Set the view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files from the "public" directory
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// // routes
// app.use(require("./routes/index"));
// app.use(require("./routes/compose"));
// app.use(require("./routes/blog"));
// app.use

// server configurations are here....
connectMongoDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

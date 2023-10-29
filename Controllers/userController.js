const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user"); // Import your User model
const secretKey = process.env.JWT_SECRET;

// Define your signup route  handler (e.g., signup and signin)
const signup = async (req, res) => {
	try {
		const { email, password, first_name, last_name } = req.body;

		// Check if the user already exists
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new userModel({
			email: req.body.email,
			password: hashedPassword,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		});

		// Save the user to the database
		await newUser.save();

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Route handler for user sign-in
const signin = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user by email
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Compare the provided password with the stored hashed password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Generate a JWT token
		const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
			expiresIn: "1h",
		});

		res.status(200).json({ token, userId: user._id, email: user.email });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	signup,
	signin,
};

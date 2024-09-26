const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the dynamically checked/created directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique name with a timestamp
    },
});
const upload = multer({ storage: storage });

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sign",
    port: process.env.DB_PORT || 3306,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database.");
});

/* ------------- Ideas Submission Route ---------------- */

// Handle POST requests to /ideas with file upload for idea submissions
app.post('/ideas', upload.single('file'), (req, res) => {
    const { title, description, phone, type, name, address, state, city, area, email } = req.body;
    const file = req.file ? req.file.filename : null;

    console.log("Received data:", req.body);  // Log the received data
    
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const sql = "INSERT INTO ideas (title, description, phone, type, name, address, state, city, area, file, submitted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [title, description, phone, type, name, address, state, city, area, file, email]; // Include email as submitted_by

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Idea submitted successfully", data: results });
    });
});

// Fetch ideas for a specific user
app.get('/ideas', (req, res) => {
    const email = req.query.email; // Get the user's email from the query parameters

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const sql = "SELECT * FROM ideas WHERE submitted_by = ?";

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Error fetching ideas:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

/* ------------- User Signup/Login/Profile Routes ---------------- */

// Handle POST requests to /signup with image upload for user registration
app.post("/signup", upload.single("image"), (req, res) => {
    const sql = "INSERT INTO log (name, email, password, phone, image) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password, // Store the plain password (consider hashing)
        req.body.phone,
        req.file ? req.file.filename : null, // Store the filename of the uploaded image
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(201).json({ message: "User registered successfully" });
    });
});

// Handle POST requests to /login for user authentication
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM log WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        // Check if the provided password matches the stored password
        if (password === user.password) {
            return res.json({
                message: "Login successful",
                user: { email: user.email, name: user.name, phone: user.phone, image: user.image },
            });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

// Handle GET requests to /profile to fetch user details
app.get("/profile", (req, res) => {
    const email = req.query.email; // Assuming the email is passed as a query parameter

    const sql = "SELECT name, email, phone, image FROM log WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Error fetching user details:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            return res.json(results[0]); // Return user details
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
});

// Handle POST requests to update the user profile
app.post("/updateProfile", (req, res) => {
    const { email, name, newEmail, phone } = req.body;

    const sql = "UPDATE log SET name = ?, email = ?, phone = ? WHERE email = ?";
    const values = [name, newEmail, phone, email];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error updating profile:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Profile updated successfully" });
    });
});

/* ------------- Static File Serving ---------------- */

// Serve uploaded files (images and files for ideas)
app.use('/uploads', express.static(uploadDir));

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

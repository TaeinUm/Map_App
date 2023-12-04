// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const nodemailer = require("nodemailer");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const communityRoutes = require("./routes/communityRoutes");
const postRoutes = require("./routes/postRoutes");
const mapRoutes = require("./routes/mapRoutes");
const testController = require("./controllers/testController");

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ limit: "25mb" }));

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    resave: false, // Avoid resaving sessions that haven't been modified
    saveUninitialized: false, // Don't create session until something is stored
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Use MongoDB for session storage
    cookie: { secure: process.env.NODE_ENV === "production" }, // Use secure cookies in production
  })
);

// Define routes
app.use("/auth", authRoutes); // Routes for authentication
app.use("/api", postRoutes); // Routes for post-related operations
app.use("/api/users", userRoutes); // Routes for user-related operations
app.use("/api/community", communityRoutes); // Routes for community-related operations
app.use("/api/mapgraphics", mapRoutes); // Routes for map graphics
app.get("/api/test-data", testController.getDataFromTestCollection); // Route for fetching test data

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1); // Exit the process on database connection failure
  });

// Serve static files (React frontend)
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all handler for React routing: serves index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Root route (serves the React app)
app.get("/", (req, res) => {
  res.send("Welcome to TerraCanvas!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500; // Default to 500 if status code not set
  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express app for testing purposes
module.exports = app;

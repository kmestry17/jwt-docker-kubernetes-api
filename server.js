const express = require("express");
const cors = require("cors"); // For enabling CORS (consider security implications)
const isAuthenticated = require("./security/isAuthenticated"); // Import the middleware

const app = express();
const port = process.env.PORT || 5000; // Set port from environment variable or default

// CORS configuration (consider security implications)
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Example secure route using the middleware
app.get("/api/secure-data", isAuthenticated, (req, res) => {
  const decodedUser = req.user; // Access user information from the decoded token (if present)
  console.log("User accessing secure data:", decodedUser); // Log user information for debugging

  res.json({ message: "Welcome to the secure data!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

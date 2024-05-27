const express = require("express");
const jwt = require("jsonwebtoken");

// Replace with a strong, unique secret key stored securely (e.g., environment variable)
const secretKey = "hey$EV75&6$)asd456rg><#$re345RT5";

// Middleware function for authentication
const isAuthenticated = (req, res, next) => {
  // Check if the request has the authorization header
  const authHeader = req.headers.authorization;

  // If the header is missing, return an error
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing authorization header" });
  }

  // Extract the token from the header (assuming 'Bearer' token format)
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Allow request to proceed if token is valid
  } catch (error) {
    // Handle JWT verification errors
    if (error.name === "JsonWebTokenError") {
      // Invalid token format or signature
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      // Expired token
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    } else {
      // Handle other errors (consider logging for debugging)
      console.error("Error verifying JWT token:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = isAuthenticated;

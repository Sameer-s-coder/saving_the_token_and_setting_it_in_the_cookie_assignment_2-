require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Function to generate a JWT token with expiration time
const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

// Function to verify and decode a JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { error: 'Token has expired' };
        } else {
            return { error: 'Invalid token' };
        }
    }
};

// Example usage
const userData = { id: 1, username: 'kalvian' };
const token = generateToken(userData, '30s'); // Token expires in 30 seconds

console.log('Generated Token:', token);

setTimeout(() => {
    const decodedData = verifyToken(token);
    console.log('Decoded Data after expiration:', decodedData);
}, 35000); // Wait 35 seconds to check for expiration
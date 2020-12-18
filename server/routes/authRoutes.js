const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (req.body.password === user.password) {
        const userDetails = { username: user.username }
        const accessToken = jwt.sign(userDetails, "SECRETKEY");
        res.json({
            token: accessToken, 
            status: 200, 
            success: true, 
            message: 'Login Successful', 
            timestamp: Date.now() 
        });
    }
    else {
        res.json({
            success: false,
            status: 401,
            message: "Authentication Failed"
        });
    }
});

router.get("/logout", async (req, res) => {
    if(!req.headers.token){
        res.json({
            success: false,
            status: 400,
            message: "token is required"
        });
    }
    var decoded = jwt.verify(req.headers.token, 'SECRETKEY');
    const user = await User.findOne({ username:  decoded.username})
    console.log(user);
    if (user) {
        res.json({
            status: 200, 
            success: true, 
            message: 'Successfully logged out', 
        });
    }
    else {
        res.json({
            success: false,
            status: 401,
            message: "Invalid segment encoding"
        });
    }
});

module.exports = router;
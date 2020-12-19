const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const State = require("../models/stateModel")
const User = require("../models/userModel");

router.post("/createDistrict", async(req, res) => {
    const districtName = req.body.districtName
    const stateId = req.body.stateId
    const token = req.headers.token
    if (!token) {
        res.json({
            success: false,
            status: 400,
            message: "Token is required"
        });
    }
    var decoded = jwt.verify(token, 'SECRETKEY');
    const user = await User.findOne({ username: decoded.username })

    if (user) {
            State.update({ _id: stateId }, {
                $push: {
                    district:{
                        districtName: districtName
                    }
                }
            })
            .then(result => res.status(200).json({
                success: true,
                status: 200,
                message: "Operation performed successfully"
            }))
            .catch(err => res.status(400).json('Error: ' + err.message))  
    }
    else {
        res.json({
            success: false,
            status: 401,
            message: "Authentication Failed"
        });
    }
})

router.get('/getDistrict', async(req, res) => {
    const token = req.headers.token
    if (!token) {
        res.json({
            success: false,
            status: 400,
            message: "Token is required"
        });
    }
    var decoded = jwt.verify(token, 'SECRETKEY');
    const user = await User.findOne({ username: decoded.username })
    if (user) {
        const stateId = req.body.stateId
        const dist = await State.findOne({ _id:stateId })
        res.json({
            success: true,
            status: 200,
            message: "District Details",
            district: dist.district,
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
})
module.exports = router;
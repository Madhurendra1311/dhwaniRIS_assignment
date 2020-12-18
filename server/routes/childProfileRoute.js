const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();


const ChildProfile = require("../models/childProfileModel")
const User = require("../models/userModel");

router.post("/ChildProfile", async (req, res) => {
    const name = req.body.name
    const sex = req.body.sex
    const dob = req.body.dob
    const father_name = req.body.father_name
    const mother_name = req.body.mother_name
    const district_id = req.body.district_id
    const photo = req.body.photo
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
        const newChildProfile = new ChildProfile({ name, sex, dob, father_name, mother_name, district_id, photo });
        newChildProfile.save()
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

router.get('/getChildProfile', async (req, res) => {
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
        const childData = await ChildProfile.find()
        res.json({
            success: true,
            status: 200,
            message: "Child Profile Detail",
            child_profile: childData,
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

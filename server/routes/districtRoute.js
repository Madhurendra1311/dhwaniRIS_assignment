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
        const isStateExist = await State.findOne({ stateName: stateName })
        if(!isStateExist){
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
        else{
            res.json({
                success: false,
                status: 200,
                message: "Got error while saving",
                ERROR: {
                    districtName: [
                        "This District is already exist"
                    ]
                }
            })
        }   
    }
    else {
        res.json({
            success: false,
            status: 401,
            message: "Authentication Failed"
        });
    }

    // State.update({ _id: stateId }, {
    //     $push: {
    //         district:{
    //             districtName: districtName
    //         }
    //     }
    // })
    // .then((resp) => {
    //     res.status(200).json({ message: "Order Placed" })
    // })
    // .catch((err) => res.status(400).json("Error: " + err));
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
        const stateId = req.headers.stateId
        State.find({ _id:stateId })
        res.json({
            success: true,
            status: 200,
            message: "District Details",
            district: district,
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


    // const stateId = req.headers.stateId
    // State.find({ _id:stateId })
    //     .then((dist) => {
    //         res.status(200).json(dist.district)
    //     })
    //     .catch((err) => res.status(400).json("Error: " + err));
})
module.exports = router;
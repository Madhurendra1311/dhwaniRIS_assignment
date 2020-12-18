const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const State = require("../models/stateModel")
const User = require("../models/userModel");

router.post("/createState",async (req, res) => {
    const stateName = req.body.stateName
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
            const newState = new State({ stateName });
            newState.save()
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
                    stateName: [
                        "This State is already exist"
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
})

router.get('/getState', async (req, res) => {
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
        const stateData = await State.find()
        let tempState = []
        console.log(stateData.length);
        for(let i = 0; i < stateData.length; i++){
            let tempObj = {}
            tempObj['id'] = stateData[i]._id
            tempObj['stateName'] = stateData[i].stateName
            tempState.push(tempObj)
        }

        res.json({
            success: true,
            status: 200,
            message: "State Details",
            state: tempState,
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

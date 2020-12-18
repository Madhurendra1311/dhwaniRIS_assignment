const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const State = require("../models/stateModel")
const User = require("../models/userModel");

router.post("/createDistrict",(req, res) => {
    const districtName = req.body.districtName
    const stateId = req.body.stateId

    State.update({ _id: stateId }, {
        $push: {
            district:{
                districtName: districtName
            }
        }
    })
    .then((resp) => {
        res.status(200).json({ message: "Order Placed" })
    })
    .catch((err) => res.status(400).json("Error: " + err));
})

router.get('/getDistrict', (req, res) => {
    const stateId = req.headers.stateId
    State.find({ _id:stateId })
        .then((dist) => {
            res.status(200).json(dist.district)
        })
        .catch((err) => res.status(400).json("Error: " + err));
})
module.exports = router;
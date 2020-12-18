const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

let users = require('./User.json')
const userModel = require("./models/userModel")

const authRoute = require("./routes/authRoutes")
const userRoute = require("./routes/childProfileRoute")
const stateRoute = require("./routes/stateRoute")
const districtRoute = require("./routes/districtRoute")

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config();

mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err;

        if (userModel.collection.countDocuments(function (err, count) {
            if (!err && count === 0) {
                userModel.insertMany(users).then(() => {
                    console.log("Data inserted")
                }).catch((error) => {
                    console.log(error)
                });
            }
        }));
    })

    app.use(authRoute);

    app.use(userRoute)

    app.use(stateRoute)

    app.use(districtRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The server is up and running ${port}`);
});



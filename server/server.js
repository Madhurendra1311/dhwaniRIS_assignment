const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let user = require('./User.json')
const userModels = require("./models/userModel")

dotenv.config();
// const authRoute = require("./routes/authRoutes")
// const userRoute = require("./routes/userDetailsRoutes")



mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err;
        if (userModels.collection.countDocuments(function (err, count) {
            if (!err && count === 0) {
                userModels.insertMany(user).then(() => {
                    console.log("Data inserted")
                }).catch((error) => {
                    console.log(error)
                });
            }
        }));
    })

// app.use("/user", userRoute)

// app.use("/auth", authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The server is up and running ${port}`);
});



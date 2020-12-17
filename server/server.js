const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();
// const authRoute = require("./routes/authRoutes")
// const studentRoute = require("./routes/studentRoutes")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.error(err);
        console.log('Database connected')
    }
)

// app.use("/students", studentRoute)

// app.use("/user", authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The server is up and running ${port}`);
});



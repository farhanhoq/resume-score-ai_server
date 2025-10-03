const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL).then((res) => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error: ", err);
})



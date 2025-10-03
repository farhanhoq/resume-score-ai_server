const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://farhanhoq0599_db_user:3mgMpwuJziTnACsN@cluster0.5de2r9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res) => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error: ", err);
})



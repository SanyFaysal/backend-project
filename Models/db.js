const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://fahidhasanfuad:ozqaPWd3PzT5AQ9F@cluster0.evlbij4.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
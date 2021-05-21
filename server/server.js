import cors from 'cors';
import express from 'express'; // const express = require('express');
import mongoose from 'mongoose';
import postRoutes from './routes/post.js';

const app = express();

// Since this is deprecated, Express now has the function of body-parser built in since V4.16 version. 
app.use(express.json( {
    limit: "30mb",
    extended: true
}));

app.use(express.urlencoded( {
    limit: "30mb",
    extended: true
}));
// References:
// https://stackoverflow.com/questions/62396498/tslint-marks-body-parser-as-deprecated.

app.use(cors());

// When user go to localhost:8080/posts route to get post api.
app.use('/posts', postRoutes);

const CONNECTION_URL = "mongodb+srv://ndangmernmemoriesproject:ndangmernmemoriesproject123@cluster0.qthwr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

// Perform a promise when connection is successful and catch when not successful.
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config()


//routes

const userRoute = require('./routes/userRoutes');

const studentRoute = require('./routes/studentRouter');

const teacherRoute = require('./routes/teacherRoutes');

//database config

const courseRoute = require('./routes/courseRoutes')
    //database config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

//mongoose.connect('mongodb://localhost:27017/teach');
mongoose.connection.on('connected', () => {
    console.log('connected to database' + process.env.DATABASE_URL);
});

//middleware
app.use(cors());

app.use(express.json());
//routes

app.use('/api/users/', userRoute);

app.use('/api/teacher/', teacherRoute);

app.use('/api/courses/', courseRoute);
app.use('/api/student/', studentRoute);




//error handling

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
app.listen(process.env.PORT, () => {
    console.log(`
        Server started on 3000 `);
});
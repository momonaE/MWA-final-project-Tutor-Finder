const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

    studentId: String,
    enrolled: [{
        userId: String,
        courseTitle: String,
        firstName: String,
    }],



})


const Student = module.exports = mongoose.model('Student', StudentSchema);
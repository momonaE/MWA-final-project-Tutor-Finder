const mongoose = require('mongoose')
const Student = require('../models/Student')


module.exports.getById = async(req, res) => {
    const id = req.params.studentId;
    await Student.findById(id).exec((err, data) => {
        if (!err) {
            res.json(data.enrolledCourses);
        }
    });
}

module.exports.sendCourse = async(req, res) => {
    const { _id, courseId } = req.body;



}

module.exports.addStudents = async(req, res) => {
    const body = req.body;
    await Student.insertMany(body).exec((err, data) => {
        if (!err) {
            res.json({ msg: true });
        }
    })

}

module.exports.deleteCourse = async(req, res) => {
    const { _id, courseId } = req.params;
    await Student.updateOne({ studentId: _id }, { $pull: { enrolledCourses: { courseId: courseId } } }).exec((err, data) => {
        if (!err) {
            res.json({ msg: 'sucessful' })
        }
    })
}
module.exports.enroll = async(req, res) => {
    const { studentId, userId, firstName, courseTitle } = req.body;
    console.log(req.body)

    const studentsnew = await Student.findOne({
        studentId: studentId
    }).exec();
    console.log("herenew" + studentsnew);

    if (studentsnew == null) {
        const result = await new Student({
            studentId,
            enrolled: [req.body]
        }).save();
        console.log(result)
        if (result) {
            return res.json({ success: true, data: {}, msg: 'new  enrollment added !', status: res.statusCode })

        } else {
            return res.json({
                success: false,
                data: {},
                msg: 'Failed to add enrollment',
                status: res.statusCode
            })

        }

    }
    const students = await Student.findOne({
        'enrolled.courseTitle': courseTitle,
        studentId: studentId
    }).exec();

    console.log("here" + students);

    if (students) {


        return res.json({
            success: false,
            data: {},
            msg: 'already enrollment',
            status: res.statusCode
        })

    }

    const r = await Student.updateOne({ studentId }, {
        $addToSet: {

            enrolled: { userId, firstName, courseTitle }
        }

    })



    return res.json({
        success: false,
        data: r,
        msg: 'successful',
        status: res.statusCode
    })

}
module.exports.enrolledCourses = async(req, res) => {
    const { userId } = req.params
    console.log()
    const result = await Student.find({ studentId: userId }).exec();
    console.log(result)
    return res.json({
        success: false,
        data: result,
        msg: 'enrollment',
        status: res.statusCode
    })
}
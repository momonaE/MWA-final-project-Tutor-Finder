const teacher = require('../models/Teacher');
const tokengen = require('../tokenGenerator/tokengen');
const Coursedata = require('../models/Course');
const Student = require('../models/Student')

module.exports.fetch = async(req, res) => {
    let courses = await teacher.find({ tokengen }).exec()
    if (courses) {
        return res.json({
            success: 1,
            data: courses,
            msg: "courses found!",
            status: res.statusCode
        });
    } else {
        return res.json({ success: 1, data: {}, msg: "courses not found", status: res.statusCode });
    }
}

module.exports.remove = async(req, res) => {
    const { userId, courseId } = req.body
    console.log(courseId + '...' +
        userId)
    const r = await teacher.updateOne({ userId: courseId }, {
        $pull: {
            courses: { _id: userId }

        }

    })
    console.log(r)

    if (r) {
        res.json({ success: true, data: {}, msg: '  course deleted !', status: res.statusCode })

    } else {
        res.json({
            success: false,
            data: {},
            msg: 'Failed to delete course',
            status: res.statusCode
        })

    }
}


module.exports.addcourse = async(req, res) => {
    const { userId, course, firstName } = req.body
    console.log("coursename" + firstName)
    const teachers = await teacher.findOne({
        userId: userId
    }).exec();

    if (teachers) {

        teachers.courses.push({ userId, courses: course })
        const r = await teacher.updateOne({ userId }, {
            $addToSet: {

                courses: course
            }

        })
        if (r) {
            res.json({ success: true, data: {}, msg: 'new  course added !', status: res.statusCode })

        } else {
            res.json({
                success: false,
                data: {},
                msg: 'Failed to add course',
                status: res.statusCode
            })

        }
    } else {
        const result = new teacher({ userId, courses: [course], firstName }).save();

        if (result) {
            res.json({ success: true, data: {}, msg: 'new  course selected !', status: res.statusCode })

        } else {
            res.json({
                success: false,
                data: {},
                msg: 'Failed to add course',
                status: res.statusCode
            })

        }


    }
}
module.exports.getcourseByuserId = async(req, res) => {
    const { userId } = req.params;
    const teachers = await teacher.findOne({
        userId: userId
    }).exec();
    console.log(teachers)
    return res.json({
        success: false,
        data: teachers,
        msg: 'Failed to add course',
        status: res.statusCode
    })

}

module.exports.add = async(req, res) => {
    console.log("teacher" + req.body);

    const data = new teacher(req.body)
    await data.save()
    const result = teacher.addteacher(
        new teacher(req.body));
    console.log(result);

    // await teacher.updateOne({tokengen},{$push:{course:req.body}});

    res.send({ success: 1, data: teacher });



}

module.exports.edit = async(req, res) => {
    console.log(req.body);


}

module.exports.edit = async(req, res) => {
    console.log(req.body);


    await teacher.updateOne({ tokengen }, { $set: { "course.$[obj]": req.body } }, { arrayFilters: { "obj.courseId": req.params.id } })
    res.send({ success: 1, data: teacher });

}




module.exports.searchCourse = async(req, res) => {

    let { courseTitle } = req.params;


    const result = await teacher.find({
            "courses.courseTitle": courseTitle,
        }

    ).exec()
    if (result.length == 0) {
        return res.json({
            success: false,
            data: {},
            msg: 'No courses Available Now ',
            status: res.statusCode
        })
    }
    let userId;
    let ca = []
    let user = [];
    let names = []
    result.map((c) => {
        user.push({
            userId: c.userId,
            firstName: c.firstName
        })



    })
    console.log(user)
    r = result[0].courses.map((c) => {
        if (c.courseTitle == courseTitle) {
            ca.push(c)

        }

        return c.courseTitle = courseTitle

    })
    console.log(ca)

    return res.json({
        success: false,
        data: ca,
        teachers: result,
        user: user,

        msg: 'Failed to add course',
        status: res.statusCode
    })

}

module.exports.enrolledStudent = async(req, res) => {
    const { userId } = req.params
    const result = await Student.find({ 'enrolled.userId': userId }).exec();
    console.log(result)
    return res.json({
        success: false,
        data: result,
        msg: 'enrollment',
        status: res.statusCode
    })
}
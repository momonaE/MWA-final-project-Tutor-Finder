const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');


const { fetch, remove, addcourse, edit, searchCourse, getcourseByuserId } = teacherController;

router.post('/addcourse', addcourse);
router.get('/teacherCourses/:userId', getcourseByuserId);
router.get('/', fetch);

router.put('/updatecourse', remove);
router.get('/search/:courseTitle', searchCourse);
router.get('/enrolledStudent/:userId', teacherController.enrolledStudent)
module.exports = router;
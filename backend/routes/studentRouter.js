const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');


router.get("/:studentId", studentController.getById);
router.post("/", studentController.sendCourse);
router.post("/:_id/:courseId", studentController.deleteCourse);
router.post("/enroll", studentController.enroll);
router.get("/checkenroll/:userId", studentController.enrolledCourses);

module.exports = router;
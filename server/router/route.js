import { Router } from "express";
const router = Router();


import * as controller from '../controllers/appController.js'


import Auth , {localVariavles} from '../middleware/auth.js'

router.route('/register').post((controller.register))

router.route('/login').post(controller.verifyUser,controller.login);

router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end());

router.route('/user/:email').get(controller.getEmail);

router.route('/addcourse').post((controller.addCourse));

router.route('/allcourses').post((controller.retrieveCourses))

router.route('/myuploads').post((controller.myUploads))

router.route('/addtopic').post((controller.addTopic))

router.route('/course').post(controller.viewCourse)

router.route('/deletecourse/:title').delete(controller.deleteCourse)

router.route('/mycourses').post((controller.myCourses))

router.route('/enrollcourse').post((controller.enrollCourse))

router.route('/updateuser').put(Auth,controller.updateUser)

export default router;
import { Router } from "express";
const router = Router();


import * as controller from '../controllers/appController.js'
import {registerMail} from '../controllers/mailer.js'

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

router.route('/deletecourse/:Id').delete(controller.deleteCourse)

router.route('/mycourses').post((controller.myCourses))

router.route('/enrollcourse').post((controller.enrollCourse))

router.route('/updateuser').put(Auth,controller.updateUser)

router.route('/updatetopic').put(controller.updateTopic)

router.route('/changepassword').put(controller.changePassword)

router.route('/generateOTP').post(controller.verifyUser,localVariavles,controller.generateOTP)


router.route('/VerifyOTP').get(controller.verifyUser,controller.verifyOTP)  

router.route('/registerMail').post((registerMail));

router.route('/updatepassword').put(controller.updatePassword)

router.route('/updatelikestatus').put(controller.updateLike)


router.route('/likeStatus').get(controller.getLikeStatus);

router.route('/unregisterCourse').delete(controller.unRegisterCourse);
export default router;
import { Router } from "express";
const router = Router();


import * as controller from '../controllers/appController.js'

router.route('/register').post((controller.register))

router.route('/login').post(controller.verifyUser,controller.login);

router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end());

router.route('/user/:email').get(controller.getEmail);

router.route('/addcourse').post((controller.addCourse));

router.route('/allcourses').post((controller.retrieveCourses))
export default router;
import { Router } from "express";
const router = Router();


import * as controller from '../controllers/appController.js'

router.route('/register').post((controller.register))

router.route('/login').post(controller.verifyUser,controller.login);

export default router;
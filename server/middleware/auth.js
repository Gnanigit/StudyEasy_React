import jwt from "jsonwebtoken"
import ENV from "../config.js"
export default async function Auth(req,res,next){
    try{
        const token =req.headers.authorization.split(" ")[1];
        const decodeToken =await jwt.verify(token,ENV.JWT_SECRET)
        req.user=decodeToken;
        // res.json(decodeToken)
        next();
    }
    catch(error){
        console.log("error here")
        res.status(401).send({error:"authentication failed"})
    }
}

export function localVariavles(req,res,next){
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next()
}
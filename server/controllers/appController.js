import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'


export async function register(req,res){
    try {
        const { email, first_name,last_name,password } = req.body.credentials;  
        const flag=req.body.flag;
// check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .exec()
                .then(userEmail => {
                    if (userEmail) {
                        reject({ error: "Please use a unique email" });
                    } else {
                        resolve();
                    }
                })
                .catch(err => {
                    reject(new Error(err));
                });
        });
        Promise.all([ existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            const user = new UserModel({
                                firstName:first_name,
                                lastName:last_name,
                                password: hashedPassword,
                                email:email,
                                role:flag,
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"})) //user data will be present in the result 
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            console.log(error)
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                console.log(error)
                return res.status(500).send({ error })
            })


    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

export async function verifyUser(req,res,next){
    try{
        const {email}=req.method =="GET"? req.query:req.body;

        // check the user existence
        let exist =await UserModel.findOne({email});
        if(!exist){
            return res.status(404).send({error:"cannot find user"});
        }
        next();
    }
    catch(error){
        return res.status(404).send({error:"Authentication error"})
    }
}
export async function login(req,res){
    const {email,password}=req.body;
    try{
        UserModel.findOne({email}).then(user=>{
            bcrypt.compare(password,user.password)
            .then(passwordCheck=>{
                if(!passwordCheck){
                    return res.status(404).send({error:"don't have password"})
                }

                //create jwt token
                // const token =jwt.sign({
                //     userId:user._id,
                //     username:user.username,
                // },ENV.JWT_SECRET,{expiresIn:"24h"});
                return res.status(200).send({
                    msg:"Login successful",
                    username:user.username,
                    // token

                })

            })
            .catch(error=>{
                res.status(404).send({error:"password does not match"})
            })
        })
        .catch(error=>{
            return res.status(404).send({error:"Username not found"})
        })
    }
    catch(error){
        res.status(500).send({error})
    }
}
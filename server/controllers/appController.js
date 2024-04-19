import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'


export async function register(req,res){

    try {
        const { first_name, last_name,password, email } = req.body;     

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
                                email:email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"})) //user data will be present in the result 
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
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
        
        return res.status(500).send(error);
    }

}
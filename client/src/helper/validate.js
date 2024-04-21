import toast from 'react-hot-toast'
import { authenticate } from './helper'

export async function emailValidate(values){
    const errors = emailVerify({}, values);

    if(values.email){
        // check user exist or not
        const { status } = await authenticate(values.email);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}



function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error('Username Required...!');
    }else if(values.email.includes(" ")){
        error.wmail = toast.error('Invalid Username...!')
    }

    return error;
}
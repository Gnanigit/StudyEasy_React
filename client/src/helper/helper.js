import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


export async function registerUser(credentials,flag){
    console.log(flag)
    try{
        const {data:{msg}} = await axios.post(`/api/register`,{credentials,flag});
        // if(status === 201){
        //     await axios.post('/registerMail', { userEmail : email, text : msg});
        // }
        return Promise.resolve(msg);
    }
    catch(error){
        return Promise.reject({error})
    }
}

export async function verifyPassword({ email, password }){
    try {
        if(email){
            const { data } = await axios.post('/api/login', { email, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}
/** authenticate function */
export async function authenticate(email){
    try {
        return await axios.post('/api/authenticate', { email })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

export async function getEmail(){
    const token = localStorage.getItem('token');
    console.log(token)
    if(!token){
        return Promise.resolve("cannot find token");
    }
    let decode = jwtDecode(token);
    console.log(decode)
    return decode;
}

export async function addCourse(values){
    try {
        console.log(values)
        const { data : { msg }} = await axios.post(`/api/addcourse`, values);
        // let { username, email } = credentials;
        /** send email */
        // if(status === 201){
        //     await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        // }
        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function allCourses(){
    try{
        const { data } = await axios.post('/api/allcourses')
        return data;
    }
    catch(error){
        return error;
    }
}
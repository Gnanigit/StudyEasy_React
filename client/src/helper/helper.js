import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


export async function registerUser(credentials,flag){
   
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
    if(!token){
        return Promise.resolve("cannot find token");
    }
    let decode = jwtDecode(token);
  
    return decode;
}

export async function addCourse(values){
    try {
  
        const { data : { msg }, status } = await axios.post(`/api/addcourse`, values);
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

export async function addTopic(values){
    try {
       
        const { data : { msg }} = await axios.post(`/api/addtopic`, values);
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
export async function myUploads(values){
    try{
        const { data } = await axios.post('/api/myuploads',{values})
        return data;
    }
    catch(error){
        return error;
    }
}
export async function myCourses(values){
    try{
      
        const { data } = await axios.post('/api/mycourses',{values})
        return data;
    }
    catch(error){
        return error;
    }
}

export async function viewCourse(values){

    const Id = values.Id
    try{
        const { data } = await axios.post('/api/course',{Id})
        return data;
    }
    catch(error){
        return error;
    }
}
export async function deleteCourse(Id){
    try{
  
        const { data : { msg }} =await axios.delete(`/api/deletecourse/${encodeURIComponent(Id)}`);
        return msg;
    }
    catch(error){
        return error;
    }
}

export async function enrollCourse(values){
    try{
        const { data : { msg }, status } =await axios.post('/api/enrollcourse',values);
        return msg;
    }
    catch(error){
        return error;
    }
}


export async function updateUser(values){
    try {
        const token = await localStorage.getItem('token');
      
        const data = await axios.put('/api/updateuser', values, { headers : { "Authorization" : `Bearer ${token}`}});


        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

export async function updateTopicLinks(values){
    try {
        const data = await axios.put('/api/updatetopic', values);
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}
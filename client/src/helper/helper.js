import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function registerUser(credentials,flag){
    console.log(flag)
    try{
        const {data:{msg},status} = await axios.post(`/api/register`,{credentials,flag});
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
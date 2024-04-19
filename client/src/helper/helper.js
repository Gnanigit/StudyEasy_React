import axios from 'axios';

export async function registerUser(credentials){
    try{
        console.log("hellooooo",{credentials})
        const {data:{msg},status} = await axios.post(`/register`,{credentials});
        let {email}= credentials;
        // if(status === 201){
        //     await axios.post('/registerMail', { userEmail : email, text : msg});
        // }
        return Promise.resolve(msg);
    }
    catch(error){
        return Promise.reject({error})
    }
}
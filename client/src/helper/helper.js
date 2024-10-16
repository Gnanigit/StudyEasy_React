import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function registerUser(credentials, flag) {
  try {
    const {
      data: { msg },
    } = await axios.post(`/api/register`, { credentials, flag });

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function inputChatBot(prompt) {
  try {
    const response = await axios.post(`/api/generate`, prompt);
    console.log(response);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyPassword({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/api/login", { email, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}
/** authenticate function */
export async function authenticate(email) {
  try {
    return await axios.post("/api/authenticate", { email });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

export async function getEmail() {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.resolve("cannot find token");
  }
  let decode = jwtDecode(token);

  return decode;
}

export async function addCourse(values) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/addcourse`, values);
    // let { username, email } = credentials;
    /** send email */
    // if(status === 201){
    //     await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
    // }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function allCourses() {
  try {
    const { data } = await axios.post("/api/allcourses");
    return data;
  } catch (error) {
    return error;
  }
}

export async function addTopic(values) {
  try {
    const {
      data: { msg },
    } = await axios.post(`/api/addtopic`, values);

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function myUploads(values) {
  try {
    const { data } = await axios.post("/api/myuploads", { values });
    return data;
  } catch (error) {
    return error;
  }
}
export async function myCourses(values) {
  try {
    const { data } = await axios.post("/api/mycourses", { values });
    return data;
  } catch (error) {
    return error;
  }
}

export async function viewCourse(values) {
  const Id = values.Id;
  try {
    const { data } = await axios.post("/api/course", { Id });
    return data;
  } catch (error) {
    return error;
  }
}
export async function deleteCourse(Id) {
  try {
    const { data } = await axios.delete(
      `/api/deletecourse/${encodeURIComponent(Id)}`
    );
    return data;
  } catch (error) {
    return error;
  }
}

export async function unRegisterCourse(values) {
  try {
    const Id = values.Id;
    const email = values.email;
    const { data } = await axios.delete("/api/unregisterCourse", {
      params: { Id, email },
    });
    return data;
  } catch (error) {
    return error;
  }
}
export async function enrollCourse(values) {
  try {
    const response = await axios.post("/api/enrollcourse", values);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateUser(values) {
  try {
    const token = await localStorage.getItem("token");

    const data = await axios.put("/api/updateuser", values, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

export async function updateTopicLinks(values) {
  try {
    const data = await axios.put("/api/updatetopic", values);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

export async function changePassword(values) {
  try {
    console.log(values);
    const data = await axios.put("/api/changepassword", values);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(email) {
  try {
    const {
      data: { code },
      status,
    } = await axios.post("/api/generateOTP", { email });
    if (status === 201) {
      const { data } = await getUser({ email });
      const firstName = data.firstName;
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        email: email,
        firstName: firstName,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ email, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { email, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUser({ email }) {
  try {
    const { data } = await axios.get(`/api/user/${email}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

export async function updatePassword(values) {
  try {
    const data = await axios.put("/api/updatepassword", values);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

//likes
export const updateLikeStatus = async ({ courseId, email, likeStatus }) => {
  try {
    const response = await axios.put("/api/updatelikestatus", {
      courseId,
      email,
      likeStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating like status:", error);
    throw error;
  }
};

export async function getLikeStatus(values) {
  const { email } = values;
  const { courseId } = values;
  try {
    const response = await axios.get("/api/likeStatus", {
      params: { email, courseId },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching like status",
    };
  }
}

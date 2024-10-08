import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

import otpGenerator from "otp-generator";
import allCoursesModel from "../models/allCourses.js";
import addTopicsModel from "../models/addtopic.js";
import myCoursesModel from "../models/mycourses.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function register(req, res) {
  try {
    const { email, first_name, last_name, password } = req.body.credentials;
    const flag = req.body.flag;
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .exec()
        .then((userEmail) => {
          if (userEmail) {
            reject({ error: "Please use a unique email" });
          } else {
            resolve();
          }
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
    Promise.all([existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                firstName: first_name,
                lastName: last_name,
                password: hashedPassword,
                email: email,
                role: flag,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                ) //user data will be present in the result
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function verifyUser(req, res, next) {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    // check the user existence
    let exist = await UserModel.findOne({ email });
    if (!exist) {
      return res.status(404).send({ error: "cannot find user" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication error" });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    UserModel.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(404).send({ error: "don't have password" });
            }

            //create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );
            return res.status(200).send({
              msg: "Login successful",
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            res.status(404).send({ error: "password does not match" });
          });
      })
      .catch((error) => {
        return res.status(201).send({ error: "Username not found" });
      });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function addCourse(req, res) {
  try {
    const { email, courseImage, courseTitle, content } = req.body;
    // Check if the course already exists
    const courseExists = await allCoursesModel.findOne({ courseTitle }).exec();
    if (courseExists) {
      return res.status(201).send({ error: "Course already exists" });
    }
    // Create a new course
    const newCourse = new allCoursesModel({
      email: email,
      courseImg: courseImage,
      courseTitle: courseTitle,
      content: content,
      likes: 0,
    });
    // Save the new course
    const savedCourse = await newCourse.save();
    return res.status(201).send({ msg: "Course added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
}

export async function retrieveCourses(req, res) {
  try {
    const courses = await allCoursesModel.find({});

    return res.status(201).send(courses);
  } catch (error) {
    res.status(500).send("Error retrieving courses");
  }
}
export async function myCourses(req, res) {
  try {
    const email = req.body.values.email;
    const courses = await myCoursesModel.find({ email: email });
    const data = await Promise.all(
      courses.map(async (course) => {
        const courseData = await allCoursesModel.findOne({
          _id: course.courseId,
        });
        return courseData;
      })
    );

    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error retrieving courses");
  }
}

export async function myUploads(req, res) {
  try {
    const email = req.body;
    const courses = await allCoursesModel.find({ email: email.values.email });
    return res.status(201).send(courses);
  } catch (error) {
    res.status(500).send("Error retrieving courses");
  }
}

export async function addTopic(req, res) {
  try {
    const { courseId, courseTitle, topicTitle, link1, link2, link3, link4 } =
      req.body;
    // Create a new course
    const newTopic = new addTopicsModel({
      courseId: courseId,
      courseTitle: courseTitle,
      topicTitle: topicTitle,
      link1: link1,
      link2: link2,
      link3: link3,
      link4: link4,
    });
    // Save the new course
    const savedTopic = await newTopic.save();
    return res.status(201).send({ msg: "Course added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
}

export async function viewCourse(req, res) {
  try {
    const { Id } = req.body;
    const topics = await addTopicsModel.find({ courseId: Id });
    return res.status(201).send(topics);
  } catch (error) {
    res.status(500).send("Error retrieving topics");
  }
}
export async function deleteCourse(req, res) {
  try {
    const Id = req.params.Id;
    await addTopicsModel.deleteMany({ courseId: Id });
    const result = await allCoursesModel.deleteOne({ _id: Id });
    if (result.deletedCount === 1) {
      res.status(201).json({ msg: "Course deleted successfully" });
    } else {
      res.status(201).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function unRegisterCourse(req, res) {
  try {
    const { Id, email } = req.query;
    const result = await myCoursesModel.deleteOne({
      courseId: Id,
      email: email,
    });
    if (result.deletedCount === 1) {
      res.status(201).json({ msg: "Course Un-Registered successfully" });
    } else {
      res.status(201).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error Un-Registering course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// backend (appController.js)
export async function enrollCourse(req, res) {
  const { Id, email } = req.body;
  try {
    const enrollExists = await myCoursesModel.findOne({
      courseId: Id,
      email: email,
    });

    if (enrollExists) {
      return res
        .status(201)
        .send({ success: false, message: "Course already Enrolled" });
    }

    const newEnroll = new myCoursesModel({
      courseId: Id,
      email: email,
      like: 0,
    });

    const savedEnroll = await newEnroll.save();
    return res
      .status(201)
      .send({ success: true, message: "Course enrolled successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const body = req.body;

      // Update the data
      UserModel.updateOne({ _id: userId }, body)
        .exec()
        .then(() => {
          return res.status(201).send({ msg: "Record Updated...!" });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
}

export async function updateTopic(req, res) {
  try {
    const { topicId } = req.body;
    if (topicId) {
      const { updatedData } = req.body;
      const updateObj = {};
      if (updatedData.link1) {
        updateObj.link1 = updatedData.link1;
      }
      if (updatedData.link2) {
        updateObj.link2 = updatedData.link2;
      }
      if (updatedData.link3) {
        updateObj.link3 = updatedData.link3;
      }
      if (updatedData.link4) {
        updateObj.link4 = updatedData.link4;
      }
      addTopicsModel
        .updateOne({ _id: topicId }, updateObj)
        .then(() => {
          return res.status(201).send({ msg: "Record Updated...!" });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return res.status(401).send({ error: "Topic Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
}

export async function changePassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(401).send({ error: "User Not Found...!" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: "Incorrect Old Password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    return res.status(200).send({ message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(req.app.locals.OTP);
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true; // start session for to reset password
    return res.status(201).send({ msg: "verified successfully" });
  } else {
    return res.status(401).send("Invalid OTP");
  }
}
export async function getEmail(req, res) {
  const { email } = req.params;

  try {
    if (!email) {
      return res.status(501).send({ error: "Invalid email" });
    }
    UserModel.findOne({ email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(501).send({ error: "Couldn't find the user" });
        } else {
          const { password, ...rest } = Object.assign({}, user.toJSON());
          return res.status(201).send(rest);
        }
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  } catch (error) {
    return res.status(404).send({ error: "cannot find user data" });
  }
}

export async function updatePassword(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
}

export async function updateLike(req, res) {
  try {
    const { courseId, email, likeStatus } = req.body;

    const existEnroll = await myCoursesModel.findOne({
      email: email,
      courseId: courseId,
    });
    const course = await allCoursesModel.findOne({ _id: courseId });

    if (!existEnroll) {
      return res
        .status(401)
        .send({ success: false, error: "Enrollment Not Found...!" });
    }
    existEnroll.like = likeStatus;
    if (likeStatus === 1) {
      course.likes += 1;
    } else {
      course.likes -= 1;
    }

    await course.save();
    const x = await allCoursesModel.findOne({ _id: courseId });
    const count = x.likes;
    await existEnroll.save();
    return res
      .status(200)
      .send({ success: true, message: "You Liked a Course", likes: count });
  } catch (error) {
    return res.status(401).send({ success: false, error: error.message });
  }
}

// appController.js
export async function getLikeStatus(req, res) {
  const { courseId, email } = req.query; // Extract courseId and email from req.query
  try {
    const course = await myCoursesModel.findOne({ courseId, email });

    if (course) {
      return res
        .status(200)
        .send({ success: true, isLiked: course.like === 1 });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching like status:", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
}

// GEN AI ----------------------------------------------------------------

const genAI = new GoogleGenerativeAI(ENV.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export async function generate(req, res) {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await model.generateContent(prompt);
    const generatedText = response.response.text();
    console.log("Generated content:", generatedText);
    res.json({ result: generatedText });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

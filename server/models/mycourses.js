import mongoose from "mongoose";
import _default from "otp-generator";

export const myCoursesSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: false,
    },
    like:{
        type: Number,
    }
});

export default mongoose.model.myCourses || mongoose.model('myCourse', myCoursesSchema);
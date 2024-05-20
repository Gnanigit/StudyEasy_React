import mongoose from "mongoose";

export const allCoursesSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true, "Please provide a unique email"]
    },
    courseImg: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    courseTitle: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    content: { type: String},
    likes:Number
});

export default mongoose.model.allCourses || mongoose.model('allCourse', allCoursesSchema);
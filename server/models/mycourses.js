import mongoose from "mongoose";

export const myCoursesSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"]
    }
});

export default mongoose.model.myCourses || mongoose.model('myCourse', myCoursesSchema);
import mongoose from "mongoose";

export const addTopicsSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required : [true, "Please provide a course Title"]
    },
    courseTitle: {
        type: String,
        required : [true, "Please provide a course Title"]
    },
    topicTitle:{
        type: String,
        required : [true, "Please provide a Topic Title"]
    },
    link1: {
        type: String,
        required: [true, "Please provide link 1"],
        unique : false,
    },
    link2: {
        type: String,
        required: [true, "Please provide link 2"],
        unique : false,
    },
    link3: {
        type: String,
        required: [true, "Please provide link 3"],
        unique : false,
    },
    link4: {
        type: String,
        required: [true, "Please provide link 4"],
        unique : false,
    }
});

export default mongoose.model.allTopics || mongoose.model('allTopic', addTopicsSchema);
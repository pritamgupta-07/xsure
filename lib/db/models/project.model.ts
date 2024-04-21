import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    paymentstatus: {
        type: Boolean,
        default: false,
    },
});

const project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default project;
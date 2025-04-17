const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const studentSchema = new Schema({
    educationalYear: { type: String, required: true, trim: true },
    userRole: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    rbtno: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNo: { type: String, required: true, trim: true },
    parentNo: { type: String, required: true, trim: true },
    parentEmail: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    passoutBatch: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }});

const student = mongoose.model("student",studentSchema);

module.exports = student;
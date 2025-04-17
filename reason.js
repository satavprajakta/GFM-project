const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reasonsSchema = new Schema({
    student_name: { type: String },
    rbt_no: { type: String },
    absent_date: { type: String },
    reason: { type: String },
    file: { type: String } 
});

const Reasons = mongoose.model("Reasons", reasonsSchema);
module.exports = Reasons;

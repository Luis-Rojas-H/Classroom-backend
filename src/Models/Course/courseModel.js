const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {User} = require('../User/userModel');
const courseSchema = new Schema({
    Code:{ type: String, unique: 'El codigo ({VALUE}) ya esta en uso.' },
    Name: String,
    TypeOfCourse: String,
    participants: [{ type: Schema.Types.ObjectId,ref:"user" }],
    homeworks:[{type:Schema.Types.ObjectId,ref:"homework"}],
    announcements:[{type:Schema.Types.ObjectId,ref:"announcement"}]

});

const Course = mongoose.model('course', courseSchema);
module.exports = Course;
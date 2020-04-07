const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: Schema.ObjectId,
        ref: 'Question',
        required: true
    },
    body: [{
        type: String,
        required: true
    }],
    sectionId: {
        type: Schema.ObjectId,
        ref: 'Section',
        required: true
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
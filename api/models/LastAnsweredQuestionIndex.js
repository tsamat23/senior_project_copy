const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LastAnsweredQuestionIndexSchema = new Schema({
    index: {
        type: String,
        required: true
    },
    sectionId: {
        type: Schema.ObjectId,
        ref: 'Section',
        required: true
    },
    questionIdArray: [{
        type: Schema.ObjectId,
        ref: 'Question',
        required: true
    }],
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

const LastAnsweredQuestionIndex = mongoose.model('LastAnsweredQuestionIndex', LastAnsweredQuestionIndexSchema);
module.exports = LastAnsweredQuestionIndex;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Тест'
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'input',
        enum: ['input', 'checkbox', 'radio', 'picture', 'test', 'info']
    },
    importantAnswerVariant: [],
    data: [],
    answers: [{
      type: Schema.ObjectId,
      ref: 'Answer'
    }],
    isAnswered: {
        type: Boolean
    },
    sectionId: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
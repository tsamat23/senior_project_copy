const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.ObjectId,
        ref: 'Question'
    },
    sectionId: {
        type: Schema.ObjectId,
        ref: 'Section'
    },
    answer: {
        type: []
    },
    isShowed: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('UserNotification', NotificationSchema);
module.exports = Notification;
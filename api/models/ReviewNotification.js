const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewNotificationSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    sectionId: {
        type: Schema.ObjectId,
        ref: 'Section'
    }
});

const ReviewNotification = mongoose.model('ReviewNotification', ReviewNotificationSchema);
module.exports = ReviewNotification;
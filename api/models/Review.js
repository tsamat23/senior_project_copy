const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    sectionId: {
        type: Schema.ObjectId,
        ref: 'Section',
        required: true
    },
    review: String
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
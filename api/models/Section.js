const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    comment: String
});

const SectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: String,
    description: String,
    rate: [{
        user: {type: Schema.ObjectId, ref: 'User', required: true},
        rate: {type: Number, default: null, required: false},
        comment: {type: String, default: null}
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    passed: {
        type: Number,
        default: 0
    },
    questions: [{
        type: Schema.ObjectId,
        ref: 'Question',
        required: true
    }],
    review: [{type: Schema.Types.ObjectId, ref: 'Review'}],
});


SectionSchema.methods.calcAverage = function (rateArray) {
    const filteredArray = rateArray.filter(obj => {
        if (obj.rate !== null) {
            return obj.rate;
        }
    });

    const arrayOfRates = filteredArray.map(obj => {
        return obj.rate;
    });

    const reducedArray = arrayOfRates.reduce((sum, current) => {
        return sum + current;
    }, 0);

    this.averageRating = reducedArray / arrayOfRates.length;
};

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
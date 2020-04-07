const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    passed: {
        type: Number,
        default: 0
    },
    sections: [{
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }]
});

const Block = mongoose.model('Block', BlockSchema);
module.exports = Block;
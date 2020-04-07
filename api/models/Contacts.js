const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    phone: {
        type: String
    },
    whatsapp: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    address: {
        type: String
    }
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
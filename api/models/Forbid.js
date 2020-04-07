const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForbidSchema = new Schema({
  sections: [{
    userId: String,
    sectionId: String,
    dateEnd: Date
  }]
});

const Forbid = mongoose.model('Forbid', ForbidSchema);
module.exports = Forbid;

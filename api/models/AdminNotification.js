const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminNotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  showed: {
    type: Boolean,
    default: false
  },
  notify: {
    type: Schema.Types.ObjectId,
    required: true
  },
  review: {
    type: Boolean,
    default: false
  }
});

const AdminNotification = mongoose.model('AdminNotification', AdminNotificationSchema);

module.exports = AdminNotification;
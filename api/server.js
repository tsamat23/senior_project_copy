const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CronJob = require('cron/lib/cron').CronJob;
const moment = require('moment');

const Forbid = require('./models/Forbid');
const User = require('./models/User');
const config = require('./config');
const users = require('./app/users');
const blocks = require('./app/blocks');
const sections = require('./app/sections');
const questions = require('./app/questions');
const answers = require('./app/answers');
const results = require('./app/results');
const notifications = require('./app/notifications');
const reviews = require('./app/reviews');
const contacts = require('./app/contacts');
const aboutUs = require('./app/aboutUs');
app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.db.url + '/' + config.db.name, {useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Mongoose connected!');

    app.use('/api/users', users());
    app.use('/api/blocks', blocks());
    app.use('/api/sections', sections());
    app.use('/api/questions', questions());
    app.use('/api/answers', answers());
    app.use('/api/results', results());
    app.use('/api/notifications', notifications());
    app.use('/api/reviews', reviews());
    app.use('/api/contacts', contacts());
    app.use('/api/aboutUs', aboutUs());

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});

const job = new CronJob('00 30 7 * * 0-6', async function() {
  const currentDate = moment();

  const forbids = await Forbid.find();
  const users = await User.find();

  users.forEach(user => {
    const userId = user._id;
    forbids.forEach(forbid => {
      forbid.sections.forEach(forbiddenSection => {
        user.sections.forEach(async section => {
          if (forbiddenSection.userId === userId.toString() && forbiddenSection.sectionId === section._id.toString()) {
            const passedDays = currentDate.diff(forbiddenSection.dateEnd, 'days');
            if (passedDays >= 28) {
              const index = user.sections.indexOf(section._id);
              user.sections.splice(index, 1);
              await user.save();
              await Forbid.deleteOne({_id: forbid._id});
            }
          }
        })
      })
    })
  });
});

job.start();





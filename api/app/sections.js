const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const nanoid = require("nanoid");
const multer = require('multer');
const path = require('path');
const moment = require('moment');

const User = require('../models/User');
const Answer = require('../models/Answer');
const Section = require('../models/Section');
const Forbid = require('../models/Forbid');
const LastAnsweredQuestionIndex = require('../models/LastAnsweredQuestionIndex');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});


const createRouter = () => {
    const router = express.Router();

    router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
        try {
            const newSection = req.body;

            if (req.file) {
                newSection.image = req.file.filename;
            }
            const section = new Section(newSection);

            section.save().then(result =>
                res.send(result))
        } catch (e) {
            res.status(500).send({message: 'Невозможно сохранить секцию в данный момент'})
        }
    });

    router.post('/submit', auth, async (req, res) => {
        try {
            let sectionId = req.body.sectionId;
            // const admin = await User.findOne({role: 'admin'});
            const user = req.user;

            // const notificationData = {
            //     userId: user._id,
            //     sectionId: sectionId,
            //     notify: admin._id
            // };

            // const notification = new AdminNotification(notificationData);
            // await notification.save();
            user.sections.push(sectionId);
            await user.save();

            const forbidData = {
                userId: user._id,
                sectionId: sectionId,
                dateEnd: moment()
            };
            const forbid = new Forbid(forbidData);
            forbid.sections.push(forbidData);
            await forbid.save();

            return res.status(200).send(user.sections);
        } catch (error) {
            return res.status(500).send({message: 'Произошла ошибка!'});
        }
    });

    router.post('/edit/:id', [auth, permit('admin'), upload.single('image')], async (req, res) => {
        const sectionId = req.params.id;

        try {
            const section = await Section.findById(sectionId);

            if (req.file) {
                section.image = req.file.filename;
            }
            section.description = req.body.description;
            section.title = req.body.title;
            await section.save();
            const sections = await Section.find({isDeleted: false}).populate('questions');
            res.send(sections);
        } catch (e) {
            console.log(e, 'sections.js:::POST NEW METHOD');
            res.status(500).send({message: 'Невозможно сохранить секцию в данный момент'})
        }
    });

    router.post('/rate/:sectionId', auth, async (req, res) => {
        try {
            const section = await Section.findOneAndUpdate({_id: req.params.sectionId}, {$inc: {passed: 1}});

            const newRate = {user: req.body.ratingData.userId};

            console.log('NEW RATE ================ ', newRate);
            console.log('REQ.BODY.RATINGDATA =============== ', req.body.ratingData);

            if (req.body.ratingData.rate !== 0) {
                newRate.rate = req.body.ratingData.rate
            } else {
                newRate.rate = null;
            }

            if (req.body.ratingData.comment !== '') {
                newRate.comment = req.body.ratingData.comment
            } else {
                newRate.comment = null;
            }

            section.rate.push(newRate);

            if (section.rate.length > 0) {
                section.calcAverage(section.rate);
            }

            await section.save()
                .then(result => res.send(result));
        } catch (e) {
            res.send({message: 'В данный момент невозможно сохранить данные.'})
        }
    });

    router.post('/question', auth, async (req, res) => {
        console.log(req.body.user._id);
        try {
            const id = req.query.id;
            const userId = req.body.user._id;
            const section = await Section.findOne({_id: id}).populate('questions');

            if (section) {
                // const lastAnsweredQuestionIndex = await LastAnsweredQuestionIndex.findOne({$and:[{sectionId:{$regex: section._id}},{userId:{$regex: userId}}]})
                // const lastAnsweredSections = await LastAnsweredQuestionIndex.find({userId});
                // console.log(lastAnsweredSections.length, 'sections');
                // if(lastAnsweredSections.length !== 0) {
                //     console.log('I am here');
                //     const lastAnsweredQuestionIndex = lastAnsweredSections.find(lastSection => lastSection.sectionId === section._id);
                //     console.log(lastAnsweredQuestionIndex, 'last answered');
                //
                //     if(lastAnsweredQuestionIndex) {
                //         return res.send({...section._doc, lastAnsweredQuestionIndex: lastAnsweredQuestionIndex})
                //     }
                // }


                return res.send({...section._doc});
            }
            return res.status(400).send('Такой секции не найдено!')
        } catch (error) {
            return res.status(500).send({message: 'Ошибка на сервере! попробуйте позже'});
        }
    });

    router.post('/editSection', [auth, permit('admin')], async (req, res) => {
        try {
            const id = req.body.id;
            const section = await Section.findOne({_id: id});
            if (section) {
                section.isActive = req.body.isActive;
                section.title = req.body.title;
                section.description = req.body.description;
                section.rating = req.body.rating;
                await section.save();
                const sections = await Section.find({isDeleted: false}).populate('questions');
                await res.send(sections);
            }
        } catch (error) {
            res.status(500).send({message: 'Невозможно изменить секцию в данный момент.'})
        }
    });

    router.get('/finished', [auth, permit('admin')], async (req, res) => {
      try {
          const section = await Section
              .findById(req.query.sectionId)
              .populate('questions');
        const questionsIds = section.questions.map(question => question._id);
        const answers = await Answer
              .find({questionId: {$in: questionsIds}, userId: req.query.userId})
              .populate('userId')
              .populate('questionId');

        const question = section.questions.find(question => question.type === 'info');
        if (question) {
          const infoQuestion = {
            body: question.data,
            _id: question._id,
            userId: answers[0].userId,
            questionId: question,
            sectionId: question.sectionId,
          };
          answers.push(infoQuestion);
        }

        const modifiedSection = {...section._doc, answers};
          return res.status(200).send(modifiedSection);
      } catch (e) {
          return res.send({message: 'Не возможно загрузить секции в данный момент'});
      }
    });

    router.get('/', async (req, res) => {
        const token = req.get('Token');
        user = await User.findOne({token: token});
        if (user && user.role === 'admin') {
            try {
                const sections = await Section.find({isDeleted: false}).populate('questions');
                res.send(sections);
            } catch (e) {
                console.log(e);
                return res.status(400).send({message: 'Невозможно загрузить секции в данный момент!'})
            }
        } else {
            try {
                const sections = await Section.find({isActive: true, isDeleted: false});
                return res.send(sections);
            } catch (e) {
                res.status(400).send({message: 'Невозможно загрузить секции в данный момент'});
            }
        }
    });

    router.delete('/deleteSection/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const section = await Section.findOne({_id: id});
            section.isDeleted = true;
            section.save();
            const sections = await Section.find();

            const allSections = [];

            sections.forEach((section) => {
                if(section.isDeleted === false) {
                    allSections.push(section);
                }
            });
            res.send(allSections);

        } catch (e) {
            res.status(500).send({message: 'Произошла ошибка при удалении секции'})
        }
    });

    return router;
};

module.exports = createRouter;
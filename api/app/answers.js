const express = require('express');
const Answers = require('../models/Answer');
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const UserNotification = require('../models/UserNotification');
const LastAnsweredQuestionIndex = require('../models/LastAnsweredQuestionIndex');

const createRouter = () => {
    const router = express.Router();

    router.post('/', auth, async (req, res) => {
        try {
            console.log('REQ.BODY =============== ', req.body);
            const newAnswer = req.body;
            const userId = newAnswer.userId;
            const sectionId = newAnswer.sectionId;
            const questionId = newAnswer.questionId;

            const data = req.body.body.split('+++');
            const body = data.filter(str => str !== '');

            const answer = new Answers({userId: userId, sectionId: sectionId, questionId: questionId, body: body});
            // const answer = new Answers(newAnswer);
            console.log(answer);

            const savedAnswer = await answer.save();
            const question = await Question.findOne({_id: req.body.questionId});
            question.answers.push(savedAnswer._id);
            await question.save();
            console.log('question saved with answers in it');

            // const data = req.body.body;
            // console.log('THIS IS DATA ===', data);

            // const data = req.body.body.split(",");
            // const dataCopy = data; // array of 3 strings
            // const slicedData = data.slice(0, dataCopy.length);
            // console.log('THIS IS SLICED DATA', data);

            // LastAnsweredQuestionIndex.find()
            //     .where('userId').equals(userId)
            //     .where('sectionId').equals(sectionId)
            //     .exec((err, lastAnsweredQuestionIndexArray) => {
            //         console.log(lastAnsweredQuestionIndexArray, 'index');
            //         if(lastAnsweredQuestionIndexArray.length === 0 ) {
            //             const newLastAnsweredQuestionIndex = new LastAnsweredQuestionIndex({
            //                             index: 1,
            //                             sectionId: req.body.sectionId,
            //                             questionIdArray: [req.body.questionId],
            //                             userId: newAnswer.userId
            //                         });
            //             newLastAnsweredQuestionIndex.save(err => {
            //                 if (err) return res.status(500).send(err)
            //             });
            //             console.log(newLastAnsweredQuestionIndex, 'new');
            //         } else if (lastAnsweredQuestionIndexArray !== 0 && lastAnsweredQuestionIndexArray[0].questionIdArray.includes(req.body.questionId)){
            //
            //         }
            //     });



            // const lastAnsweredSections = await LastAnsweredQuestionIndex.find({userId});
            // console.log(lastAnsweredSections.length, 'sections');
            // if(lastAnsweredSections.length !== 0) {
            //     console.log('I am here');
            //     const lastAnsweredQuestionIndex = lastAnsweredSections.find(lastSection => lastSection.sectionId === sectionId);
            //     console.log(lastAnsweredQuestionIndex, 'last answered');
            //
            //     if (lastAnsweredQuestionIndex && !lastAnsweredQuestionIndex.questionIdArray.includes(req.body.questionId)) {
            //         lastAnsweredQuestionIndex.questionIdArray.push(req.body.questionId);
            //
            //         const sectionQuestions = await Question.find({sectionId: req.body.sectionId});
            //         lastAnsweredQuestionIndex.index = lastAnsweredQuestionIndex.questionIdArray.length;
            //         await lastAnsweredQuestionIndex.save();
            //
            //         if (lastAnsweredQuestionIndex.questionIdArray.length === sectionQuestions.length) await lastAnsweredQuestionIndex.remove();
            //
            //     } else if (!lastAnsweredQuestionIndex) {
            //         const newLastAnsweredQuestionIndex = await new LastAnsweredQuestionIndex({
            //             index: 1,
            //             sectionId: req.body.sectionId,
            //             questionIdArray: [req.body.questionId],
            //             userId: newAnswer.userId
            //         });
            //         await newLastAnsweredQuestionIndex.save();
            //     }
            // }


        } catch (e) {
            return res.status(400).send({message: 'Вопрос не сохранен'});
        }

        return res.sendStatus(200);
    });

    router.get('/', async (req, res) => {
        const userId = req.query.userId;
        const sectionId = req.query.sectionId;

        const answers = await Answers.find({userId: userId, sectionId: sectionId});
        return res.send(answers);
    });

    return router;
};

module.exports = createRouter;
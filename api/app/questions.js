const express = require('express');
const Question = require('../models/Question');
const Section = require('../models/Section');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const multer = require('multer');
const path = require("path");
const fs = require('fs');

const config = require('../config');
const nodemailer = require("nodemailer");
const csvToJson = require('convert-csv-to-json');
const nanoid = require("nanoid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, "test" + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const createRouter = () => {
    const router = express.Router();

    router.post('/', [auth, permit('admin')], async (req, res) => {
        const newQuestion = req.body;
        const question = new Question(newQuestion);
        try {
            await question.save();
        } catch (e) {
            console.log(e, 'question.js:Ошибка при загрузке нового вопроса!');
            return res.status(400).send({message: 'Вопрос не сохранен'});
        }
        try {
            const section = await Section.findById(question.sectionId).populate('questions');
            await section.questions.push(question);
            await section.save();
            return res.send(section);
        } catch (e) {
            return res.status(400).send({message: 'question have not been saved in section'})
        }
    });

    router.get('/', [auth, permit('admin')], async (req, res) => {
        try {
            const id = req.query.id;
            const question = await Question.findOne({_id: id});
            if (question) {
                return res.send(question);
            }
            res.status(400).send('Такой вопрос не найден!');
        } catch (error) {
            res.status(500).send('Ошибка на сервере. Попробуйте позже');
        }
    });

    router.post('/editQuestion', [auth, permit('admin')], async (req, res) => {
        try {
            const id = req.body.id;
            const question = await Question.findOne({_id: id});
            if (question.type === 'input') {
                question.description = req.body.description;
            }
            if (question.type === 'checkbox' || question.type === 'radio') {
                question.data = req.body.data;
                question.importantAnswerVariant = req.body.importantAnswerVariant
            }
            question.title = req.body.title;

            await question.save();
            const sections = await Section.find().populate('questions');
            res.send(sections);
        } catch (error) {
            res.status(500).send({message: 'Невозможно изменить вопрос в данный момент. Попробуйте позже.'})
        }
    });

    // router.post('/test', [auth, permit('admin'), upload.single('data')], async (req, res) => {
    //
    //     let data = csvToJson.getJsonFromCsv(req.file.path).map((dataItem, index) => {
    //         return {...dataItem, id: index + 1};
    //     });
    //     const isNotValid = data.find(elem => !elem.hasOwnProperty('id') ||
    //         !elem.hasOwnProperty('body') ||
    //         elem.id === "" || elem.body === "");
    //     if (isNotValid)  return res.status(400).send({message: 'Вопросы в файле оформлены неправильно.'});
    //
    //     req.body.data = data;
    //
    //     const question = new Question(req.body);
    //     try {
    //         await question.save();
    //     } catch (e) {
    //         return res.status(400).send({message: 'Вопрос не сохранен'});
    //     }
    //     try {
    //         const section = await Section.findById(question.sectionId).populate('questions');
    //         await section.questions.push(question);
    //         await section.save();
    //         return res.send(section);
    //     } catch (e) {
    //         return res.status(400).send({message: 'Возможно, вопросы в файле оформлены неверно. Поправьте и попробуйте снова.'})
    //     }
    //
    // });

    router.delete('/deleteQuestion', [auth, permit('admin')], async (req, res) => {

        try {
            const id = req.query.id;
            const question = await Question.findOne({_id: id});
            await question.remove();
            const section = await Section.find().populate('questions');
            return res.send(section);
        } catch (e) {
            return res.status(400).send({message: 'Вопрос не удален! Попробуйте позже'})
        }
    });

    return router;
};

module.exports = createRouter;
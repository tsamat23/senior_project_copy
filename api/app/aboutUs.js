const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const About = require('../models/About');

const createRouter = () => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const about = await About.findOne();

            return res.send(about)
        } catch (e) {
            res.status(500).send({message: 'В данный момент невозможно загрузить данные'});
        }
    });


    router.post('/editInfo', [auth, permit('admin')], async (req, res) => {
        try {
            const data = req.body;

            const about = await About.findOne();
            about.title = data.title;
            about.about = data.about;
            about.save();
            await res.send(about)
        } catch (error) {
            res.status(500).send({message: 'В данный момент невозможно изменить данные'})
        }
    });

    return router;
};

module.exports = createRouter;
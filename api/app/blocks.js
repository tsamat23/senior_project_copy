const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const nanoid = require("nanoid");
const multer = require('multer');
const path = require('path');

const User = require('../models/User');
const Block = require('../models/Block');
const Section = require('../models/Section');



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

    router.get('/', async (req, res) => {
        const token = req.get('Token');
        const user = await User.findOne({token: token});
        if (user && user.role === 'admin') {
            try {
                const blocks = await Block.find({isDeleted: false}).populate('sections');
                res.send(blocks);
            } catch (e) {
                console.log(e);
                return res.status(400).send({message: 'Невозможно загрузить блоки в данный момент!'})
            }
        } else {
            try {
                const blocks = await Block.find({isActive: true, isDeleted: false});
                return res.send(blocks);
            } catch (e) {
                res.status(400).send({message: 'Невозможно загрузить блоки в данный момент'});
            }
        }
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;

        Block.findOne({_id: id}).populate('sections')
            .then(result => {
                if (result) res.send(result);
                else res.sendStatus(404);
            })
            .catch(() => res.sendStatus(500));
    });

    return router;
};

module.exports = createRouter;
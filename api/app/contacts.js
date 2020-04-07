const express = require('express');
const Contact = require('../models/Contacts');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const createRouter = () => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const contacts = await Contact.findOne();
            res.send(contacts);
        } catch (e) {
            res.status(400).send({message: 'Возникла проблема с загрузкой контактов!'});
        }
    });

    router.get('/getContactsId', [auth, permit('admin')], async (req, res) => {
        try {
            const id = req.query.id;
            const contacts = await Contact.findOne({_id: id});
            res.send(contacts);
        } catch (e) {
            res.status(400).send({message: 'В данный момент невозможно изменить контакты!'});
        }
    });

    router.post('/editContacts', [auth, permit('admin')], async (req, res) => {
        try {
            const contact = await Contact.findOne({_id: req.body.id});
            contact.phone = req.body.contact.phone;
            contact.whatsapp = req.body.contact.whatsapp;
            contact.facebook = req.body.contact.facebook;
            contact.instagram = req.body.contact.instagram;
            contact.address = req.body.contact.address;
            contact.save();
            await res.send(contact);
        } catch (e) {
            res.status(500).send({message: 'В данный момент невозможно изменить контакты!'});
        }
    });

    return router;
};

module.exports = createRouter;
const express = require('express');
const moment = require('moment');

const UserNotification = require('../models/UserNotification');
const AdminNotification = require('../models/AdminNotification');
const User = require('../models/User');
const Forbid = require('../models/Forbid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');


const createRouter = () => {
    const router = express.Router();

    router.get('/', auth, async (req, res) => {
        const user = req.user;
        if (user.role === 'admin') {
            try {
                let notifications = await AdminNotification
                    .find({notify: user._id})
                    .select('-notify')
                    .populate({path: 'userId', select: '-token -sections -role -facebookId -vkontakteId -avatar'})
                    .populate({path: 'sectionId', populate: {path: 'questions'}});
                return res.send(notifications);
            } catch (error) {
                return res.status(400).send({message: 'Нет новых уведомлений для администратора'});
            }
        }
    });

    router.get('/getImportantUsers', [auth, permit('admin')], async (req, res) => {
        try {
            const users = await UserNotification.find().populate('user').populate('questionId');
            return res.send(users);
        } catch (e) {
            return res.status(500).send({message: 'Произошла ошибка с загрузкой пользователей!'})
        }
    });

    router.get('/importantNotifications', async (req, res) => {
        try {
            const notifications = await UserNotification.find({isShowed: false});
            notifications.forEach((notification) => {
                notification.isShowed = true;
                notification.save();
            });
            return res.send(notifications);
        } catch (e) {
            return res.status(500).send({message: 'Произошла ошибка! Попробуйте позже'});
        }
    });

    router.post('/', auth, async (req, res) => {
        try {
            let sectionId = req.body.sectionId;
            const admin = await User.findOne({role: 'admin'});
            const user = req.user;

            const notificationData = {
                userId: user._id,
                sectionId: sectionId,
                notify: admin._id
            };

            const notification = new AdminNotification(notificationData);
            await notification.save();
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

    router.patch('/active', [auth, permit('admin')], async (req, res) => {
        const notificationsIds = req.body;
        await AdminNotification
            .updateMany({_id: {$in: notificationsIds}}, {showed: true}, {multi: true});

        return res.status(200).send({message: 'Уведомления стали неактивными'});
    });

    return router;
};

module.exports = createRouter;
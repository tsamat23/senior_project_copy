const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const ReviewNotification = require('../models/ReviewNotification');
const ReviewNotifications = require('../models/ReviewNotification');
const User = require('../models/User');
const Section = require('../models/Section');
const AdminNotification = require('../models/AdminNotification');

const createRouter = () => {
    const router = express.Router();

    router.get('/', auth, async (req, res) => {
        let userId = req.user._id;

        try {
            const reviews = await Review.find({userId: userId}).populate('userId').populate('sectionId').populate('author');
            if (reviews) {
                res.send(reviews);
            }
            return res.status(400).send('Рецензии не найдены!');
        } catch (e) {
            return res.status(500).send({message: 'Произошла ошибка с загрузкой рецензий!'})
        }
    });

    router.post('/', [auth, permit('admin', 'psychologist')], async (req, res) => {
      const newReview = {
        userId: req.body.userId,
        sectionId: req.body.sectionId,
        author: req.body.author,
        review: req.body.review
      };

      const review = new Review(newReview);

      const newNotif = {
          userId: req.body.userId,
          sectionId: req.body.sectionId
      };

      const reviewNotif = new ReviewNotifications(newNotif);
      await reviewNotif.save();

      try {
        const savedReview = await review.save();
        const section = await Section.findOne({_id: req.body.sectionId});
        section.review.push(savedReview._id);
        await section.save();
        await AdminNotification
          .findOneAndUpdate({userId: req.body.userId, sectionId: req.body.sectionId}, {review: true});
        return res.send(savedReview);
      } catch (error) {
        return res.status(400).send({message: 'Невозможно в данный момент сохранить рецензию.'});
      }
    });

    router.get('/psychologist/:id', [auth, permit('admin')], async (req, res) => {
        const psychoId = req.params.id;

        try {
            const reviews = await Review.find({author: psychoId}).populate('userId').populate('sectionId').populate('author');
            if (reviews) {
                res.send(reviews);
            }
            return res.status(400).send('Рецензии данного психолога не найдены!');
        } catch (e) {
            res.status(500).send({message: 'Ошибка на сервере! Попробуйте позже!'});
        }
    });


    router.get('/review-notifications', async (req, res) => {
        try {
            const token = req.headers.token;
            const user = await User.findOne({token: token});
            const reviewNotifications = await ReviewNotification.find({userId: user._id});
            if(user) {
                res.send(reviewNotifications);
            }
        } catch (e) {
            res.send({message: 'Произошла ошибка с загрузкой уведомлений!'})
        }
    });

    return router;
};

module.exports = createRouter;
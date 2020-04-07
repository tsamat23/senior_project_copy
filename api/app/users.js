const express = require("express");
const request = require("request-promise-native");
const nanoid = require("nanoid");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const User = require("../models/User");
const Answer = require("../models/Answer");
const config = require("../config");

const createRouter = () => {
    const router = express.Router();

    router.get("/", [auth, permit("admin")], async (req, res) => {
        try {
            const users = await User.find({role: "user"});
            return res.status(200).send(users);
        } catch (error) {
            return res
                .status(500)
                .send({message: "Произошла ошибка с загрузкой пользователей!"});
        }
    });

    router.get(`/:id`, [auth, permit("admin")], async (req, res) => {
        try {
            const id = req.params.id;
            const userFullInfo = await User.findById(id)
                .select("-facebookId -vkontakteId -role -token")
                .populate({
                    path: "sections",
                    populate: {
                        path: "questions",
                        populate: {path: "answers", match: {userId: id}}
                    }
                })
                .populate({
                    path: "sections",
                    populate: {path: "review", match: {userId: id}}
                });
            return res.send(userFullInfo);
        } catch (error) {
            res.send({
                message: "Произшала ошибка с загрузкой информации пользователя!"
            });
        }
    });

    router.post("/", async (req, res) => {
        const newUser = {
            email: req.body.email,
            role: "user",
            displayName: req.body.displayName,
            password: req.body.password
        };
        newUser.token = nanoid(9);
        const user = new User(newUser);

        user
            .save()
            .then(user => res.send({user, message: "Успешная регистрация"}))
            .catch(error => {
                res.status(404).send({message: "Такой пользователь уже существует"});
            });
    });

    router.post("/facebookLogin", async (req, res) => {
        let user;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${
            req.body.accessToken
            }&access_token=${config.facebook.appId}|${config.facebook.appSecret}`;

        try {
            const response = await request(debugTokenUrl);

            const decodedResponse = JSON.parse(response);

            if (decodedResponse.data.error) {
                return res.status(401).send({message: "Ошибка входа"});
            }

            if (req.body.id !== decodedResponse.data.user_id) {
                return res.status(401).send({message: "Неверный ID пользователя"});
            }

            if (req.body.email) {
                user = await User.findOne({email: req.body.email});
            } else {
                user = await User.findOne({facebookId: req.body.id});
            }

            if (!user) {
                try {
                    user = new User({
                        email: req.body.email,
                        displayName: req.body.name,
                        facebookId: req.body.id,
                        password: nanoid(9),
                        avatar: req.body.picture.data.url
                    });
                    await user.save();
                } catch (e) {
                    res.status(401).send(e);
                }
            }

            user.generateToken();
            await user.save();

            return res.send({message: "Вход выполнен успешно", user});
        } catch (error) {
            return res.status(401).send({error, message: "Ошибка входа"});
        }
    });

    router.post("/vkontakteLogin", async (req, res) => {
        const debugTokenUrl = `https://api.vk.com/method/users.get?auth_key = md5(${
            config.vkontakte.appId
            }_${req.body.session.user.id}_${
            config.vkontakte.appSecret
            })&fields=photo_50&access_token=${req.body.session.sid}&v=5.80`;

        `https://api.vk.com/method/users.get?auth_key = md5(6619902_171452309_Vsm95EiGtidZRzkqqzNz
     )&fields=photo_50&access_token=Vsm95EiGtidZRzkqqzNz&v=5.80`

        try {
            const response = await request(debugTokenUrl);

            const decodedResponse = JSON.parse(response);

            if (decodedResponse.error) {
                return res.status(401).send({message: "Ошибка входа"});
            }

            if (req.body.session.user.id != decodedResponse.response[0].id) {
                return res.status(401).send({message: "Неверный ID пользователя"});
            }

            let user = await User.findOne({vkontakteId: req.body.session.user.id});

            if (!user) {
                try {
                    user = new User({
                        displayName: req.body.session.user.first_name,
                        vkontakteId: req.body.session.user.id,
                        password: nanoid(9),
                        avatar: decodedResponse.response[0].photo_50
                    });
                    await user.save();
                } catch (e) {
                    res.status(401).send(e);
                }
            }

            user.generateToken();
            await user.save();

            return res.send({message: "Успешный вход", user});
        } catch (error) {
            return res.status(401).send({message: "Ошибка входа"});
        }
    });

    router.post("/sessions", async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});

            if (!user) {
                return res.status(400).send({message: "Имя пользователя не найдено"});
            }

            const isMatch = await user.checkPassword(req.body.password);

            if (!isMatch) {
                return res.status(400).send({message: "Неверный пароль!"});
            }

            user.generateToken();
            await user.save();

            return res.send({message: "Успешный вход в систему", user});
        } catch (e) {
            res.send({message: "Неверный пароль или имя пользователя!"});
        }
    });

    // router.post("/passwordRecovery", async (req, res) => {
    //     try {
    //         const user = await User.findOne({email: req.body.email});
    //         if (user) {
    //             const token = nanoid(10);
    //             user.token = token;
    //             await user.save();
    //
    //             const transporter = nodemailer.createTransport({
    //                 service: "Gmail",
    //                 auth: {
    //                     user: "psychologyesdp@gmail.com",
    //                     pass: "qqruzza12"
    //                 }
    //             });
    //
    //             const mailOptions = {
    //                 from: "psychologyesdp@gmail.com",
    //                 to: req.body.email,
    //                 subject: "Восстановление пароля",
    //                 text: `Здравствуйте! Пожалуйста перейдите по данной ссылке ${config.redirectUri}/api/changePassword?token=${token} для того, чтобы восстановить пароль'`
    //             };
    //
    //             transporter.sendMail(mailOptions, (error, info) => {
    //                 if (error) {
    //                     res.status(400).send({message: "Невозможно отправить письмо!", error});
    //                 } else {
    //                     res.send({message: "Письмо отправлено Вам на почту."});
    //                 }
    //             });
    //         }
    //     } catch (e) {
    //         res.status(401).send({message: "Пользователь не найден!"});
    //     }
    // });

    router.post("/checkToken", async (req, res) => {
        const token = req.query.token;
        try {
            const user = await User.findOne({token: token});
            if (user) {
                res.send(user);
            }
        } catch (error) {
            res.status(500).send({message: "Произошла ошибка!"});
        }
    });

    router.post("/changePass", async (req, res) => {
        try {
            const id = req.body.id;
            const password = req.body.password;
            const oldPassword = req.body.oldPassword;
            const user = await User.findOne({_id: id});
            if (user) {
                if (oldPassword) {
                    user.checkPassword(oldPassword);
                    user.password = password;
                    await user.save();
                    return res.send({user, message: "Пароль успешно изменен!"});
                } else {
                    user.password = password;
                    await user.save();
                    res.send(user);
                }
            }
        } catch (e) {
            res
                .status(400)
                .send({message: "Невозможно сменить пароль в данный момент"});
        }
    });

    router.delete("/sessions", async (req, res) => {
        try {
            const token = req.get("Token");
            const success = {message: "Успешный выход"};

            if (!token) return res.send(success);

            const user = await User.findOne({token});

            if (!user) return res.send(success);

            user.generateToken();
            await user.save();

            return res.send(success);
        } catch (e) {
            res
                .status(500)
                .send({message: "Невозможно выполнить выход в данный момент!"});
        }
    });

    return router;
};

module.exports = createRouter;

const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Block = require('./models/Block');
const Section = require('./models/Section');
const Question = require('./models/Question');
const Review = require('./models/Review');
const Contact = require('./models/Contacts');
const Answer = require('./models/Answer');
const About = require('./models/About');

// const testDb = 'test-db';
// const devDb = 'psychology-db';


mongoose.connect(`${config.db.url}/${config.db.name}`, { useNewUrlParser: true });

const db = mongoose.connection;

const dropCollection = async (collectionName) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} did not present, skipping drop...`)
    }
};

const collections = ['users', 'sections', 'blocks', 'questions', 'answers', 'reviews',
    'adminnotifications', 'reviewnotifications', 'usernotifications', 'abouts', 'forbids', 'lastansweredquestionindexes', 'contacts'];

db.once('open', async () => {
    collections.forEach(collectionName => (
        dropCollection(collectionName)
    ));

    const [user, admin] = await User.create({
        email: 'user1@mail.ru',
        displayName: 'Обычный пользователь',
        facebookId: '123',
        vkontakteId: '123',
        password: 'user1',
        role: 'user',
        token: ''
    }, {
        email: 'user123@mail.ru',
        displayName: 'Обычный пользователь2',
        facebookId: '777',
        vkontakteId: '999',
        password: '123',
        role: 'user',
        token: ''
    }, {
        email: 'user2@mail.ru',
        displayName: 'Админ',
        facebookId: '132',
        vkontakteId: '310072015',
        password: 'user2',
        role: 'admin',
        token: ''
    }/*, {
        email: 'psycho1@gmail.com',
        displayName: 'psycho1',
        password: '123',
        role: 'psychologist',
        token: ''
    }, {
        email: 'psycho2@gmail.com',
        displayName: 'psycho2',
        password: '123',
        role: 'psychologist',
        token: ''
    }*/);

    const about = await About.create({
        title: 'О нас',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
            'magna aliqua. Eu mi bibendum neque egestas congue. Quis auctor elit sed vulputate mi. Sed lectus vestibulum ' +
            'mattis ullamcorper velit sed ullamcorper. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Feugiat ' +
            'vivamus at augue eget arcu. Congue nisi vitae suscipit tellus. Quis vel eros donec ac odio. Habitant morbi tristique ' +
            'senectus et netus et malesuada fames. Ultrices sagittis orci a scelerisque purus semper eget duis. Egestas integer ' +
            'eget aliquet nibh praesent tristique. Et molestie ac feugiat sed lectus vestibulum.'
    });

    const [block1, block2] = await Block.create(
        {
            title: 'Block 1',
            isActive: true,
            image: '',
            description: 'Description for Block #1',
            sections: []
        }, {
            title: 'Block 2',
            isActive: true,
            image: '',
            description: 'Description for Block #2',
            sections: []
        });

    const [section1, section2] = await Section.create(
        {
            title: 'Section 1',
            isActive: true,
            image: '',
            description: 'Description for section #1',
            rate: [],
            questions: []
        }, {
            title: 'Section 2',
            isActive: true,
            image: '',
            description: 'Description for section #2',
            rate: [],
            questions: []
        });


    const [/*question1,*/ question2, question3, /*question4,*/ /*question5,*/ question6, question7/*, question8*/] = await Question.create(/*{
        title: 'Первый вопрос',
        isImportant: false,
        type: 'input',
        data: [],
        sectionId: section1._id
    },*/{
        title: 'Второй вопрос с одним вариантом ответа',
        isImportant: false,
        type: 'radio',
        data: ['вариант 1', 'вариант 2'],
        importantAnswerVariant: ['вариант 1'],
        sectionId: section1._id
    }, {
        title: 'Третий вопрос с несколькими вариантами ответа',
        isImportant: false,
        type: 'checkbox',
        importantAnswerVariant: ['Вариант 1'],
        data: ['Вариант 1', 'variant 2', 'variant 3', 'variant 4'],
        sectionId: section1._id
    }, /*{
        title: 'Четверый вопрос',
        isImportant: false,
        type: 'picture',
        data: [],
        sectionId: section1._id
    },*//*{
        title: 'Первый вопрос',
        isImportant: false,
        type: 'input',
        data: [],
        sectionId: section2._id
    }, */{
        title: 'Второй вопрос с одним вариантом ответа',
        isImportant: false,
        type: 'radio',
        data: ['вариант 1', 'вариант 2'],
        sectionId: section2._id
    }, {
        title: 'Третий вопрос с несколькими вариантами ответа',
        isImportant: false,
        type: 'checkbox',
        data: ['Вариант 1', 'variant 2', 'variant 3', 'variant 4'],
        sectionId: section2._id
    }/*, {
        title: 'Четверый вопрос',
        isImportant: false,
        type: 'picture',
        data: [],
        sectionId: section2._id
    }*/);

    const block = await Block.findOne({_id: block1._id});
    block.sections.push(section1._id, section2._id);
    await block.save();

    const section = await Section.findOne({_id: section1._id});
    section.questions.push(/*question1._id,*/ question2._id, question3._id/*, question4._id*/);
    await section.save();

    const sectionTwo = await Section.findOne({_id: section2._id});
    sectionTwo.questions.push(/*question5._id,*/ question6._id, question7._id/*, question8._id*/);
    await sectionTwo.save();

    // const [review1, review2] = await Review.create({
    //     author: psycho1._id,
    //     userId: user._id,
    //     sectionId: section1._id,
    //     review: 'This is test review-1 for user'
    // }, {
    //     author: psycho2._id,
    //     userId: user._id,
    //     sectionId: section2._id,
    //     review: 'This is test review-2 for user'
    // });

    const contacts = await Contact.create({
        phone: '0555-55-55-55',
        whatsapp: '0555-55-55-55',
        facebook: 'facebook.com/username',
        instagram: 'instagram.com/username',
        address: 'Какой-то адрес'
    });

    db.close();
})
;
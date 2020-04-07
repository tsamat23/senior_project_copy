const express = require('express');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Block = require('../models/Block');
const Section = require('../models/Section');
const Question = require('../models/Question');
const Answer = require('../models/Answer');


// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


const createRouter = () => {
    const router = express.Router();

    router.get('/', auth, async (req, res) => {
        try {
            const token = req.get('Token');
            const user = await User.findOne({token: token}).populate('sections');
            // console.log(user); // with user everything is OK


            const blocks = await Block.find({isActive: true, isDeleted: false}).populate({path: 'sections', populate: {path: 'questions', populate: {path: 'answers'}}});

            const results = [];

            var calculateResults = async () => {
                for (let i = 0; i < blocks.length; i++) {
                    const blockResults = {};

                    blockResults.id = blocks[i]._id;
                    blockResults.title = blocks[i].title;
                    blockResults.sections = [];
                    blockResults.blockGrade = 0;

                    for (let j = 0; j < blocks[i].sections.length; j++) {

                        const sectionResults = {};

                        sectionResults.id = blocks[i].sections[j]._id;
                        sectionResults.title = blocks[i].sections[j].title;
                        sectionResults.sectionGrade = 0;

                        let correctAnswers = 0;

                        for (let k = 0; k < blocks[i].sections[j].questions.length; k++) {

                            const userAnswer = await Answer.findOne({userId: user._id, questionId: blocks[i].sections[j].questions[k]._id});

                            const correctAnswerCopy = [...blocks[i].sections[j].questions[k].importantAnswerVariant];
                            const userAnswerCopy = [...userAnswer.body];

                            correctAnswerCopy.sort();
                            userAnswerCopy.sort();

                            if (userAnswerCopy.equals(correctAnswerCopy)) {
                                correctAnswers++;
                            }

                        }

                        sectionResults.sectionGrade = correctAnswers / blocks[i].sections[j].questions.length * 5;
                        sectionResults.sectionGrade = +sectionResults.sectionGrade.toFixed(2);

                        blockResults.sections.push(sectionResults);
                    }

                    for (let j = 0; j < blockResults.sections.length; j++) {
                        blockResults.blockGrade += blockResults.sections[j].sectionGrade;
                    }

                    blockResults.blockGrade /= blockResults.sections.length;

                    blockResults.blockGrade = +blockResults.blockGrade.toFixed(2);

                    results.push(blockResults)
                }
            };

            await calculateResults();

            let overallGrade = 0;

            for (let i = 0; i < results.length; i++) {
                overallGrade += results[i].blockGrade;
            }

            overallGrade /= results.length;
            overallGrade = +overallGrade.toFixed(2);

            // console.log({results, overallGrade});

            return res.send({results, overallGrade});
        } catch (error) {
            console.log('ERROR: RESULTS.JS');
            return res.status(500).send({message: 'Произошла ошибка!'});
        }
    });

    return router;
};

module.exports = createRouter;


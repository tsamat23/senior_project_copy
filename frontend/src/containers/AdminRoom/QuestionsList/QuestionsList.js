import React, {Component} from 'react';

import SimpleQuestion from "../Questions/SimpleQuestion/SimpleQuestion";
import WithOneAnswer from "../Questions/WithOneAnswerQuestion/WithOneAnswer";
import WithMultipleAnswers from "../Questions/WithMultipleAnswers/WithMultipleAnswers";
import Test from '../Questions/Test/Test';
import './QuestionList.css';
import PictureQuestion from "../Questions/PictureQuestion/PictureQuestion";
import InfoText from "../Questions/InfoText/InfoText";

class QuestionsList extends Component {

    renderQuestions = questions => {
        return questions.map(question => {
            if (question.type === 'input') {
                return <SimpleQuestion
                    key={question._id}
                    type={question.type}
                    title={question.title}
                    id={question._id}
                    sectionId={question.sectionId}
                />
            }
            if (question.type === 'radio') {
              return <WithOneAnswer
                    key={question._id}
                    type={question.type}
                    title={question.title}
                    options={question.data}
                    importantAnswerVariant={question.importantAnswerVariant}
                    id={question._id}
                    isImportant={question.isImportant}
                />
            }
            if (question.type === 'checkbox') {
                return <WithMultipleAnswers
                    key={question._id}
                    type={question.type}
                    title={question.title}
                    options={question.data}
                    importantAnswerVariant={question.importantAnswerVariant}
                    id={question._id}
                    isImportant={question.isImportant}
                />
            }
            if (question.type === 'picture') {
                return <PictureQuestion
                    key={question._id}
                    type={question.type}
                    title={question.title}
                    id={question._id}
                />
            }
            if(question.type === 'test') {
                return <Test key={question._id}
                             type={question.type}
                             title={question.title}
                             id={question._id}
                />
            }
            if(question.type === 'info') {
                return <InfoText
                    key={question._id}
                    data={question.data}
                    id={question._id}
                    title={question.title}
                />
            }
            return null
        })
    };

    render() {
        return (
            <div className="QuestionList">
                {this.props.questions.length > 0 &&
                this.renderQuestions(this.props.questions)
                }
            </div>
        );
    }
}


export default QuestionsList;
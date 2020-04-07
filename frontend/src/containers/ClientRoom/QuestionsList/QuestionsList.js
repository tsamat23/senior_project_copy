import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {getQuestionById, toggleRateModal, analyseTestResults} from "../../../store/actions/questionActions";
import connect from "react-redux/es/connect/connect";
import SimpleQuestion from "../Questions/SimpleQuestion/SimpleQuestion";
import WithOneAnswer from "../Questions/WithOneAnswerQuestion/WithOneAnswer";
import WithMultipleAnswers from "../Questions/WithMultipleAnswers/WithMultipleAnswers";
import Sketch from "../Questions/Sketch/Sketch";
import {sendAnswer} from "../../../store/actions/answerActions";
import {submitSection} from "../../../store/actions/sectionActions";
import Test from "../Questions/Test/Test";
import RateModal from "../../UI/Modals/RateModal/RateModal";
import PreloaderComponent from "../../../components/UI/Preloader/Preloader";
import {Editor} from "react-draft-wysiwyg";
import {push} from "react-router-redux";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
    root: {
        width: '90%'
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

const theme = createMuiTheme({
    typography: {
        fontSize: 20,
        htmlFontSize: 12,
        fontFamily: ['Comfortaa', 'cursive'],
    }
});

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
        question: {
            userId: '',
            questionId: '',
            type: '',
            body: '',
            sectionId: '',
            title: ''
        }
    };

    componentWillMount() {
        this.props.getQuestionById(this.props.location.search);
        if(this.props.activeStep) this.setState({activeStep: parseInt(this.props.activeStep) })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.activeStep && prevProps.activeStep !== this.props.activeStep) this.setState({activeStep: parseInt(this.props.activeStep)});
    }


    saveDataCheckboxType = (event, questionId, type, title) => {
        if (type === 'checkbox') {
            console.log('VYZYVAETSYA SAVEDATACHECKBOXTYPE');
            const value = this.state.question.body.indexOf(event.target.value);
            console.log(this.state.question.body);
            if (value !== -1) { // попадает сюда если value есть в this.state.question.body
                console.log('QQQQQQQQQQQQQQQQQQQQQQQQ');
                const values = this.state.question.body;
                console.log('const values = ', values)
                const options = values.split('+++');
                console.log('const options = ', options)
                options.forEach((key) => {
                    if (key === event.target.value) {
                        this.setState({
                            question: {
                                ...this.state.question,
                                body: options.filter((key) => key !== event.target.value).join('+++')
                            }
                        })
                    }
                });
            } else {
                this.setState({
                    question: {
                        userId: this.props.user._id,
                        questionId,
                        body: this.state.question.body.concat(event.target.value, '+++'),
                        sectionId: this.props.sectionId,
                        type,
                        title
                    }
                });
                console.log(this.state.question.body);
            }
        }
    };

    saveDataPictureType = (event, questionId, type, title) => {
        if (type === 'picture') {
            this.setState({
                question: {
                    userId: this.props.user._id,
                    questionId,
                    body: JSON.stringify(event),
                    sectionId: this.props.sectionId,
                    type,
                    title
                }
            });
        }
    };

    saveDataOtherTypes = (event, questionId, type, title) => {
        if (type === 'input' || type === 'radio') {
            this.setState({
                question: {
                    userId: this.props.user._id,
                    questionId,
                    body: event.target.value,
                    sectionId: this.props.sectionId,
                    type,
                    title
                }
            });
        }
    };

    saveDataTestType = (data, questionId, type, title) => {
        if (type === 'test') {
            this.setState({
                question: {
                    userId: this.props.user._id,
                    questionId,
                    body: data,
                    sectionId: this.props.sectionId,
                    type,
                    title
                }
            });
        }
    };

    inputChangeHandler = (event, questionId, type, title) => {
        this.saveDataCheckboxType(event, questionId, type, title);
        // this.saveDataPictureType(event, questionId, type, title);
        // this.saveDataTestType(event, questionId, type, title);
        this.saveDataOtherTypes(event, questionId, type, title);
    };

    renderQuestions = (question) => {
        // if (question.type === 'input') {
        //     return <SimpleQuestion
        //         key={question._id}
        //         type={question.type}
        //         title={question.title}
        //         id={question._id}
        //         value={this.state.question.data}
        //         changed={this.inputChangeHandler}
        //     />
        // }
        if (question.type === 'radio') {
            return <WithOneAnswer
                key={question._id}
                type={question.type}
                title={question.title}
                options={question.data}
                id={question._id}
                value={this.state.question.body}
                changed={this.inputChangeHandler}
            />
        }
        if (question.type === 'checkbox') {
            return <WithMultipleAnswers
                key={question._id}
                type={question.type}
                title={question.title}
                options={question.data}
                id={question._id}
                value={this.state.question.body}
                changed={this.inputChangeHandler}
            />
        }
        // if (question.type === 'picture') {
        //     return <Sketch
        //         key={question._id}
        //         type={question.type}
        //         title={question.title}
        //         id={question._id}
        //         changed={this.inputChangeHandler}
        //     />
        // }
        // if (question.type === 'test') {
        //     return <Test
        //         key={question._id}
        //         type={question.type}
        //         title={question.title}
        //         questionId={question._id}
        //         sectionId={question.sectionId}
        //         userId={this.props.userId}
        //         data={question.data}
        //         handleClick={this.inputChangeHandler}
        //         analyseTestResults={this.props.analyseTestResults}
        //         testResults={this.props.testResults}
        //     />
        // }
        // if (question.type === 'info') {
        //     return <Editor
        //         toolbarHidden
        //         contentState={JSON.parse(question.data)}
        //         wrapperClassName="wrapper-class"
        //         editorClassName="editor-class, customStyle"
        //         toolbarClassName="toolbar-class"
        //     />
        // }
        return null
    };

    getSteps() {
        return this.props.questions;
    }


    handleNext = async isFinished => {
        const {sectionId, showRateModal} = this.props;
        // if (this.state.question.type === '') {
        //     this.setState(state => ({activeStep: state.activeStep + 1}));
        //     isFinished && showRateModal();
        // } else {
            console.log(this.state);
            const isAnswer = await this.props.sendAnswer(this.state.question);
            if ((this.state.question.body !== '' && isAnswer.status === 200) || this.state.question.type === '') {
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                    question: {
                        userId: '',
                        questionId: '',
                        type: '',
                        body: '',
                        sectionId: '',
                        title: ''
                    }
                }));

                // isFinished && showRateModal();
                if (isFinished) {
                    // showRateModal() && this.props.route('/');
                    this.props.submitSection(sectionId);
                }
            // }
        }


    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    checkState = () => {
        return this.state.question.body.length <= 0;
    };

    render() {
        const {classes, user, sectionId, show} = this.props;
        const {activeStep} = this.state;
        const steps = this.getSteps(); // array of questions

        // console.log(this.props.questions);

        return (
            this.props.isLoading === false ? <div className={classes.root}>
                {/*{show && <RateModal show={show} userId={user._id} sectionId={sectionId}/>}*/}

                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((question, index) => {
                        return (
                            <Step key={question._id}>
                                <StepLabel> Вопрос №{index + 1}</StepLabel>
                                <StepContent>
                                    <MuiThemeProvider theme={theme}>
                                        <Typography>{this.renderQuestions(question)}</Typography>
                                    </MuiThemeProvider>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={this.checkState() && !(question.type === 'info')}
                                                type='button'
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.handleNext(activeStep === steps.length - 1)}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {/*{activeStep === steps.length && (*/}
                {/*    <Paper square elevation={0} className={classes.resetContainer}>*/}
                {/*        <Typography>All steps completed - you&quot;re finished</Typography>*/}
                {/*        <Button onClick={this.handleReset} className={classes.button}>*/}
                {/*            Reset*/}
                {/*        </Button>*/}
                {/*    </Paper>*/}
                {/*)}*/}
            </div> : <PreloaderComponent/>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user,
    questions: state.questions.questions,
    sectionId: state.questions.sectionId,
    testResults: state.questions.testResults,
    show: state.users.showRateModal,
    isLoading: state.isLoading.isLoading,
    activeStep: state.questions.activeStep
});

const mapDispatchToProps = dispatch => ({
    route: path => dispatch(push(path)),
    sendAnswer: data => dispatch(sendAnswer(data)),
    submitSection: sectionId => dispatch(submitSection(sectionId)),
    getQuestionById: id => dispatch(getQuestionById(id)),
    analyseTestResults: data => dispatch(analyseTestResults(data)),
    showRateModal: () => dispatch(toggleRateModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerticalLinearStepper));
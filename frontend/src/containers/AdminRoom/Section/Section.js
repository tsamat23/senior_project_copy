import React, {Component, Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux';
import {sendTestQuestion} from '../../../store/actions/questionActions';

import {styles} from './sectionStyles-material-ui';
import questionTypes from '../Questions/questionTypes';
import SimpleForm from "../../FormsQuestions/SimpleForm";
import QuestionsList from "../QuestionsList/QuestionsList";
import WithOneAnswerForm from "../../FormsQuestions/WithOneAnswerForm";
import PictureQuestion from '../../FormsQuestions/PictureQuestion';
import MultipleAnswers from "../../FormsQuestions/MultipleAnswers";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {deleteSection, editSection} from '../../../store/actions/sectionActions';
import InfoText from "../../FormsQuestions/InfoText";
import TestQuestionForm from "../../FormsQuestions/TestQuestionForm/TestQuestionForm";
import Dialog from "../../../../node_modules/@material-ui/core/Dialog/Dialog";
import MdEdit from "react-icons/lib/md/edit";
import Button from "@material-ui/core/Button";
import EditedSection from "../EditedSection/EditedSection";

class Section extends Component {

    state = {
        questionType: '',
        showModal: false,
        showEditSection: false,
        section: {
            id: null,
            isActive: true,
            title: null,
            description: null,
            rating: null
        },
        question: {
            data: []
        }
    };

    componentDidMount() {
        this.setState({
            section: {
                id: this.props.sectionId,
                isActive: this.props.isActive,
                title: this.props.title,
                description: this.props.description,
                rating: this.props.rating
            }
        })
    }

    selectChangeHandler = async event => {
        await this.setState({
            [event.target.name]: event.target.value,
            showModal: true
        });
    };

    showEditSectionHandler = () => {
        this.setState({showEditSection: !this.state.showEditSection})
    };

    hideModalHandler = () => {
        this.setState({questionType: '', showModal: false});
    };

    addTest = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('data', this.state.data);
        formData.append('type', 'test');
        formData.append('title', 'Test');
        formData.append('sectionId', this.props.sectionId);
        this.props.sendTestQuestion(formData);
        this.setState({showModal: false, title: '', description: ''});
    };

    chooseFormAddingQuestion = () => {
        if (this.state.questionType === 'input') {
            return <SimpleForm sectionId={this.props.sectionId}
                               show={this.state.showModal}
                               questionType={this.state.questionType}
                               closed={this.hideModalHandler}
            />
        }
        if (this.state.questionType === 'info') {
            return <InfoText sectionId={this.props.sectionId}
                             show={this.state.showModal}
                             questionType={this.state.questionType}
                             closed={this.hideModalHandler}
            />
        }
        if (this.state.questionType === 'checkbox') {
            return <MultipleAnswers
                sectionId={this.props.sectionId}
                show={this.state.showModal}
                questionType={this.state.questionType}
                closed={this.hideModalHandler}
            />
        }
        if (this.state.questionType === 'radio') {
            return <WithOneAnswerForm sectionId={this.props.sectionId}
                                      show={this.state.showModal}
                                      questionType={this.state.questionType}
                                      closed={this.hideModalHandler}
            />
        }
        if (this.state.questionType === 'picture') {
            return <PictureQuestion sectionId={this.props.sectionId}
                                    show={this.state.showModal}
                                    questionType={this.state.questionType}
                                    closed={this.hideModalHandler}
            />
        }
        if (this.state.questionType === 'test') {
            return (
                <Dialog
                    open={this.state.showModal}
                    onClose={this.hideModalHandler}
                    fullWidth
                    aria-labelledby="form-dialog-title"
                >
                    <TestQuestionForm
                        addTest={this.addTest}
                        fileChangeHandler={this.fileChangeHandler}

                    />
                </Dialog>
            )

        }

    };

    fileChangeHandler = event => {
        this.setState({
            data: event.target.files[0]
        });
    };

    handleChange = async () => {
        await this.setState({section: {...this.state.section, isActive: !this.state.section.isActive}});
        this.props.editSection(this.state.section);
    };

    switchFunc = () => {
        return (
            <Switch value={JSON.stringify(this.state.section.isActive)}
                    color='secondary'
                    name="switch"
                    checked={this.state.section.isActive}
                    onChange={this.handleChange} aria-label="LoginSwitch"/>
        )
    };

    deleteSectionHandler = (event) => {
        event.preventDefault();
        this.props.deleteSection(this.props.id);
    };

    render() {
        const {classes} = this.props;
        let form = this.chooseFormAddingQuestion();
        return (
            <div className={classes.root} id={this.props.title}>
                {form}
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography
                            style={{display: 'flex'}}
                            className={classes.heading}>{this.props.title}</Typography>
                        {this.switchFunc()}
                        <Button
                            style={{padding: "5px 10px", margin: 'auto 30px auto auto'}}
                            // className={classes.deleteBtn}
                            variant='contained'
                            color='primary'
                            onClick={(event) => this.deleteSectionHandler(event)}
                        >
                            Удалить
                        </Button>
                        <Button
                        style={{padding: "0", margin: 'auto 30px auto 20px'}}
                        variant="fab"
                        id="edit"
                        color="primary"
                        onClick={this.showEditSectionHandler}
                    >
                        <MdEdit style={{fontSize: '25px', marginLeft: '1px', marginTop: '1px'}}/>
                    </Button>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.sectionBox}>
                        <span><b>Описание секции:</b></span>
                        <Typography className={classes.description}>
                            {this.props.description}
                        </Typography>
                        <FormControl className={[classes.formControl, classes.selectForm].join()}
                                     id="SectionSelect"
                        >
                            {
                                (<Fragment>
                                    <InputLabel
                                        htmlFor="age-native-simple"
                                        className={classes.selectTitle}
                                    >
                                        Выберите тип вопроса
                                    </InputLabel>
                                    <Select
                                        value={this.state.questionType}
                                        name="questionType"
                                        onChange={this.selectChangeHandler}
                                    >
                                        <MenuItem value=""/>
                                        {questionTypes.map(question => (
                                            <MenuItem
                                                id={question.title}
                                                className={classes.questionType}
                                                value={question.type}
                                                key={question.type}
                                            >
                                                {question.title}
                                            </MenuItem>)
                                        )
                                        }
                                    </Select>
                                </Fragment>)}
                        </FormControl>


                    </ExpansionPanelDetails>
                    <QuestionsList questions={this.props.questions}/>
                </ExpansionPanel>
                <EditedSection
                    closed={this.showEditSectionHandler}
                    open={this.state.showEditSection}
                    title={this.props.title}
                    description={this.props.description}
                    image={this.props.image}
                    sectionId = {this.props.sectionId}
                />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sendTestQuestion: formData => dispatch(sendTestQuestion(formData)),
        editSection: (data) => dispatch(editSection(data)),
        deleteSection: (id) => dispatch(deleteSection(id))
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Section));
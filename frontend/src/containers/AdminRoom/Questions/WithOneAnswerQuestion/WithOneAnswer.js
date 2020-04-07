import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import MdEdit from 'react-icons/lib/md/edit';
import {styles} from './styles-material-ui';
import {deleteQuestion, editQuestion} from "../../../../store/actions/questionActions";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";


class WithOneAnswer extends Component {

    state = {
        show: false,
        question: {
            type: '',
            data: [],
            id: '',
            sectionId: '',
            title: ''
        }
    };

    deleteHandler = (event, id) => {
        event.preventDefault();
        this.props.deleteQuestion(id)
    };

    handleHide = () => {
        this.setState({show: false});
    };

    editQuestion = () => {
        this.setState({show: true});
        this.setState({
            question: {
                type: this.props.type,
                data: this.props.options,
                id: this.props.id,
                isImportant: this.props.isImportant,
                sectionId: this.props.sectionId,
                title: this.props.title
            }
        })
    };

    editSendHandler = () => {
        this.props.editQuestion(this.state.question);
        this.setState({show: false})
    };

    inputChangeHandler = event => {
        this.setState({
            question: {
                title: event.target.value,
                data: this.props.options,
                id: this.props.id,
                sectionId: this.props.sectionId,
                type: this.props.type
            }
        });
    };

    isImportantHandler = (event) => {
        event.stopPropagation();
        const question = {
            title: this.props.title,
            data: this.props.options,
            id: this.props.id,
            sectionId: this.props.sectionId,
            type: this.props.type,
            // isImportant: event.target.checked,
            importantAnswerVariant: this.props.importantAnswerVariant
        };

        if (event.target.checked) {
            question.importantAnswerVariant.push(event.target.name);
        }

        if (event.target.checked === false) {
            question.importantAnswerVariant.splice(question.importantAnswerVariant.indexOf(event.target.name), 1);
        }

        this.props.editQuestion(question);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography style={{fontSize: '20px', margin: '15px 25px 0 0'}}>
                          {this.props.title}
                        </Typography>
                        <div className="buttons" style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                            <Button
                                style={{margin: '0 15px'}}
                                variant="fab"
                                id="edit"
                                color="primary"
                                onClick={this.editQuestion}
                            >
                                <MdEdit style={{fontSize: '25px', marginLeft: '1px', marginTop: '1px'}}/>
                            </Button>
                            <Button
                                onClick={(event) => this.deleteHandler(event, this.props.id)}
                                variant="fab"
                                id="delete"
                            >
                                <MdDeleteForever style={{fontSize: '25px', marginLeft: '1px', marginTop: '1px'}}/>
                            </Button>
                        </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>{this.props.title}</Typography>
                        <form className={classes.container}>
                            <DialogContent className={classes.DialogContent}>
                                <DialogContentText>
                                    Выберите вариант ответа
                                </DialogContentText>

                                {this.props.options.length > 0 &&
                                <div className={classes.root}>
                                    <FormControl component="fieldset" required className={classes.formControl}>
                                        <RadioGroup
                                            aria-label="selectedOption"
                                            name="selectedOption"
                                            className={classes.group}
                                        >
                                            {this.props.options.map(option => (
                                                <div key={option}>
                                                    <FormControlLabel
                                                        key={option}
                                                        value={option}
                                                        control={<Radio color="primary"/>}
                                                        label={option}
                                                    />
                                                    <Tooltip
                                                        title={this.props.importantAnswerVariant.includes(option) ? "Сделать вариант ответа неважным" : "Сделать вариант ответа важным"}
                                                        placement="top"
                                                    >
                                                        <Checkbox
                                                            name={option}
                                                            checked={this.props.importantAnswerVariant.includes(option)}
                                                            onChange={(event) => this.isImportantHandler(event)}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                }

                            </DialogContent>

                            <Button
                                disabled
                                size='large'
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Ответить
                            </Button>
                        </form>
                        <Modal show={this.state.show}
                               onHide={this.handleHide}
                        >
                            <Modal.Header>
                                Редактирование вопроса
                            </Modal.Header>
                            <Modal.Body>
                                <DialogContentText>
                                    Введите текст
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    type="text"
                                    id="editText"
                                    fullWidth
                                    value={this.state.question.title}
                                    onChange={this.inputChangeHandler}
                                />
                            </Modal.Body>
                            <Button size='small'
                                    variant="contained"
                                    color="primary"
                                    id="editButton"
                                    className={classes.button}
                                    onClick={this.editSendHandler}
                            >
                                Сохранить
                            </Button>
                        </Modal>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        question: state.questions.questionById
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteQuestion: (id) => dispatch(deleteQuestion(id)),
        editQuestion: (data) => dispatch(editQuestion(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WithOneAnswer));
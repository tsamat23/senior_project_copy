import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from "@material-ui/core/styles/withStyles";
import {Modal} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import {connect} from 'react-redux';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import MdEdit from 'react-icons/lib/md/edit';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

import {styles} from "./styles-material-ui";
import {deleteQuestion, editQuestion} from "../../../../store/actions/questionActions";

class MultipleAnswers extends Component {

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
            // isImportant: !isImportant,
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
                    </ExpansionPanelDetails>
                    <form className={classes.container}>
                        <DialogContent className={classes.DialogContent}>
                            {this.props.options.length > 0 &&
                            <div className={classes.root}>
                                <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormLabel component="legend">Выберите варианты ответов</FormLabel>
                                    <FormGroup>
                                        {this.props.options.map((option, id) => (
                                            <div>
                                                <FormControlLabel
                                                    key={id}
                                                    control={<Checkbox disabled value={option}/>}
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
                                    </FormGroup>
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
                                fullWidth
                                id="editText"
                                value={this.state.question.title}
                                onChange={this.inputChangeHandler}
                            />
                        </Modal.Body>
                        <Button size='small'
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.editSendHandler}
                        >
                            Сохранить
                        </Button>
                    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultipleAnswers));
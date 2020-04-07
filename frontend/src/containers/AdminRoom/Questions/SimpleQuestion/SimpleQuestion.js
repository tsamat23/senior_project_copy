import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {connect} from 'react-redux';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import {deleteQuestion, editQuestion} from "../../../../store/actions/questionActions";
import MdEdit from 'react-icons/lib/md/edit';
import {Modal} from 'react-bootstrap';

import {styles} from './simpleQuestionStyles-material-ui';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


class SimpleQuestion extends Component {

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
                data: this.props.data,
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
                data: this.props.data,
                id: this.props.id,
                sectionId: this.props.sectionId,
                type: this.props.type
            }
        });
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
                    <ExpansionPanelDetails className={classes.body}>
                        <Typography>{this.props.title}</Typography>
                        <form className={classes.container}>
                            <DialogContent>
                                <DialogContentText>
                                    Введите ответ на вопрос
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    disabled
                                />
                            </DialogContent>
                            <Button
                                disabled
                                size='small'
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
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Редактирование вопроса
                                </Modal.Title>
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
                                <Button size='small'
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.editSendHandler}
                                >
                                    Сохранить
                                </Button>
                            </Modal.Body>
                        </Modal>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
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
        editQuestion: (data) => dispatch(editQuestion(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleQuestion));
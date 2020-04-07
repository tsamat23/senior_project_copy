import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';

import {styles} from "../AdminRoom/AddingSection/addingSectionStyles-material-ui";
import {connect} from "react-redux";
import {addQuestion} from "../../store/actions/questionActions";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";

class PictureQuestion extends Component {

    state = {
        title: ''
    };

    addQuestionHandler = event => {
        event.preventDefault();

        if (this.state.title.length > 0) {
            const data = {
                sectionId: this.props.sectionId,
                title: this.state.title,
                type: this.props.questionType
            };

            this.props.onAddQuestion(data);
            this.props.closed();
        }
    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Dialog
                    open={this.props.show}
                    onClose={this.props.closed}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Форма добавления вопроса с типом рисунок</DialogTitle>
                    <form className={classes.container} onSubmit={this.addQuestionHandler} >
                        <DialogContent>
                            <DialogContentText>
                                Введите текст вопроса
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required={true}
                                margin="dense"
                                id="title"
                                name='title'
                                type="text"
                                fullWidth
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                        </DialogContent>
                        <DialogActions>
                            <IconButton
                                id="addQuestion"
                                type='submit'
                                className={classes.buttonIcon}
                                variant="fab"
                                color="primary"
                                aria-label="add">
                                <Icon
                                    className={classNames(classes.iconHover, 'far fa-check-circle')}
                                    color="error"
                                    style={{ fontSize: 45 }}
                                />
                            </IconButton>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAddQuestion: data => dispatch(addQuestion(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(PictureQuestion));
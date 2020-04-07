import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {connect} from "react-redux";

import '../AdminRoom/Questions/InfoText/Wysiwyg.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {styles} from "../AdminRoom/AddingSection/addingSectionStyles-material-ui";
import {addQuestion} from "../../store/actions/questionActions";
import { Editor } from 'react-draft-wysiwyg';





class InfoText extends Component {

        state = {
            data: ''
        };


    onChangeHandler = data =>{
        this.setState({
            data
        });
    };

    addQuestionHandler = event => {
        event.preventDefault();
        if (this.state.contentState !== '') {
            const data = {
                title: 'Блок с информацией',
                sectionId: this.props.sectionId,
                data: [JSON.stringify(this.state.data)],
                type: this.props.questionType
            };

            this.props.onAddQuestion(data);
            this.props.closed();
        }
    };

    inputChangeHandler = contentState => {
        this.setState({title: contentState});
    };

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Dialog
                    fullScreen
                    open={this.props.show}
                    onClose={this.props.closed}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Форма добавления простого вопроса</DialogTitle>
                    <form className={classes.container} onSubmit={this.addQuestionHandler} >
                        <DialogContent>
                            <DialogContentText>
                                Введите текст
                            </DialogContentText>
                            <Editor
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class, customStyle"
                                toolbarClassName="toolbar-class"
                                onContentStateChange={(event) => this.onChangeHandler(event)}
                            />
                        </DialogContent>
                        <DialogActions
                            disableActionSpacing
                            style={{textAlign: 'center'}}>
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
                            <IconButton
                                onClick={this.props.closed}
                                id="closeForm"
                                className={classes.buttonIcon}
                                variant="fab"
                                color="primary"
                                aria-label="add">
                                <Icon
                                    className={classNames(classes.iconHover, 'fa fa-times')}
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

export default connect(null, mapDispatchToProps)(withStyles(styles)(InfoText));
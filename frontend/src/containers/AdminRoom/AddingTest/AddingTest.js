import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import {addNewSection} from "../../../store/actions/sectionActions";
import {styles} from './addingSectionStyles-material-ui'
import {sendTestQuestion} from "../../../store/actions/questionActions";
import TestQuestionForm from "../../FormsQuestions/TestQuestionForm/TestQuestionForm";

class AddingSection extends Component {

    state = {
        title: '',
        description: '',
        data: [],
        sectionAdded: false
    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    fileChangeHandler = event => {
        this.setState({
            data: event.target.files[0]
        });
    };

    addNewSectionHandler = () => {

        const sectionData = {
            title: `${this.state.title} (Тест)`,
            description: this.state.description
        };

        this.props.onAddNewSection(sectionData);
    };

    addTest = event => {
        event.preventDefault();
        const section = this.props.sections.find(item => item.title === `${this.state.title} (Тест)`);

        const formData = new FormData();
        formData.append('data', this.state.data);
        formData.append('type', 'test');
        formData.append('title', 'Test');
        formData.append('sectionId', section._id);
        this.props.sendTestQuestion(formData);
        this.setState({sectionAdded: false, title: '', description: ''});
        this.props.closed();
    };

    showAddingTestForm = event => {
        event.preventDefault();
        this.addNewSectionHandler();

        this.setState({sectionAdded: true});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="123">
                <Dialog
                    open={this.props.show}
                    onClose={this.props.closed}
                    fullWidth
                    aria-labelledby="form-dialog-title"
                >
                    {!this.state.sectionAdded ? (
                        <Fragment>
                            <form className={classes.container} onSubmit={this.showAddingTestForm}>


                                <DialogTitle id="form-dialog-title">Форма добавления теста</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Введите название теста
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        required={true}
                                        margin="dense"
                                        id="addingSectionTitle"
                                        name='title'
                                        type="text"
                                        fullWidth
                                        value={this.state.title}
                                        onChange={this.inputChangeHandler}
                                    />
                                    <DialogContentText>
                                        Введите описание теста
                                    </DialogContentText>
                                    <TextField
                                        required={true}
                                        margin="dense"
                                        id="addingSectionDescription"
                                        name='description'
                                        type="textarea"
                                        fullWidth
                                        value={this.state.description}
                                        onChange={this.inputChangeHandler}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        size='large'
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes.button}
                                    >
                                        Далее
                                    </Button>
                                </DialogActions>
                            </form>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <TestQuestionForm
                                addTest={this.addTest}
                                fileChangeHandler={this.fileChangeHandler}

                            />
                        </Fragment>
                    )}

                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    sendTestQuestion: formData => dispatch(sendTestQuestion(formData)),
    onAddNewSection: data => dispatch(addNewSection(data))
});

const mapStateToProps = state => ({
    sections: state.sections.sections,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddingSection));
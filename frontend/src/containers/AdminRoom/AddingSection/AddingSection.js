import React, {Component} from 'react';
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

class AddingSection extends Component {

    state = {
        title: '',
        description: '',
        image: '',
    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    fileChangeHandler = event => {
        this.setState({
            image: event.target.files[0]
        });
    };

    addNewSectionHandler = event => {
        event.preventDefault();

        const sectionData = new FormData();
        sectionData.append('image', this.state.image);
        sectionData.append('title', this.state.title);
        sectionData.append('description', this.state.description);

        this.setState({sectionAdded: false, title: '', description: '', image: ''});

        this.props.onAddNewSection(sectionData);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="123">
                <Dialog
                    fullWidth
                    open={this.props.show}
                    onClose={this.props.closed}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Форма добавления секции</DialogTitle>
                    <form className={classes.container} onSubmit={this.addNewSectionHandler}>
                        <DialogContent>
                            <DialogContentText>
                                Введите название секции
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
                                Введите описание секции
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
                            <TextField
                                accept="jpg"
                                id="addingFile"
                                multiple
                                type="file"
                                name='image'
                                onChange={this.fileChangeHandler}
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
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAddNewSection: sectionData => dispatch(addNewSection(sectionData))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddingSection));
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

import {addNewSection, editedSection} from "../../../store/actions/sectionActions";
import {styles} from '../AddingSection/addingSectionStyles-material-ui'

class EditedSection extends Component {

    state = {
        title: '',
        description: '',
        image: '',
    };

    componentDidMount(){
        this.setState({
            title: this.props.title,
            description: this.props.description,
            image: this.props.image
        })
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    fileChangeHandler = event => {
        this.setState({
            image: event.target.files[0]
        });
    };

    editedSectionHandler = event => {
        event.preventDefault();
        const id = this.props.sectionId;
        const sectionData = new FormData();
        sectionData.append('image', this.state.image);
        sectionData.append('title', this.state.title);
        sectionData.append('description', this.state.description);
        this.props.onEditedSection(sectionData, id);
        this.props.closed();
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="123">
                <Dialog
                    fullWidth
                    open={this.props.open}
                    onClose={this.props.closed}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Форма редактирования секции</DialogTitle>
                    <form className={classes.container} onSubmit={this.editedSectionHandler}>
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
                                Отредактировать
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onEditedSection: (sectionData, id) => dispatch(editedSection(sectionData, id))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(EditedSection));
import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import green from "@material-ui/core/colors/green";
import {Link} from 'react-router-dom';


class TermsOfUseModal extends Component {
    state = {
        isOpen: true
    };


    handleTermsAgree = () => {
        this.setState({isOpen: false});
        localStorage.setItem('termsOfUse', 'false');
    };

    render() {
        const classes = {
            root: {
                color: green[600],
                '&$checked': {
                    color: green[500],
                },
            },
            linkBtn: {
                fontSize: '14px',
                border: '1px solid',
                borderRadius: '7px',
                padding: '5px 10px'
            },
            checked: {}
        };

        const terms = localStorage.getItem('termsOfUse');
        return (
            terms === 'false' ? null : <Dialog
                open={this.state.isOpen}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">О вашей конфиденциальности</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Для того, что бы подробнее ознакомиться с политикой конфиденциальности, пожалуйста перейдите
                            по ссылке ниже</p>
                        <Link className={classes.linkBtn} to='/privacy'>Перейти</Link>
                    </DialogContentText>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!this.state.isOpen}
                                onChange={this.handleTermsAgree}
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked,
                                }}
                            />
                        }
                        label="Да, я согласна/согласен предоставить свои данные для обработки."
                    />
                </DialogContent>
            </Dialog>
        )
    };
}

export default TermsOfUseModal;
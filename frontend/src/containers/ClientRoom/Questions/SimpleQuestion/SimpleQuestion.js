import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {styles} from './simpleQuestionStyles-material-ui';


class SimpleQuestion extends Component {


    render() {
        const {classes, title} = this.props;

        return (
            <div className={classes.root}>
                <Typography style={{fontSize: '20px', margin: '15px 25px 0 0'}}>
                    {title}
                </Typography>
                        <form
                            onSubmit={(event) => event.preventDefault()}
                            onChange={(event) => this.props.changed(event, this.props.id, this.props.type, title)}
                            className={classes.container}>
                            <DialogContent>
                                <DialogContentText>
                                    Введите ответ на вопрос
                                </DialogContentText>
                                <TextField
                                    required
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    value={this.props.value}
                                />
                            </DialogContent>
                        </form>
            </div>
        )
    }
}


export default withStyles(styles)(SimpleQuestion);
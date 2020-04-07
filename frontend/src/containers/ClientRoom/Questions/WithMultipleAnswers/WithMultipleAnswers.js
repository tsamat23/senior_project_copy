import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "./styles-material-ui";

class MultipleAnswers extends Component {

    render() {
        const {classes, title} = this.props;

        return (
            <div className={classes.root}>
                        <Typography style={{fontSize: '20px', margin: '15px 25px 0 0'}}>
                            {title}
                        </Typography>
                    <form className={classes.container}>
                        <DialogContent className={classes.DialogContent}>
                            {this.props.options.length > 0 &&
                            <div className={classes.root}>
                                <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormGroup
                                        onChange={(event) => this.props.changed(event, this.props.id, this.props.type, title)}
                                        value={this.props.value}
                                    >
                                        {this.props.options.map((option, id) => ( //this.props.options = ['', '', '', '']
                                            <FormControlLabel
                                                key={id}
                                                control={<Checkbox value={option}/>}
                                                label={option}
                                            />
                                        ))
                                        }
                                    </FormGroup>
                                </FormControl>
                            </div>
                            }

                        </DialogContent>
                    </form>
            </div>
        );
    }
}


export default withStyles(styles)(MultipleAnswers);
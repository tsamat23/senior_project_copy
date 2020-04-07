import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import {styles} from './styles-material-ui';


class WithOneAnswer extends Component {

    // state = {
    //     show: false,
    //     question: {
    //         type: '',
    //         data: [],
    //         id: '',
    //         sectionId: '',
    //         title: ''
    //     }
    // };

    // inputChangeHandler = event => {
    //     this.setState({
    //         question: {
    //             title: event.target.value,
    //             data: this.props.data,
    //             id: this.props.id,
    //             sectionId: this.props.sectionId,
    //             type: this.props.type
    //         }
    //     });
    // };

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
                                        <RadioGroup
                                            aria-label="selectedOption"
                                            name="selectedOption"
                                            className={classes.group}
                                            onChange={(event) => this.props.changed(event, this.props.id, this.props.type, title)}
                                            value={this.props.value}
                                        >
                                            {this.props.options.map(option => (
                                                <FormControlLabel
                                                    key={option}
                                                    control={<Radio color="primary"/>}
                                                    label={option}
                                                    value={option}
                                                />
                                            ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                }

                            </DialogContent>
                        </form>
            </div>
        );
    }
}


export default withStyles(styles)(WithOneAnswer);
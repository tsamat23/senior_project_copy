import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {deleteQuestion, editQuestion} from "../../../../store/actions/questionActions";
import MdDeleteForever from 'react-icons/lib/md/delete-forever';

import {styles} from './testStyles-material-ui';


class Test extends Component {

    deleteHandler = (event, id) => {
        event.preventDefault();
        this.props.deleteQuestion(id)
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Typography style={{fontSize: '20px', margin: '15px 25px 0 0'}}>
                            {this.props.title}
                        </Typography>
                        <div className="buttons" style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                            <Button
                                onClick={(event) => this.deleteHandler(event, this.props.id)}
                                variant="fab"
                                id="delete"
                            >
                                <MdDeleteForever style={{fontSize: '25px', marginLeft: '1px', marginTop: '1px'}}/>
                            </Button>
                        </div>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        deleteQuestion: (id) => dispatch(deleteQuestion(id)),
        editQuestion: (data) => dispatch(editQuestion(data))
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Test));
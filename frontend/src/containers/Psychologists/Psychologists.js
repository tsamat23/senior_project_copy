import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {styles} from './psychologistsStyle-material-ui';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import ModalComponent from "../../components/UI/Modals/Modal/Modal";

class Psychologists extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.props.psychologists.map((psycho, index) => {
                    return (
                        <ExpansionPanel key={index} id="psycho">
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.heading}>Данные психолога    <b>{psycho.displayName}</b></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.sectionBox}>
                                <Typography className={classes.description}>
                                    <b>Email психолога: </b> {psycho.email}
                                </Typography>
                                <Typography className={classes.description}>
                                    <b>Имя психолога: </b> {psycho.displayName}
                                </Typography>

                                <Link to={'/psychologist/' + psycho._id}>
                                    <Button
                                        className={classes.button}
                                        variant="outlined"
                                        color="default"
                                    >
                                        Просмотреть рецензии данного психолога
                                    </Button>
                                </Link>

                                <Button
                                    className={classes.button}
                                    onClick={(event, id) => this.props.delete(event ,psycho._id)}
                                    variant="outlined"
                                    color="default"
                                    id="delPsych"
                                >
                                    Удалить
                                </Button>
                                <Button
                                    id="editPsycho"
                                    onClick={(id) => this.props.edit(psycho._id)}
                                    variant="outlined"
                                    color="default"
                                >
                                    Редактировать
                                </Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}

                <ModalComponent/>
            </div>
        )
    }
};

export default withStyles(styles)(Psychologists);
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function PaperSheet(props) {
    const {classes} = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="headline" component="h3">
                    {/*{props.header}*/}
                    {props.children}
                </Typography>
                <Typography component="p">
                    {props.text}
                </Typography>
            </Paper>
        </div>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
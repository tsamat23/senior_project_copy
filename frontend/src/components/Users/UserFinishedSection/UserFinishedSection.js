import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '0 auto',
    marginBottom: '20px',
    width: '50%'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const UserFinishedSection = ({ classes, displayName, sectionTitle, sectionId, userId}) => (
  <Paper className={classes.root} elevation={1}>
    <Typography variant="headline" component="h3" className={classes.heading}>
      {displayName}
      <Link to={`/sections/finished/?sectionId=${sectionId}&userId=${userId}`}>
        <Button variant="contained" size="small" className={classes.button}>
          Подробнее
        </Button>
      </Link>
    </Typography>
    <Typography component="p">
      закончил секцию - {sectionTitle}
    </Typography>
  </Paper>
);

export default withStyles(styles)(UserFinishedSection);
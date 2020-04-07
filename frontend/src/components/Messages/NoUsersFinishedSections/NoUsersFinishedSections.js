import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  noUsersMessage: {
    padding: '10px',
    textAlign: 'center'
  }
};

const NoUsersFinishedSections = ({ classes }) => (
  <Paper>
    <Typography variant="headline" component="h3" className={classes.noUsersMessage}>
      Нет пользователей закончивших секции
    </Typography>
  </Paper>
);

export default withStyles(styles)(NoUsersFinishedSections)
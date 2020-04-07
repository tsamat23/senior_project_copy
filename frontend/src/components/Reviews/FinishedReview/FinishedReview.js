import React, {Fragment} from 'react'
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  reviewBox: {
    padding: '15px'
  },
  reviewTitle: {
    marginBottom: '15px'
  }
};

const FinishedReview = ({ classes, review }) => {
  return(
    <div className={classes.reviewBox}>
      <Typography align='center' variant='title' className={classes.reviewTitle}>
        Ваша рецензия:
      </Typography>
      <Typography align='left' variant='title'>
        {review[0].review}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(FinishedReview);
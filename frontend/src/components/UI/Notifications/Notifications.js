import React, {Fragment} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import withStyles from "@material-ui/core/styles/withStyles";
import Bell from '@material-ui/icons/Notifications';
import Done from "@material-ui/icons/DoneAll";

import {styles} from './styles';
import {Link} from "react-router-dom";

const Notifications = ({ classes, amount, doUnactive }) => (
  <Fragment>
      <Link to='/admin/users/finished-sections'>
          <IconButton id='done' aria-label="Cart" className={classes.button} onClick={doUnactive}>
              <Badge badgeContent={amount} color="primary" classes={{ badge: classes.badge }}>
                  <Done />
              </Badge>
          </IconButton>
      </Link>

      <Link to='/importantNotifications'>
          <IconButton id='important' aria-label="Cart" className={classes.button} onClick={doUnactive}>
              <Badge badgeContent={amount} color="primary" classes={{ badge: classes.badge }}>
                  <Bell />
              </Badge>
          </IconButton>
      </Link>
  </Fragment>
);

export default withStyles(styles)(Notifications);
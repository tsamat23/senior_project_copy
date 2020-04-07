import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

import {styles} from '../../../containers/Users/UsersListContainer/styles';


const User = ({ displayName, avatar, classes, id}) => (
  <Link to={`/info/users/${id}`}>
    <ListItem button>
      <Avatar alt="" src={avatar} />
      <ListItemText primary={displayName} />
        <Avatar className={classes.greenAvatar}>
          <AssignmentIcon />
        </Avatar>
    </ListItem>
  </Link>
);

export default withStyles(styles)(User);
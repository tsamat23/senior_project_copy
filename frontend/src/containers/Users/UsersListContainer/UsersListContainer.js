import React, {Component} from 'react';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import {styles} from './styles';
import UsersList from '../../../components/Users/UsersList/UsersList';
import {fetchAllUsers} from "../../../store/actions/adminActions";


class UsersListContainer extends Component {

  componentDidMount() {
    this.props.onFetchAllUsers();
  };

  render() {
    const { users, classes } = this.props;
    return(
      <div className={classes.root}>
        <UsersList users={users && users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.allUsers
});

const mapDispatchToProps = dispatch => ({
  onFetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersListContainer));
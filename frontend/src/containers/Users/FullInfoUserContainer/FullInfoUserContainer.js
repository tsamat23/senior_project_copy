import React, {Component} from 'react';
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";


import {fetchFullInfoUser} from "../../../store/actions/adminActions";
import UserInfo from "../../../components/Users/UserInfo/UserInfo";
import AllFinishedSections from "../../Sections/AllFinishedSections/AllFinishedSections";


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  sectionBox: {
    padding: '20px'
  }
});


class FullInfoUserContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onFetchFullInfo(id);
  };

  render() {
    const { classes, user } = this.props;

    return(
      <Paper className={classes.root} elevation={1}>
        <UserInfo
          displayName={user && user.displayName}
          email={user && user.email}
        />
        <AllFinishedSections sections={user && user.sections}/>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.admin.currentUser
});

const mapDispatchToProps = dispatch => ({
  onFetchFullInfo: id => dispatch(fetchFullInfoUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FullInfoUserContainer));
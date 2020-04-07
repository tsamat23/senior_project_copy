import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {connect} from "react-redux";
import Facebook from 'react-icons/lib/fa/facebook-square';
import IconButton from '@material-ui/core/IconButton';


import config from "../../../config";
import {facebookLogin} from "../../../store/actions/userActions";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  button: {
    marginLeft: '15px',
    marginRight: "15px",
    background: '#fff'
  },
  registerBtn: {
    background: '#5282b8',
    color: '#fff',
    fontSize: '12px'
  }
});

class FacebookLogin extends Component {
  facebookResponse = response => {
    if (response.id) {
      this.props.facebookLogin(response);
    }
  };

  render() {
    const { classes } = this.props;
    return <FacebookLoginButton
      appId={config.facebookAppId}
      fields="name,email,picture"
      render={renderProps => (
        <IconButton className={classes.button} onClick={renderProps.onClick} variant="fab" color="secondary" aria-label="add">
          <Facebook style={{fontSize: '30px'}} />
        </IconButton>
      )}
      callback={this.facebookResponse}
    />
  }
}

const mapDispatchToProps = dispatch => ({
  facebookLogin: data => dispatch(facebookLogin(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(FacebookLogin));


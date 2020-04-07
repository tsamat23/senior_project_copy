import React, {Component} from 'react';
import {connect} from "react-redux";
import VkAuth from "react-vk-auth";

import config from "../../../config";
import {vkLogin} from "../../../store/actions/userActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import VK from 'react-icons/lib/fa/vk';



const styles = {
    button: {
        marginLeft: '15px',
        marginRight: "15px",
        background: '#fff',
        textAlign: 'center'
    },
    registerBtn: {
        background: '#5282b8',
        color: '#fff',
        fontSize: '12px'
    }
};


class VkLogin extends Component {
  vkResponse = response => {
    if (response.status === 'connected') {
      this.props.vkLogin(response);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <IconButton className={classes.button} variant="fab" color="secondary" aria-label="add">
              <VkAuth
                  type='button'
                  style={{background: 'none',border: 'none', width: '40px', height: '40px', margin: '0', padding: '0', outline: 'none'}}
                  apiId={config.vkId}
                  callback={this.vkResponse}>
                  <VK style={{fontSize: '30px'}} />
              </VkAuth>
        </IconButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  vkLogin: data => dispatch(vkLogin(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(VkLogin));


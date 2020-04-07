import React, {Component} from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Icon from "@material-ui/core/Icon/Icon";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class UserMenu extends Component{

    render(){

        return(
            <div style={{marginTop: '7px'}}>
                <Icon
                    id='menu-appbar'
                    aria-haspopup="true"
                    color="inherit"
                >
                    {this.props.avatar?
                        <Avatar
                        alt="Adelle Charles"
                        src={this.props.avatar}
                    /> :
                        <AccountCircle />}
                </Icon>
            </div>
        )
    }
}

export default withStyles(styles)(UserMenu)
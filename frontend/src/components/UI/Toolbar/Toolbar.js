import React, {Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {Link} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

import Sidebar from '../../Sidebar/Sidebar';
import Notifications from "@material-ui/icons/Notifications";
import UserMenu from "./UserMenu";
import AdminNotifications from "../Notifications/Notifications";
import IconButton from "@material-ui/core/IconButton/IconButton";
import LogOutIcon from "@material-ui/icons/ExitToAppOutlined";
import LogInIcon from "@material-ui/icons/MeetingRoom";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = {
    root: {
        flexGrow: 1,
        marginBottom: '30px'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        color: '#fff',
        fontSize: '16px',
        outline: 'none',
        textDecoration: 'none',
        '&:hover': {
            color: "#fff"
        }
    },
    enter: {
        color: '#ebebeb',
        '&:hover': {
            color: "#ebebeb",
            outline: 'none'
        },
        '&:isActive': {
            color: "#ebebeb",
        },
        textDecoration: 'none'
    },
    icon: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    bellLink: {
        marginRight: '20px'
    }
};

class MenuAppBar extends React.Component {

    state = {
        anchorEl: null,
        open: false,
    };


    handleClickOpen = (id) => {
        this.setState({open: true, openIs: id});
    };

    handleChange = () => {
        !this.props.user && this.props.route('/login');
        this.props.user && this.props.logout();
    };

    render() {
        const {classes, amount, user, doUnactive} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color='primary'>
                    <Toolbar>
                        <Typography variant="title" style={{color: '#fff', fontSize: '14px'}} className={classes.flex}>
                            {user && <Sidebar/>}
                            {!user ? <Link to='/blocks' className={classes.link}>На главную</Link> : null}
                        </Typography>

                        {/*{user && user.role === 'admin' &&*/}
                        {/*<AdminNotifications amount={amount} doUnactive={doUnactive}/>*/}
                        {/*}*/}
                        {/*{user && user.role === 'user' &&*/}
                        {/*<Link to='/reviews' className={classes.bellLink}>*/}
                        {/*    <IconButton>*/}
                        {/*        <Notifications className={classes.icon} variant='fab' color='secondary'*/}
                        {/*                       arial-label='add'/>*/}
                        {/*    </IconButton>*/}
                        {/*</Link>*/}
                        {/*}*/}

                        <FormGroup>
                            <FormControlLabel
                                control = {
                                    <Fragment>

                                    </Fragment>
                                }
                                label={
                                    <Typography
                                        variant="title"
                                        style={{color: '#fff', fontSize: '14px', marginTop: '7px'}}>
                                        {this.props.user ? `Добро пожаловать! ${this.props.user.displayName}` :
                                            <Link to='/login' className={classes.enter}>
                                                Войти
                                                <LogInIcon
                                                    style={{color: "#fff", margin: "0 10px", verticalAlign: 'middle'}}
                                                />
                                            </Link>}
                                    </Typography>
                                }
                            />

                        </FormGroup>
                        {this.props.user && (
                            <Fragment>
                                <UserMenu
                                    addHandleButton={this.handleClickOpen}
                                    avatar={this.props.user.avatar}
                                    route={this.props.route}
                                />
                            </Fragment>
                        )}
                        {user &&
                        <Tooltip title="Выйти">
                            <IconButton
                                id='logout'
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleChange}
                            >
                                <LogOutIcon/>
                            </IconButton>
                        </Tooltip>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withStyles(styles)(MenuAppBar);

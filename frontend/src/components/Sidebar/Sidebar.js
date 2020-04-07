import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Link} from 'react-router-dom';
import FaBook from 'react-icons/lib/fa/book';
import FaUserLock from 'react-icons/lib/fa/user-secret';
import FaHome from 'react-icons/lib/fa/home';
import FaStickyNote from 'react-icons/lib/fa/sticky-note';
import MdAddBox from 'react-icons/lib/md/add-box';
import MdPersonAdd from 'react-icons/lib/md/person-add';
import People from 'react-icons/lib/md/people';
import MdInfoOutline from 'react-icons/lib/md/info-outline';
import MdLockOutline from 'react-icons/lib/md/lock-outline';
import {connect} from 'react-redux';

const styles = {
    list: {
        width: 350,
        paddingTop: '15px'
    },
    fullList: {
        width: 'auto',
    },
    icon: {
        fontSize: '40px',
        marginRight: '15px',
        marginLeft: '10px',
        color: '#65446d'
    },
    testIcon: {
        fontSize: '25px',
        color: '#65446d',
        marginLeft: '15px',
    },
    text: {
        textDecoration: 'none',
        color: '#404040',
        cursor: 'pointer',
        display: 'block',
        '&:hover': {
            background: "#ebebeb"
        }
    },
    textLine: {
        marginBottom: '20px',
        paddingTop: '20px',
        color: '#404040',
    },
    nested: {
        paddingLeft: '15px',
    },
    listItemText: {
        color: '#65446d',
    }
};

class Sidebar extends React.Component {

    state = {
        left: false,
        openItem: true
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                <Link className={classes.text} to='/blocks'>
                    <List>
                        <FaHome className={classes.icon}/>
                        <Link className={classes.textLine} to="/blocks">На главную</Link>
                    </List>
                </Link>

                <Divider/>
                <Link className={classes.text} to='/changePassword'>
                    <List>
                        <FaUserLock className={classes.icon}/>
                        <Link className={classes.textLine} to="/changePassword">Сменить пароль</Link>
                    </List>
                </Link>

                {/*<Divider/>*/}
                {/*<Link className={classes.text} to='/reviews'>*/}
                {/*    <List>*/}
                {/*        <FaStickyNote className={classes.icon}/>*/}
                {/*        <Link className={classes.textLine} to="/reviews">Мои рецензии</Link>*/}
                {/*    </List>*/}
                {/*</Link>*/}

                <Divider/>
                <Link className={classes.text} to='/contacts'>
                    <List className={classes.textLine} id='contacts'>
                        <FaBook className={classes.icon}/>
                        <Link className={classes.textLine} to="/contacts">Контакты</Link>
                    </List>
                </Link>

                {this.props.user.role === 'admin' ?
                    <Fragment>
                        <Divider/>
                        <Link className={classes.text} to='/admin'>
                            <List>
                                <MdAddBox className={classes.icon}/>
                                <Link className={classes.textLine} to="/admin">Добавить секцию</Link>
                            </List>
                        </Link>
                    </Fragment>
                    : null}


                {/*{this.props.user.role === 'admin' ?*/}
                {/*    <Fragment>*/}
                {/*        <Divider/>*/}
                {/*        <Link className={classes.text} to='/addPsychologist'>*/}
                {/*        <List id='addNewPsycho'>*/}
                {/*            <MdPersonAdd className={classes.icon}/>*/}
                {/*            <Link className={classes.textLine} to="/addPsychologist">Добавить психолога</Link>*/}
                {/*        </List>*/}
                {/*    </Link>*/}
                {/*    </Fragment>*/}
                {/*    : null*/}
                {/*}*/}

                {this.props.user.role === 'admin' ?
                    <Fragment>
                        <Divider/>
                        <Link className={classes.text} to='/users'>
                        <List>
                            <People className={classes.icon}/>
                            <Link className={classes.textLine} to="/users">Все пользователи</Link>
                        </List>
                    </Link>
                    </Fragment>
                    : null
                }

                {/*<Divider/>*/}
                {/*<Link className={classes.text} to='/privacy'>*/}
                {/*    <List>*/}
                {/*        <MdLockOutline className={classes.icon}/>*/}
                {/*        <Link className={classes.textLine} to="/privacy">Политика конфиденциальности</Link>*/}
                {/*    </List>*/}
                {/*</Link>*/}

                <Divider/>
                <Link className={classes.text} to='/aboutUs'>
                    <List>
                        <MdInfoOutline className={classes.icon}/>
                        <Link className={classes.textLine} to="/aboutUs">О нас</Link>
                    </List>
                </Link>
            </div>
        );

        return (
            <Fragment>
                <IconButton
                    onClick={this.toggleDrawer('left', true)}
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    id="hamburger"
                >
                    <HomeIcon/>
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </Fragment>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Sidebar));
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Col, Form, FormControl, FormGroup, HelpBlock, PageHeader} from "react-bootstrap";
import {loginUser, recoverPassword} from "../../store/actions/userActions";
import FacebookLogin from "../../components/Auth/FacebookLogin/FacebookLogin";
import VkLogin from "../../components/Auth/VkLogin/VkLogin";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import ModalComponent from '../../components/UI/Modals/Modal/Modal';
import PreloaderComponent from "../../components/UI/Preloader/Preloader";
import {Redirect, Link} from 'react-router-dom';

const styles = theme => ({
    button: {
        marginLeft: '29px',
        padding: '10px 146px',
        width: '275px',
        height: '30px',
        fontSize: '14px',
        color: '#dcdcdc'
    },
    registerBtn: {
        color: '#fff',
        fontSize: '12px'
    },
    input: {
        display: 'none',
    },
    change: {
        marginRight: '-2px',
        fontSize: '12px',
        color: '#fff',
        hover: {
            color: '#000'
        }
    },
    textLogin: {
        textAlign: 'center'
    },
    text: {
        margin: "10px",
        textAlign: 'center',
        color: "#dcdcdc"
    },
    social: {
        marginBottom: '20px',
        textAlign: 'center'
    },
    recovery: {
        marginTop: '15px',
        textAlign: 'center'
    },
    recBtn: {
        fontSize: '12px',
        color: '#fff',
        '&:hover': {
            color: "#fff"
        }
    }
});

class Login extends Component {
    state = {
        formInfo: {
            email: '',
            password: '',
        },
        show: false,
        recoveryEmail: ''
    };

    componentDidMount () {
        if(this.props.user){
            return <Redirect path='/blocks'/>
        }
    }

    inputChangeHandler = event => {
        this.setState({
            formInfo: {
                ...this.state.formInfo,
                [event.target.name]: event.target.value
            }
        });
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.loginUser(this.state.formInfo);
    };

    handleShow = (event) => {
        event.preventDefault();
        this.setState({show: true});
    };

    handleHide = () => {
        this.setState({show: false});
    };

    recoveryEmailHandler = (event) => {
        this.setState({recoveryEmail: event.target.value});
    };

    recoverEmailSubmit = (event) => {
        event.preventDefault();
        this.props.recoverPassword(this.state.recoveryEmail);
    };

    render() {

        if(this.props.user) {
            return <Redirect to='/blocks' />
        }

        const {classes} = this.props;
        return (
            this.props.isLoading === false ? <Fragment>
                <PageHeader className={classes.text}>Авторизация</PageHeader>

                <Form horizontal onSubmit={this.submitFormHandler} style={{margin: '0 auto', width: '40%'}}>
                    <FormGroup md={8} controlId="emailForm"
                               validationState={this.props.error && 'error'}>
                        <Col smOffset={2} sm={8}>
                            <FormControl
                                type="email"
                                placeholder="Введите ваш email"
                                name="email"
                                value={this.state.email}
                                onChange={this.inputChangeHandler}
                                required
                            />
                            {this.props.error &&
                            <HelpBlock>{this.props.error.error}</HelpBlock>
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup md={8} controlId="passwordForm"
                               validationState={this.props.error && 'error'}>
                        <Col smOffset={2} sm={8}>
                            <FormControl
                                type="password"
                                placeholder="Введите ваш пароль"
                                name="password"
                                value={this.state.password}
                                onChange={this.inputChangeHandler}
                                required
                            />
                            {this.props.error &&
                            <HelpBlock>{this.props.error.error}</HelpBlock>
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup style={{margin: '0 auto'}}>
                        <Col smOffset={1} sm={8}>
                            <Button variant="outlined" color="default" type="submit" className={classes.button}>
                                Войти
                            </Button>
                        </Col>
                    </FormGroup>

                    <Col smOffset={2} sm={8}>
                        <h3 className={classes.text}>Или</h3>
                    </Col>

                    <Col smOffset={2} sm={8}>
                        <div className={classes.social}>
                            <FacebookLogin />
                            <VkLogin/>
                        </div>
                    </Col>

                    <Col smOffset={2} sm={8}>
                        {/*<Button color="primary" className={classes.change} onClick={this.handleShow}>Забыли пароль?</Button>*/}
                        <Button color="primary">
                            <Link to="/register" className={classes.recBtn}>Регистрация</Link>
                        </Button>
                    </Col>
                </Form>

                <ModalComponent hide={this.handleHide}
                                show={this.state.show}
                                title="Введите свой email"
                >
                    <Form onSubmit={this.recoverEmailSubmit}>
                        <FormControl
                            type="email"
                            placeholder="Введите ваш email"
                            name="email"
                            value={this.state.recoveryEmail}
                            onChange={this.recoveryEmailHandler}
                            required
                        />
                        <div className={classes.recovery}>
                            <Button className={classes.recBtn} variant='outlined' type="submit" color="default">Отправить</Button>
                        </div>
                    </Form>
                </ModalComponent>

            </Fragment> : <PreloaderComponent/>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.users.loginError,
        isLoading: state.isLoading.isLoading,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: userData => dispatch(loginUser(userData)),
        recoverPassword: (email) => dispatch(recoverPassword(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Form, FormGroup, PageHeader, FormControl} from 'react-bootstrap';
import './Register.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {registerUser, facebookLogin} from "../../store/actions/userActions";
import FacebookLogin from '../../components/Auth/FacebookLogin/FacebookLogin';
import VkLogin from '../../components/Auth/VkLogin/VkLogin';
import TermsOfUseModal from "./TermsOfUseModal";
import PreloaderComponent from "../../components/UI/Preloader/Preloader";
import {Redirect, Link} from 'react-router-dom';


const styles = () => ({
    fbButton: {
        height: '50px',
        width: '50px',
        borderRadius: '50%'
    },
    registerBtn: {
        color: '#dcdcdc',
        padding: '10px 161px',
        width: '275px',
        height: '30px',
        fontSize: '14px'
    },
    text: {
        margin: "10px",
        textAlign: 'center',
        color: "#dcdcdc"
    },
    enter: {
        marginTop: '10px'
    },
    social: {
        marginBottom: '20px',
        textAlign: 'center'
    },
    recBtn: {
        fontSize: '12px'
    },
    loginBtn: {
        color: '#fff',
        '&:hover': {
            color: "#fff"
        }
    }
});

class Register extends Component {

    state = {
        email: '',
        displayName: '',
        password: ''
    };


    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.registerUser(this.state);
    };


    render() {

        if(this.props.user) {
            return <Redirect to='/sections' />
        }

        const { classes } =this.props;
        return (
            this.props.isLoading === false ? <div className='cover'>
                <PageHeader className={classes.text}>Регистрация нового пользователя</PageHeader>
                <Form horizontal style={{width: '500px', margin: '0 auto'}} onSubmit={this.submitFormHandler}>

                    <FormGroup md={8} controlId="email">
                        <Col smOffset={2} sm={8}>
                            <FormControl
                                type="email"
                                required
                                placeholder="Введите сюда Ваш email"
                                name="email"
                                controlid="email"
                                onChange={this.inputChangeHandler}
                                value={this.state.email}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup md={8} controlId="name">
                        <Col smOffset={2} sm={8}>
                            <FormControl
                                type="text"
                                required
                                placeholder="Введите сюда Ваше имя"
                                name="displayName"
                                controlid="username"
                                onChange={this.inputChangeHandler}
                                value={this.state.displayName}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup md={8} controlId="password">
                        <Col smOffset={2} sm={8}>
                            <FormControl
                                type="password"
                                required
                                placeholder="Введите сюда Ваш пароль"
                                name="password"
                                controlid="password"
                                onChange={this.inputChangeHandler}
                                value={this.state.password}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup md={8}>
                        <Col smOffset={2} sm={10}>
                            <Button
                                className={[classes.registerBtn, classes.button].join(' ')}
                                variant="outlined" aria-label="delete"
                                type="submit"
                                color="default"
                            >Зарегистрироваться</Button>
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

                    <Col className={classes.enter} smOffset={2} sm={10}>
                        <Button className={classes.recBtn}>
                            <Link className={classes.loginBtn} to="/login">Авторизация</Link>
                        </Button>
                    </Col>
                </Form>

                <TermsOfUseModal/>
            </div> : <PreloaderComponent/>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.users.registerError,
        isLoading: state.isLoading.isLoading,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: userData => dispatch(registerUser(userData)),
        facebookLogin: (data) => dispatch(facebookLogin(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
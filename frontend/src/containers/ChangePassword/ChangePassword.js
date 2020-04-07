import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {checkToken, changePassword} from "../../store/actions/userActions";
import {Form, FormGroup, Col, FormControl, PageHeader, Alert} from 'react-bootstrap';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Redirect from "react-router-dom/es/Redirect";


const styles = theme => ({
    button: {
        marginLeft: '-5px',
        padding: '10px 146px',
        width: '360px',
        height: '30px',
        fontSize: '14px',
        color: '#fff'
    },
    title: {
        color: '#fff'
    }
});

class ChangePassword extends Component {

    state = {
        password: '',
        repeat: '',
        oldPassword: '',
        id: null,
        showError: false
    };

    componentDidMount() {
        const MyToken = this.props.location.search.slice(7, 17);
        console.log(MyToken);
        if(this.props.location.search) {
            const token = this.props.location.search.slice(7, 17);
            console.log(token);
            this.props.checkToken(token);
        }
    }

    inputChangeHandler = event => {
        if(this.state.repeat === this.state.password) {
            this.setState({error: false});
        }
        this.setState({
            [event.target.name]: event.target.value, id: this.props.user._id
        });
    };

    onSubmitHandler = event => {
        event.preventDefault();
        if(this.state.password === this.state.repeat) {
            this.props.changePassword(this.state);
        } else {
            this.setState({ showError: true });
        }

    };

    render () {

        if(!this.props.user && !this.props.location.search.includes('token')) {
            return <Redirect to='/login' />
        }

        const {classes} = this.props;
        return (
            <Fragment>
                <PageHeader style={{textAlign: 'center'}} className={classes.title}>Изменение пароля</PageHeader>

                <Form horizontal onSubmit={this.onSubmitHandler}>

                    {this.state.showError === true ? <Alert bsStyle="danger">
                        <h4>Ошибка</h4>
                        <p>Введенные пароли не совпадают</p>
                    </Alert> : null}

                    {!this.props.location.search ? <FormGroup md={8} controlId="oldPassForm">
                        <Col smOffset={4} sm={4}>
                            <FormControl
                                type="password"
                                placeholder="Введите старый пароль"
                                name="oldPassword"
                                value={this.state.oldPass}
                                onChange={this.inputChangeHandler}
                                required
                            />
                        </Col>
                    </FormGroup> : null}

                    <FormGroup md={8} controlId="passwordForm">
                        <Col smOffset={4} sm={4}>
                            <FormControl
                                type="password"
                                placeholder="Введите новый пароль"
                                name="password"
                                value={this.state.password}
                                onChange={this.inputChangeHandler}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup md={8} controlId="repeatPassForm">
                        <Col smOffset={4} sm={4}>
                            <FormControl
                                type="password"
                                placeholder="Повторите новый пароль"
                                name="repeat"
                                value={this.state.repeat}
                                onChange={this.inputChangeHandler}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup style={{margin: '0 auto'}}>
                        <Col smOffset={4} sm={4}>
                            <Button variant="outlined" color="default" type="submit" className={classes.button}>
                                Сохранить
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        checkToken: (token) => dispatch(checkToken(token)),
        changePassword: (data) => dispatch(changePassword(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangePassword));
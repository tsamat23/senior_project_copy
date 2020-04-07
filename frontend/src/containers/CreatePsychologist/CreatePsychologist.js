import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import {Col, FormGroup, Form, FormControl} from 'react-bootstrap';
import ModalComponent from '../../components/UI/Modals/Modal/Modal';
import {
    addPsychologist,
    getPsychologists,
    deletePsycho,
    getOnePsycho,
    editPsycho
} from '../../store/actions/adminActions';
import Psychologists from '../Psychologists/Psychologists';
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';
import PreloaderComponent from "../../components/UI/Preloader/Preloader";

const styles = () => ({
    button: {
        marginLeft: '-5px',
        padding: '10px 146px',
        width: '360px',
        height: '80px',
        fontSize: '14px'
    }
});

class CreatePsychologist extends Component {

    state = {
        show: false,
        psycho: {
            email: '',
            displayName: '',
            password: '',
            role: 'psychologist'
        },
        showEditModal: false
    };

    componentDidMount() {
        this.props.getPsychologists();
    }

    hideModal = () => {
        this.setState({show: false});
    };

    hideEditModal = () => {
        this.setState({showEditModal: false});
    };

    showModal = () => {
        this.setState({show: true})
    };

    saveHandler = (event) => {
        event.preventDefault();
        this.setState({show: false});
        this.props.addPsychologist(this.state.psycho)
    };

    editPsychoHandler = (event) => {
        event.preventDefault();
        this.props.editPsycho(this.state.psycho).then(() => {
            this.setState({showEditModal: false});
        });
    };

    deletePsychoHandler = (event, id) => {
        event.preventDefault();
        this.props.deletePsycho(id)
    };

    inputChangeHandler = event => {
        this.setState({
            psycho: {
                ...this.state.psycho,
                [event.target.name]: event.target.value
            }
        });
    };

    getOnePsycho = (id) => {
        this.setState({showEditModal: true});
        this.props.getOnePsycho(id).then(() => {
            this.setState({psycho: this.props.onePsycho});
        })
    };

    render() {
        const {classes} = this.props;
        return (
            this.props.isLoading === true ? <PreloaderComponent/> : <Fragment>
                <FormGroup md={5}>
                    <Col smOffset={2} sm={8}>
                        <Button
                            id="addPsycho"
                            color="primary"
                            variant="contained"
                            onClick={this.showModal}
                        >
                            <Icon
                                className={classNames(classes.iconHover, 'fa fa-plus-circle')}
                                color="error"
                                style={{fontSize: 30}}
                            />
                            <span style={{fontSize: '16px'}}>Добавить Психолога</span>
                        </Button>
                    </Col>
                </FormGroup>


                {this.props.psychologists ? <Psychologists
                    psychologists={this.props.psychologists}
                    displayName={this.props.psychologists.displayName}
                    email={this.props.psychologists.email}
                    password={this.props.psychologists.password}
                    delete={this.deletePsychoHandler}
                    edit={this.getOnePsycho}
                /> : null}


                <ModalComponent
                    title="Добавление психолога"
                    show={this.state.show}
                    hide={this.hideModal}
                >
                    <Form horizontal onSubmit={this.saveHandler}>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="email"
                                    placeholder="Введите email"
                                    name="email"
                                    value={this.state.psycho.email}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="text"
                                    placeholder="Введите имя"
                                    name="displayName"
                                    value={this.state.psycho.displayName}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="password"
                                    placeholder="Введите пароль"
                                    name="password"
                                    value={this.state.psycho.password}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    type="submit"
                                >
                                    Добавить
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalComponent>

                <ModalComponent
                    show={this.state.showEditModal}
                    hide={this.hideEditModal}
                    title="Редактирование данных психолога"
                >
                    <Form horizontal onSubmit={this.editPsychoHandler}>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="email"
                                    placeholder="Введите email"
                                    name="email"
                                    value={this.state.psycho.email}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="text"
                                    placeholder="Введите имя"
                                    name="displayName"
                                    value={this.state.psycho.displayName}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    type="password"
                                    placeholder="Введите пароль"
                                    name="password"
                                    value={this.state.psycho.password}
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    type="submit"
                                >
                                    Сохранить
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalComponent>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        psychologists: state.psycho.psychologists,
        onePsycho: state.psycho.onePsycho,
        isLoading: state.isLoading.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPsychologist: (psycho) => dispatch(addPsychologist(psycho)),
        getPsychologists: () => dispatch(getPsychologists()),
        deletePsycho: (id) => dispatch(deletePsycho(id)),
        getOnePsycho: (id) => dispatch(getOnePsycho(id)),
        editPsycho: (data) => dispatch(editPsycho(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreatePsychologist));
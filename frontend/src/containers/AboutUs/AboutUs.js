import React, {Component, Fragment} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {connect} from 'react-redux';
import './AboutUsStyle.css';
import {editInfo, getAboutInfo} from "../../store/actions/adminActions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from '../../components/UI/Modals/Modal/Modal';
import {Form, FormGroup, Col, FormControl, PageHeader, Alert} from 'react-bootstrap';

const styles = theme => ({
    button: {
        marginLeft: '29px',
        padding: '10px 146px',
        width: '275px',
        height: '30px',
        fontSize: '14px',
        color: '#dcdcdc',
        textAlign: 'center',
        borderColor: '#fff'
    },
    recovery: {
        marginTop: '15px',
        textAlign: 'center'
    },
    textArea: {
        width: '80%',
        height: '300px',
        margin: '0 10px 0 53px',
        border: '2px solid #cecece',
        borderRadius: '9px',
        outline: 'none'
    },
    btnCont : {
        textAlign: 'center'
    }
});


class AboutUs extends Component {

    state = {
        showModal: false,
        about: {
            title: '',
            about: ''
        }
    };

    componentDidMount() {
        this.props.getAboutInfo();
    }

    inputChangeHandler = event => {
        this.setState({
            about: {
                ...this.state.about,
                [event.target.name]: event.target.value
            }
        });
    };

    showModal = (event) => {
        event.preventDefault();
        this.setState({showModal: true});
        this.setState({
            about: {
                ...this.state.about,
                title: this.props.about.title,
                about: this.props.about.about
            }
        })
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    editInfo = (event) => {
        event.preventDefault();
        this.props.editInfo(this.state.about);
        this.hideModal();
    };

    render() {

        const {classes} = this.props;

        return (
            <Fragment>
                <Jumbotron className='area'>
                    <h2>{this.props.about.title}</h2>
                    <p>{this.props.about.about}</p>

                    {this.props.user && this.props.user.role !== 'admin' ? null : <div className={classes.recovery}>
                        <Button className={classes.button} variant='outlined' onClick={this.showModal}
                                color="default">Редактировать</Button>
                    </div>}
                </Jumbotron>


                <Modal title='Редактирование информации'
                       hide={this.hideModal}
                       show={this.state.showModal}
                >
                    <Form horizontal onSubmit={this.editInfo}>

                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='title'
                                    type="text"
                                    name="title"
                                    value={this.state.about.title}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>

                        <textarea
                            name="about"
                            id="aboutArea"
                            cols="30"
                            rows="10"
                            className={classes.textArea}
                            value={this.state.about.about}
                            onChange={this.inputChangeHandler}
                        />

                        <div className={classes.btnCont}>
                            <Button
                            type='submit'
                            variant='outlined'
                            color='primary'
                        >
                            Сохранить
                        </Button>
                        </div>
                    </Form>
                </Modal>

            </Fragment>
        )
    }
}

const
    mapStateToProps = state => {
        return {
            user: state.users.user,
            about: state.admin.about
        }
    };

const
    mapDispatchToProps = dispatch => {
        return {
            getAboutInfo: () => dispatch(getAboutInfo()),
            editInfo: (data) => dispatch(editInfo(data))
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)

(
    withStyles(styles)

    (
        AboutUs
    ))
;
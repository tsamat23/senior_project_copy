import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getContacts, editContacts, getContactById} from "../../store/actions/contactsActions";
import {Panel, FormGroup, FormControl, Col, Form} from 'react-bootstrap';
import ModalComponent from '../../components/UI/Modals/Modal/Modal';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';


const styles = () => ({
    container: {
        margin: '20px auto 0',
        width: '60%'
    },
    button: {
        display: 'flex',
        alignSelf: 'center',
        marginBottom: '20px'
    },
    formGroup: {
        marginBottom: '40px'
    }
});

class Contacts extends Component {

    state = {
        showModal: false,
        contacts: {
            phone: '',
            whatsapp: '',
            facebook: '',
            instagram: '',
            address: ''
        }
    };

    componentDidMount() {
        this.props.getContacts();
    }

    changeContacts = (event) => {
        event.preventDefault();
        this.props.editContacts(this.state.contacts, this.props.contacts._id);
        this.hideModal();
    };

    inputChangeHandler = event => {
        this.setState({
            contacts: {
                ...this.state.contacts,
                [event.target.name]: event.target.value
            }
        });
    };

    hideModal = () => {
        this.setState({showModal: false});
    };

    showModal = () => {
        this.setState({showModal: true});
        this.props.getContactById(this.props.contacts._id).then(() => {
            this.setState({
                contacts: {
                    ...this.state.contacts,
                    phone: this.props.idContact.phone,
                    whatsapp: this.props.idContact.whatsapp,
                    facebook: this.props.idContact.facebook,
                    instagram: this.props.idContact.instagram,
                    address: this.props.idContact.address
                }
            })
        });
    };

    render() {

        if(!this.props.user) {
            return <Redirect to='/sections'/>
        }

        const {classes} = this.props;
        return (
            <div className={classes.container}>

                {this.props.user && this.props.user.role === 'admin' ? <FormGroup md={5}>
                    <Button variant="contained"
                            color="default"
                            type="submit"
                            className={classes.button}
                            id='addContact'
                            onClick={this.showModal}>
                        Изменить контактные данные
                    </Button>
                </FormGroup> : null}

                <Panel>
                    <Panel.Heading>Номер телефона</Panel.Heading>
                    <Panel.Body><b>{this.props.contacts.phone}</b></Panel.Body>
                </Panel>
                <Panel>
                    <Panel.Heading>Контакт Whats App</Panel.Heading>
                    <Panel.Body><b>{this.props.contacts.whatsapp}</b></Panel.Body>
                </Panel>
                <Panel>
                    <Panel.Heading>Facebook</Panel.Heading>
                    <Panel.Body><b><a href="#">{this.props.contacts.facebook}</a></b></Panel.Body>
                </Panel>
                <Panel>
                    <Panel.Heading>Instagram</Panel.Heading>
                    <Panel.Body><b><a href="#">{this.props.contacts.instagram}</a></b></Panel.Body>
                </Panel>
                <Panel>
                    <Panel.Heading>Адрес</Panel.Heading>
                    <Panel.Body><b>{this.props.contacts.address}</b></Panel.Body>
                </Panel>


                <ModalComponent title='Изменение контактных данных'
                                show={this.state.showModal}
                                hide={this.hideModal}
                >
                    <Form onSubmit={this.changeContacts}>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='phone'
                                    className='formGroup'
                                    type="text"
                                    placeholder="Введите новый номер телефона"
                                    name="phone"
                                    value={this.state.contacts.phone}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='whatsapp'
                                    className='formGroup'
                                    type="text"
                                    placeholder="Введите номер Whats App"
                                    name="whatsapp"
                                    value={this.state.contacts.whatsapp}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='fb'
                                    className='formGroup'
                                    type="text"
                                    placeholder="Вставьте ссылку на Facebook аккаут"
                                    name="facebook"
                                    value={this.state.contacts.facebook}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='inst'
                                    className='formGroup'
                                    type="text"
                                    placeholder="Вставьте ссылку Instagram"
                                    name="instagram"
                                    value={this.state.contacts.instagram}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup md={5}>
                            <Col smOffset={2} sm={8}>
                                <FormControl
                                    id='address'
                                    className='formGroup'
                                    type="text"
                                    placeholder="Введите адрес"
                                    name="address"
                                    value={this.state.contacts.address}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup md={5}>
                            <Button variant="contained" color="default" type="submit" className={classes.button}>
                                Сохранить
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalComponent>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        contacts: state.contacts.contacts,
        idContact: state.contacts.idContact
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(getContacts()),
        getContactById: (id) => dispatch(getContactById(id)),
        editContacts: (data, id) => dispatch(editContacts(data, id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contacts));
import React, {Component} from 'react';
import {connect} from "react-redux";

import AddingSection from "./AddingSection/AddingSection";
import classNames from 'classnames';
import {fetchAllSection, toggleSectionForm} from "../../store/actions/sectionActions";
import Section from "./Section/Section";
import Button from "@material-ui/core/Button/Button";
import {styles} from './Section/sectionStyles-material-ui';
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon/Icon";
import {Redirect} from 'react-router-dom';
import AddingTest from "./AddingTest/AddingTest";
import {fetchNotifications} from "../../store/actions/adminActions";
import PreloaderComponent from "../../components/UI/Preloader/Preloader";

class AdminRoom extends Component {

    state = {
        showTestModal: false
    };

    componentDidMount() {
        this.props.onFetchAllSection();
        this.props.fetchNotifications();
    };


    toggleSectionFormHandler = () => {
        this.props.onToggleSectionForm();
        this.setState({sectionName: ''});
    };


    toggleTestFormHandler = () => {
        this.setState(prevState => {
            return {showTestModal: !prevState.showTestModal, sectionName: ''};
        })
    };


    renderSections = sections => {

        return sections.map(section => {
            return (
                <Section
                    id={section._id}
                    key={section._id}
                    title={section.title}
                    description={section.description}
                    sectionId={section._id}
                    questions={section.questions}
                    isActive={section.isActive}
                    rating={section.rating}
                    image={section.image}
                />
            );
        })
    };

    render() {
        if (!this.props.user || this.props.user.role !== 'admin') {
            return <Redirect to="/"/>;
        }

        const {classes} = this.props;

        return (
            this.props.isLoading === false ? <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                                                  id="adminRoom">

                {this.props.showSectionForm &&
                <AddingSection
                    closed={this.toggleSectionFormHandler}
                    show={this.props.showSectionForm}
                />
                }
                {/*<AddingTest*/}
                {/*    show={this.state.showTestModal}*/}
                {/*    closed={this.toggleTestFormHandler}*/}
                {/*/>*/}

                <div
                    style={{margin: '0 auto 20px', display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.toggleSectionFormHandler}
                    >
                        <Icon
                            className={classNames(classes.iconHover, 'fa fa-plus-circle')}
                            color="error"
                            style={{fontSize: 30}}
                        />
                        <span style={{fontSize: '16px'}}>Создать секцию</span>
                    </Button>
                    {/*<Button*/}
                    {/*    color="primary"*/}
                    {/*    variant="contained"*/}
                    {/*    onClick={this.toggleTestFormHandler}*/}
                    {/*>*/}
                    {/*    <Icon*/}
                    {/*        className={classNames(classes.iconHover, 'fa fa-plus-circle')}*/}
                    {/*        color="error"*/}
                    {/*        style={{fontSize: 30}}*/}
                    {/*    />*/}
                    {/*    <span style={{fontSize: '16px'}}>Создать тест</span>*/}
                    {/*</Button>*/}
                </div>


                {this.props.sections.length > 0 &&
                this.renderSections(this.props.sections)
                }

            </div> : <PreloaderComponent/>

        );
    }
}

const mapStateToProps = state => ({
    sections: state.sections.sections,
    showSectionForm: state.sections.showSectionForm,
    user: state.users.user,
    notifications: state.notifications.notifications,
    isLoading: state.isLoading.isLoading
});

const mapDispatchToProps = dispatch => ({
    onToggleSectionForm: () => dispatch(toggleSectionForm()),
    onFetchAllSection: () => dispatch(fetchAllSection()),
    fetchNotifications: () => dispatch(fetchNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminRoom));
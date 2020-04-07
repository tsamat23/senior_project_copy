import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import ListUsersFinishedSections
    from "../../../components/UI/Notifications/ListUsersFinishedSections/ListUsersFinishedSections";
import {filterNotifications} from "./functions";
import NoUsersFinishedSections from "../../../components/Messages/NoUsersFinishedSections/NoUsersFinishedSections";


const ListUsersFinishedSectionsContainer = (props) => {
    if (props.user && props.user.role !== 'admin') {
        return (
            <Redirect to='/sections'/>
        )
    } else if(!props.user) {
        return (
            <Redirect to='/sections' />
        )
    }

    const filteredNotifications = filterNotifications(props.notifications);
    return (
        <Fragment>
            {filteredNotifications.length > 0
                ? <ListUsersFinishedSections notifications={filteredNotifications}/>
                : <NoUsersFinishedSections/>
            }
        </Fragment>
    )
};

const mapStateToProps = state => ({
    notifications: state.admin.notifications,
    user: state.users.user
});

export default connect(mapStateToProps)(ListUsersFinishedSectionsContainer);
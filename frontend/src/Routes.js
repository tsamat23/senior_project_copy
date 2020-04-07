import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AdminRoom from "./containers/AdminRoom/AdminRoom";
import BlocksList from "./containers/AllBlocks/BlocksList";
import SectionsList from "./containers/AllSections/SectionsList";
import ChangePassword from './containers/ChangePassword/ChangePassword';
import Test from "./containers/ClientRoom/Questions/Test/Test";
import HorizontalLinearStepper from './containers/ClientRoom/QuestionsList/QuestionsList';
import CreatePsychologist from './containers/CreatePsychologist/CreatePsychologist';
import RateModal from "./containers/UI/Modals/RateModal/RateModal";
import UsersListContainer from "./containers/Users/UsersListContainer/UsersListContainer";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FullInfoUserContainer from "./containers/Users/FullInfoUserContainer/FullInfoUserContainer";
import MyReviews from "./containers/MyReviews/MyReviews";
import ListUsersFinishedSectionsContainer
    from "./containers/Notifications/ListUsersFinishedSectionsContainer/ListUsersFinishedSectionsContainer";
import FinishedSection from "./components/Sections/FinishedSection/FinishedSection";
import Contacts from './containers/Contacts/Contacts';
import PsychologistReviews from "./containers/PsychologistReviews/PsychologistReviews";
import ImportantNotifications from "./containers/AdminRoom/ImportantNotifications/ImportantNotifications";
import AboutUs from './containers/AboutUs/AboutUs';
import Results from "./containers/Results/Results";


const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/blocks" exact component={BlocksList}/>
            <Route exact path="/block/:id" render={(props) => <SectionsList {...props}/>} />
            <ProtectedRoute
                isAllowed={user && user.role === 'user'}
                exact
                path='/results'
                render={(props) => <Results {...props}/>}
            />
            <Route path='/aboutUs' exact component={AboutUs}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/admin" exact component={AdminRoom}/>
            {/*<Route path="/admin/users/finished-sections" exact component={ListUsersFinishedSectionsContainer}/>*/}
            <Route path="/sections/finished" exact component={FinishedSection}/>
            <ProtectedRoute
                isAllowed={user && user.role === 'admin'}
                exact
                path='/users'
                render={(props) => <UsersListContainer {...props}/>}
            />
            <ProtectedRoute
                isAllowed={user && user.role === 'admin'}
                exact
                path='/info/users/:id'
                render={(props) => <FullInfoUserContainer {...props}/>}
            />
            <Route path="/changePassword" component={ChangePassword}/>
            {/*<Route path='/importantNotifications' component={ImportantNotifications}/>*/}
            {/*<Route path="/reviews" component={MyReviews}/>*/}
            <Route path='/contacts' component={Contacts}/>
            {/*<Route path="/test" component={Test}/>*/}
            <Route path="/questions/" component={HorizontalLinearStepper}/>
            {/*<ProtectedRoute*/}
            {/*    isAllowed={user && user.role === 'admin'}*/}
            {/*    exact*/}
            {/*    path='/addPsychologist'*/}
            {/*    render={(props) => <CreatePsychologist {...props}/>}*/}
            {/*/>*/}
            {/*<ProtectedRoute*/}
            {/*    isAllowed={user && user.role === 'admin'}*/}
            {/*    exact*/}
            {/*    path='/psychologist/:id'*/}
            {/*    render={(props) => <PsychologistReviews {...props}/>}*/}
            {/*/>*/}
            {/*<Route path="/rate" component={RateModal}/>*/}
            <Route path="/" component={BlocksList}/>
        </Switch>
    )
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

export default withRouter(connect(mapStateToProps)(Routes));
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import usersReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import blocksReducer from "./reducers/blocksReducer";
import sectionsReducer from "./reducers/sectionsReducer";
import questionsReducer from './reducers/questionsReducer';
import resultsReducer from "./reducers/resultsReducer";
import psychologistsReducer from './reducers/psychologistsReducer';
import notificationsReducer from './reducers/notificationsReducer';
import reviewsReducer from './reducers/reviewsReducer';
import isLoadingReducer from './reducers/isLoadingReducer';
import contactsReducer from './reducers/contactsReducer';
import {saveState, loadState} from "./localStorage";


const rootReducer = combineReducers({
    users: usersReducer,
    admin: adminReducer,
    blocks: blocksReducer,
    sections: sectionsReducer,
    questions: questionsReducer,
    results: resultsReducer,
    psycho: psychologistsReducer,
    notifications: notificationsReducer,
    reviews: reviewsReducer,
    contacts: contactsReducer,
    isLoading: isLoadingReducer
});

export const history = createHistory();

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveState({
        users: store.getState().users
    });
});

export default store;
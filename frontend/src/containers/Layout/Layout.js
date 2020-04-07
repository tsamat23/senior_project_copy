import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/UI/Toolbar/Toolbar";
import { logoutUser } from "../../store/actions/userActions";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { push } from "react-router-redux";

import "./Layout.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import {
	fetchNotificationsAdmin,
	unactiveNotifications,
	fetchNotifications,
} from "../../store/actions/adminActions";
import Footer from "../../components/UI/Footer/Footer";
import { countActiveNotifications } from "./functions";
import { getUserNotifications } from "../../store/actions/reviewsActions";

const theme = createMuiTheme({
	typography: {
		fontSize: 16,
		htmlFontSize: 14,
		fontFamily: ["Comfortaa", "cursive"],
	},
	palette: {
		primary: {
			light: "#895391",
			main: "#65446d",
			dark: "#895391",
			contrastText: "#fff",
		},
		secondary: {
			light: "#A5D6A7",
			main: "#ff7884",
			dark: "#2E7D32",
			contrastText: "#e2e2e2",
		},
	},
});

class Layout extends Component {
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	// componentDidUpdate() {
	// 	const { user, fetchNotificationsAdmin } = this.props;
	//
	// 	!user && clearInterval(this.interval);
	//
	// 	if (user && user.role === "admin") {
	// 		clearInterval(this.interval);
	// 		this.interval = setInterval(() => {
	// 			fetchNotificationsAdmin();
	// 			this.props.fetchNotifications();
	// 		}, 60000);
	// 	}
	//
	// 	if (user && user.role === "user") {
	// 		clearInterval(this.interval);
	// 		this.interval = setInterval(
	// 			() => this.props.getUserNotifications(),
	// 			120000
	// 		);
	// 	}
	// }

	// componentDidMount() {
	// 	const { user } = this.props;
	// 	if (user && user.role === "admin") {
	// 		this.props.fetchNotificationsAdmin();
	// 	}
	// 	if (user && this.props.user.role === "user") {
	// 		this.props.getUserNotifications();
	// 	}
	// 	if (user && this.props.user.role === "admin") {
	// 		this.props.fetchNotifications();
	// 	}
	// }

	unactiveNotificationsHandler = () => {
		const { notifications, unactiveNotifications } = this.props;
		const notificationsIds = notifications.map(
			notification => notification._id
		);
		unactiveNotifications(notificationsIds);
	};

	render() {
		const { route, user, logout, children, notifications } = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				<div
					className="layout"
					style={{ width: window.innerWidth, height: window.innerHeight }}
				>
					<header>
						<Toolbar
							route={route}
							user={user}
							logout={logout}
							doUnactive={this.unactiveNotificationsHandler}
							amount={countActiveNotifications(notifications)}
						/>
					</header>
					<main className="container">{children}</main>

					<NotificationContainer />
					<Footer />
				</div>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	user: state.users.user,
	notifications: state.admin.notifications,
	reviewNotifications: state.reviews.notifications,
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutUser()),
	route: path => dispatch(push(path)),
	fetchNotificationsAdmin: () => dispatch(fetchNotificationsAdmin()),
	getUserNotifications: () => dispatch(getUserNotifications()),
	unactiveNotifications: notificationsIds =>
		dispatch(unactiveNotifications(notificationsIds)),
	fetchNotifications: () => dispatch(fetchNotifications()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);

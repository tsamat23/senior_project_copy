import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = {
    root: {
        width: "100%",
        height: '80px',
        padding: '10px 0',
        margin: "50px 0 0 0",
        display: 'block',
        textAlign: 'center'
    },
};

const theme = createMuiTheme({
    typography: {
        fontSize: 16,
        htmlFontSize: 14,
        fontFamily: ['Comfortaa', 'cursive'],
    },
    palette: {
        primary: {
            light: '#895391',
            main: '#65446d',
            dark: '#895391',
            contrastText: '#fff',
        },
        secondary: {
            light: '#A5D6A7',
            main: '#5f5f5f',
            dark: '#2E7D32',
            contrastText: '#65446d',
        },
    }
});

class Footer extends React.Component {
    state = {
        value: "",
        openInfo: false,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };


    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <BottomNavigation
                    style={{background: '#65446d', opacity: 0.8}}
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                >
                </BottomNavigation>
            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(Footer);
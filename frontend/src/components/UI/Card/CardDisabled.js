import React from 'react';
import Card from '@material-ui/core/Card';
import withStyles from "@material-ui/core/styles/withStyles";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";


const styles = {

    container: {
        width: '20%'
    },
    card: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        marginTop: '20px',
        height: '438px'
    },
    cardHeader: {
        "@global" : {
            "div > span" : {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '220px',
                fontSize: '20px',
                whiteSpace: 'nowrap',
            }
        },
        width: '95%',
        marginTop: '10px',
        overflow: 'hidden',
        padding: '10px 0',
        textAlign: 'center',
        margin: 'auto'
    },
    media: {
        marginTop: '25%',
        height: 0,
        paddingTop: '100%', // 16:9
        backgroundSize: 'contain'
    },
    title: {
        fontWeight: '500',
        fontSize: "20px",
        textAlign: 'center',
        marginTop: '25%'
    },
    text: {
        htmlFontSize: '14px'
    },
};

const theme = createMuiTheme({
    typography: {
        fontSize: 30,
        htmlFontSize: 12,
        fontFamily: ['Comfortaa', 'cursive'],
    }
});

function Cards(props) {
    const {classes} = props;
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.container}>
                <Tooltip style={classes.text} title='Эта секция станет доступной после прохождения предыдущей секции'>
                    <Card className={classes.card}>
                        <Tooltip
                            title={props.title}
                            placement="left-start"
                        >
                            <div>
                            <CardHeader
                                component="div"
                                className={classes.cardHeader}
                                title={props.title}
                            />
                            </div>
                        </Tooltip>
                        <CardMedia
                            className={classes.media}
                            image="https://cdn4.iconfinder.com/data/icons/basic-ui-elements/700/09_lock-512.png"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                        </CardContent>
                        <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                        </CardActions>
                    </Card>
                </Tooltip>
            </div>
        </MuiThemeProvider>
    );
}


export default withStyles(styles)(Cards);
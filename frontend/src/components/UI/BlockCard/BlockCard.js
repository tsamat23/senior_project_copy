import React from 'react';
import Rating from 'react-rating';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import greyStar from '../../../assets/images/grey-star.jpg.png';
import yellowStar from '../../../assets/images/yellow-star.png';
import config from '../../../config';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {Image} from "react-bootstrap";
import Modal from "../Modals/Modal/Modal";

const styles = {
    container: {
        marginTop: '30px',
        width: '30%',
        padding: '10px 10px'
    },
    card: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        marginTop: '20px',
        height: '550px',
    },
    cardHeader: {
        "@global" : {
            "div > span" : {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '300px',
                fontSize: '20px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
            }
        },
        width: '95%',
        marginTop: '0px',
        overflow: 'hidden',
        padding: '10px 0',
        textAlign: 'center',
        margin: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '90%', // 16:9
        backgroundSize: 'contain'
    },
    title: {
        fontWeight: '500',
        fontSize: '20px',
        margin: 0
    },
    text: {
        fontSize: '13px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '300px',
        // fontSize: '20px',
        whiteSpace: 'nowrap',
        margin: '20px 0px'
    },
    button: {
        marginBottom: '30px',
        fontSize: '15px',
        width: '100%'
    }
};

const theme = createMuiTheme({
    typography: {
        fontSize: 30,
        htmlFontSize: 15,
        fontFamily: ['Comfortaa', 'cursive'],
    }
});

const BlockCards = (props) => {

    const {classes} = props;
    const defUrl = `${config.imageUrl}/default.jpg`;
    const url = `${config.imageUrl}/${props.image}`;

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <Tooltip
                        className={classes.tooltip}
                        placement="bottom"
                        title={props.title}>
                        <div style={{margin: '0 auto', padding: '0px'}}>
                            <CardHeader
                                component="div"
                                className={classes.cardHeader}
                                title={props.title}
                            />
                        </div>
                    </Tooltip>
                    <CardMedia
                        className={classes.media}
                        image={props.image !== "" ? url : defUrl}
                        // title="Contemplative Reptile"
                    />
                    <Tooltip
                        className={classes.tooltip}
                        placement="left-start"
                        title={props.description}>
                    <CardContent>
                        <Typography className={classes.text} component="p">
                            {props.description}
                        </Typography>
                    </CardContent>
                    </Tooltip>
                    {/*<CardContent>*/}
                    {/*    <Typography className={classes.text} component="p">*/}
                    {/*        Кол-во людей прошедших секцию: {props.passedAmount}*/}
                    {/*    </Typography>*/}
                    {/*</CardContent>*/}
                    <CardActions style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
                        <Button onClick={props.click} className={classes.button} size="medium" color="primary">
                            Пройти в блок
                        </Button>
                    </CardActions>
                    {/*{props.user ? <CardActions style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>*/}
                    {/*    <Button onClick={props.clickModal} className={classes.button} size="medium" color="primary">*/}
                    {/*        Подробнее*/}
                    {/*    </Button>*/}
                    {/*</CardActions> : null}*/}
                </Card>
            </div>
        </MuiThemeProvider>
    );
};


export default withStyles(styles)(BlockCards);
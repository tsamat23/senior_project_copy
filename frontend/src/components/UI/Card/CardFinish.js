import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from 'react-rating';
import Alarm from '@material-ui/icons/Alarm';
import greyStar from '../../../assets/images/grey-star.jpg.png'
import yellowStar from '../../../assets/images/yellow-star.png'
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

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
        height: 0,
        paddingTop: '90%', // 16:9
        backgroundSize: 'contain'
    },
    title: {
        fontWeight: '500',
        // fontSize: '20px',
        fontSize: '13px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '300px',
        // fontSize: '20px',
        whiteSpace: 'nowrap',
        margin: '20px 0px'
    },
    text: {
        fontSize: '14px'
    }
};

const theme = createMuiTheme({
    typography: {
        fontSize: 30,
        htmlFontSize: 12,
        fontFamily: ['Comfortaa', 'cursive'],
    }
});


function CardFinish(props) {
    const {classes} = props;

    const ratingChanged = (newRating) => {
        console.log(newRating)
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <Tooltip
                        className={classes.tooltip}
                        placement="bottom"
                        title={props.title}>
                        <div style={{margin: '0 auto', padding: '0'}}>
                        <CardHeader
                            component="div"
                            className={classes.cardHeader}
                            title={props.title}
                        />
                        </div>
                    </Tooltip>
                    <CardMedia
                        className={classes.media}
                        image="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Ok_check_yes_tick_accept_success_green_correct.png"
                        // title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.text} component="p">
                            Вы уже прошли эту секцию!
                        </Typography>
                        {/*<Typography className={classes.text} variant="caption">*/}
                        {/*    Вы сможете повторно пройти секцию через:*/}
                        {/*</Typography>*/}
                        {/*<div style={{alignSelf: 'flex-start'}}>*/}
                        {/*    <Alarm/>*/}
                        {/*    <span style={{verticalAlign: "5px", padding: '10px'}}>28 дней</span>*/}
                        {/*</div>*/}
                    </CardContent>
                    {/*<CardActions style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>*/}
                    {/*    <Rating*/}
                    {/*        style={{padding: '8px 3px 8px 15px'}}*/}
                    {/*        initialRating={props.rate}*/}
                    {/*        readonly="true"*/}
                    {/*        emptySymbol={<img src={greyStar} alt=""/>}*/}
                    {/*        fullSymbol={<img src={yellowStar} alt=""/>}*/}
                    {/*    />*/}
                    {/*</CardActions>*/}
                </Card>
            </div>
        </MuiThemeProvider>
    );
}


export default withStyles(styles)(CardFinish);
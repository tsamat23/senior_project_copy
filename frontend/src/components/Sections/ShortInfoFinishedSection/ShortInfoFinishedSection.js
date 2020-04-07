import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import Unknown from '../../../assets/images/section-no-image.png';


const styles = theme => ({
    card: {
        width: '80%',
        alignSelf: 'center',
    },
    media: {
        height: 0,
    },
    title: {
        textAlign: 'center',
        fontSize: '35px',
        margin: 0
    }
});

const ShortInfoFinishedSection = ({classes, title}) => (
    <Card className={classes.card}>
        <CardMedia
            className={classes.media}
            title="Contemplative Reptile"
        />
        <CardContent>
            <Typography className={classes.title} gutterBottom variant="headline" component="h2">
                {title && title}
            </Typography>
        </CardContent>
    </Card>
);

export default withStyles(styles)(ShortInfoFinishedSection);
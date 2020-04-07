import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import AnswersOfQuestion from "../../Questions/AnswersOfQuestion/AnswersOfQuestion";


const styles = ({
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
    },
    typo: {
        marginTop: '10px',
        fontSize: '20px'
    }
});

const FullInfoFinishedSection = ({classes, data}) => {
    return <Paper className={classes.contentBox}>
        <Typography className={classes.typo} align='center' variant='title'>
            Вопросы и ответы
        </Typography>
        <AnswersOfQuestion data={data && data}/>
    </Paper>
};

export default withStyles(styles)(FullInfoFinishedSection)
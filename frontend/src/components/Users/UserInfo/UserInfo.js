import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = ({
    content: {
        margin: '0 auto',
    },
    contentBox: {
        paddingTop: '20px',
        marginBottom: '20px',
        width: '80%',
    },
    infoBlock: {
        width: '80%',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '15px',
        paddingBottom: '10px'
    },
    typo: {
        fontSize: '14px',
        marginBottom: '10px'
    }
});

const UserInfo = ({classes, displayName, email}) => (
    <Fragment className={classes.contentBox}>
        <Typography align='center' variant='title'>
            Информация пользователя
        </Typography>
        <div className={classes.infoBlock}>
            <Typography className={classes.typo}>
                Имя: {displayName}
            </Typography>

            <Typography className={classes.typo}>
                Email: {email}
            </Typography>
        </div>
    </Fragment>

);

export default withStyles(styles)(UserInfo);
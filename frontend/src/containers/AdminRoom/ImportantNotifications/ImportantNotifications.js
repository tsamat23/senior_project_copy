import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router-dom'
import {getImportantUsers} from "../../../store/actions/adminActions";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class ImportantNotifications extends Component {

    componentDidMount() {
        this.props.getImportantUsers();
    }

    render() {

        if(!this.props.user || this.props.user.role !== 'admin') {
            return <Redirect to="/login"/>
        }

        const { classes } = this.props;
        return (
            <Fragment>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Вопрос</TableCell>
                                <TableCell>Ответ</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.importantUsers && this.props.importantUsers.map((data, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{data.user.displayName}</TableCell>
                                        <TableCell>{data.questionId.title}</TableCell>
                                        {data.answer > 1 ? data.answer.map((answer) => {
                                            return <TableCell>{answer}</TableCell>
                                        }) : <TableCell>{data.answer[0]}</TableCell>}
                                        <TableCell>{data.user.email}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        importantUsers: state.admin.importantUsers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getImportantUsers: () => dispatch(getImportantUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImportantNotifications));
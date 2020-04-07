import React, {Component} from 'react';
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import Table from "../../../../node_modules/@material-ui/core/Table/Table";
import TableHead from "../../../../node_modules/@material-ui/core/TableHead/TableHead";
import TableRow from "../../../../node_modules/@material-ui/core/TableRow/TableRow";
import TableCell from "../../../../node_modules/@material-ui/core/TableCell/TableCell";
import TableBody from "../../../../node_modules/@material-ui/core/TableBody/TableBody";
import withStyles from "../../../../node_modules/@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        display: 'flex',
      marginBottom: '20px'
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    title: {
        fontSize: '20px'
    },
    tableText: {
        fontSize: '13px'
    }
});

class TestAnswers extends Component {

    render () {
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.title}>{this.props.answer.questionId.title ? this.props.answer.questionId.title : this.props.title}</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableText}>Вопрос</TableCell>
                        <TableCell numeric className={classes.tableText}>Ответ</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.answer.body.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell component="th" scope="row" className={classes.tableText}>{n.body}</TableCell>
                                <TableCell numeric className={classes.tableText}>{n.answer}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}
}

TestAnswers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestAnswers);
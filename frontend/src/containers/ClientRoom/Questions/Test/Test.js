import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableHead from '@material-ui/core/TableHead';
import TestQuestion from './TestQuestion';
import TablePaginationActionsWrapped from "../../../../components/UI/TablePaginationActions/TablePaginationActions";
import Button from "@material-ui/core/Button/Button";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import ShowAnalysedTestResultsModal from "./ShowAnalysedTestResultsModal";


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common,
        color: theme.palette.common,
    },
    body: {
        fontWeight: "bold"
    },
    textAlign: 'center'
}))(TableCell);


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    radioSize: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

class CustomPaginationActionsTable extends React.Component {
    state = {
        data: [],
        page: 0,
        rowsPerPage: 5,
        open: false,
        testResults: [],
        openTestResults: false
    };

    componentDidMount() {
        const cachedData = localStorage.getItem(this.props.questionId);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            this.setState({data});
        } else {
            this.setState({data: this.props.data});
        }

    }

    handleClick = (event, id) => {
        const selectedId = this.state.data.findIndex(elem => elem.id === id);
        const data = [...this.state.data];
        data[selectedId].answer = event.target.value;

        this.setState({data});
        localStorage.setItem(this.props.questionId, JSON.stringify(data));
        this.props.handleClick(data, this.props.questionId, this.props.type, this.props.title);
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    checkForEmptyFields = () => {
        const hasEmptyFields = this.state.data.some(item => !item.answer);
        if (hasEmptyFields) {
            this.handleClickOpen();
        } else {
            this.showTestResults();
        }
    };

    showTestResults = () => {
        this.props.analyseTestResults(this.state.data);
        this.setState({testResults: this.props.testResults});
        this.handleTestResultsOpen();
    };

    handleTestResultsOpen = () => {
        this.setState(prevState => ({openTestResults: !prevState.openTestResults}));
    };



    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Вопрос</CustomTableCell>
                                <CustomTableCell>Верно</CustomTableCell>
                                <CustomTableCell>Скорее верно, чем неверно</CustomTableCell>
                                <CustomTableCell>Скорее неверно, чем верно</CustomTableCell>
                                <CustomTableCell>Неверно</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TestQuestion
                                        key={n.id}
                                        classes={this.props.classes.tableCell}
                                        question={n}
                                        id={n.id}
                                        name={n.body}
                                        handleChange={(event) => this.handleClick(event, n.id)}
                                    />
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 48 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={this.props.data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                                <div className={classes.buttonsContainer}>
                                    <Tooltip TransitionComponent={Zoom}
                                             title="Проанализировать ваши данные"
                                             placement="top"
                                    >
                                        <Button
                                            variant="contained" color="primary"
                                            className={classes.button}
                                            onClick={this.checkForEmptyFields}
                                        >
                                            Проанализировать
                                        </Button>
                                    </Tooltip>

                                </div>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                <ShowAnalysedTestResultsModal
                    open={this.state.openTestResults}
                    testResults={this.props.testResults}
                    handleTestResultsOpen={this.handleTestResultsOpen}
                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Перед анализом ваших данных все поля теста должны быть заполнены. Пожалуйста, ответьте на
                            все вопросы. Спасибо )
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Хорошо :)
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CustomPaginationActionsTable);
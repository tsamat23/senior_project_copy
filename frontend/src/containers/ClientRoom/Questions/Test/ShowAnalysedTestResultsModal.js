import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from "@material-ui/core/Table/Table";
import Paper from "@material-ui/core/Paper/Paper";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {CSVLink} from 'react-csv';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShowAnalysedTestResultsModal extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.setState({open: this.props.open});
  }

  classes = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

  render() {
    const classes = this.classes;
    const headers = [
      {label: 'Название шкалы', key: 'title'},
      {label: 'Количество баллов', key: 'score'},
      {label: 'Интерпретация', key: 'interpretation'},
    ];
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleTestResultsOpen}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Анализ ваших ответов на тест. "}
          </DialogTitle>
          <DialogContent>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Название шкалы</TableCell>
                    <TableCell numeric>Количество баллов</TableCell>
                    <TableCell>Интерпретация</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.testResults.map((n, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {n.title}
                        </TableCell>
                        <TableCell numeric>{n.score}</TableCell>
                        <TableCell>{n.interpretation}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button>
              <CSVLink data={this.props.testResults} headers={headers}>
                Сохранить к себе
              </CSVLink>
            </Button>
            <Button onClick={this.props.handleTestResultsOpen} color="primary">
              Хорошо
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ShowAnalysedTestResultsModal;
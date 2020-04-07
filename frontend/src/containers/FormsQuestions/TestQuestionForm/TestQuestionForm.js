import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles from "../../../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "../../AdminRoom/AddingSection/addingSectionStyles-material-ui";
import TestDb from './TestDb.png';
import './TestQuestionForm.css';
import {Alert} from "react-bootstrap";

class TestQuestionForm extends Component {

    state = {
        input: ''
    };

    render() {
        const {classes} = this.props;
        let input = '';
        return (
            <form className={classes.container} onSubmit={this.props.addTest}>
                <DialogTitle>
                    Выберите файл в формате csv
                </DialogTitle>
                <DialogContent>
                    <div className="ExplanationBox">
                        <DialogContentText
                            margin="dense"
                        >
                            В файле должна быть таблица из одной колонки вопросов. В первой строке должно быть название
                            колонки –– body. Примерно так:

                            <label htmlFor="flat-button-file">
                                <Button
                                    variant="contained"
                                    component="file"
                                >
                                    Выберите файл формата csv
                                </Button>
                            </label>
                            <input
                                id="flat-button-file"
                                multiple
                                type="file"
                                accept=".csv"
                                name={'data'}
                                onChange={(event) => {
                                    this.props.fileChangeHandler(event);
                                    input = event.target.value;
                                    this.setState({input})
                                }}
                                required={true}
                            />
                            {this.state.input
                                ? <Alert bsStyle="success">Вы выбрали файл! Спасибо)</Alert>
                                : <Alert bsStyle="danger">Выберите файл!</Alert>}
                        </DialogContentText>
                        <img src={TestDb} alt={'Пример загружаемого файла'}/>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        disabled={!this.state.input}
                    >
                        Далее
                    </Button>
                </DialogActions>
            </form>
        )
    }
}

export default withStyles(styles)(TestQuestionForm);

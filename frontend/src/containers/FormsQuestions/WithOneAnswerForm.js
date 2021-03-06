import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import withStyles from "@material-ui/core/styles/withStyles";

import {styles} from "../AdminRoom/AddingSection/addingSectionStyles-material-ui";
import {connect} from "react-redux";
import {addQuestion} from "../../store/actions/questionActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';

class WithOneAnswerForm extends Component {

  state = {
    title: '',
    isAddingOption: false,
    optionText: '',
    options: []
  };

  isAddingOption = () => {
    this.setState({isAddingOption: true});
  };

  addOptionHandler = () => {
    if (this.state.optionText.length > 0) {
      const optionsCopy = [...this.state.options];
      optionsCopy.push(this.state.optionText);

      this.setState({
        options: optionsCopy,
        optionText: ''
      });
    }
  };

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  addQuestionHandler = event => {
    event.preventDefault();

    if (this.state.title.length > 0 && this.state.options.length > 0) {
      const data = {
        sectionId: this.props.sectionId,
        title: this.state.title,
        type: this.props.questionType,
        data: this.state.options
      };

      this.props.onAddQuestion(data);
      this.props.closed();
    }
  };


  render() {
    const { classes } = this.props;

    return(
      <div>
        <Dialog
          open={this.props.show}
          onClose={this.props.closed}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Форма добавления вопроса с одним вариантом ответа</DialogTitle>
          <form className={classes.container} onSubmit={this.addQuestionHandler}>
            <DialogContent className={classes.DialogContent}>
              <DialogContentText>
                Введите текст вопроса
              </DialogContentText>
              <TextField
                autoFocus
                required={true}
                margin="dense"
                id="title"
                name='title'
                type="text"
                fullWidth
                value={this.state.title}
                onChange={this.inputChangeHandler}
              />
              <Button variant="contained"
                      size='small'
                      className={classes.button}
                      onClick={this.isAddingOption}
              >
                Добавить вариант
              </Button>
              {this.state.isAddingOption &&
                <div>
                  <TextField
                    id="optionText"
                    label="Текст варианта"
                    name="optionText"
                    value={this.state.optionText}
                    onChange={this.inputChangeHandler}
                    margin="normal"
                  />
                    <IconButton
                        id="addOption"
                        onClick={this.addOptionHandler}
                        type='button'
                        className={classes.buttonIcon}
                        variant="fab"
                        color="primary"
                        aria-label="add"
                      >
                      <Icon
                          className={classNames(classes.iconHover, 'fa fa-plus-circle')}
                          color="error"
                          style={{ fontSize: 45 }}
                      />
                    </IconButton>

                </div>
              }
              {this.state.options.length > 0 &&
                <div className={classes.root}>
                  <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">Варианты ответов</FormLabel>
                    <RadioGroup
                      aria-label="selectedOption"
                      name="selectedOption"
                      className={classes.group}
                    >
                    {this.state.options.map(option => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio color="primary"/>}
                          label={option}
                        />
                      ))
                    }
                    </RadioGroup>
                  </FormControl>
                </div>
              }

            </DialogContent>

            <DialogActions>
                <IconButton
                  id="addQuestion"
                  type='submit'
                  className={classes.buttonIcon}
                  variant="fab"
                  color="primary"
                  aria-label="add"
                >
                    <Icon
                      className={classNames(classes.iconHover, 'far fa-check-circle')}
                      color="error"
                      style={{ fontSize: 45 }}
                    />
                </IconButton>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddQuestion: data => dispatch(addQuestion(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(WithOneAnswerForm));
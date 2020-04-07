import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    radioButton: {
        display: "flex",
        justifyContent: 'center'
    }
});

class TestQuestion extends React.Component {
    state = {
        value: 'female',
    };

    render() {
        const { classes } = this.props;

        return (
            <TableRow
                key={this.props.id}
                hover
                role="radio"
                aria-checked="false"
                tabIndex={-1}
            >
                <TableCell component="th" scope="row">
                    {this.props.name}
                </TableCell>
                <TableCell>
                    <Radio
                        checked={this.props.question.answer === 'Верно'}
                        onChange={event => this.props.handleChange(event, this.props.id)}
                        value="Верно"
                        aria-label="Верно"
                        color="default"
                        className={classes.radioButton}
                        icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                        checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                    />
                </TableCell>
                <TableCell >
                    <Radio
                        checked={this.props.question.answer === 'Скорее верно, чем неверно'}
                        onChange={event => this.props.handleChange(event, this.props.id)}
                        value="Скорее верно, чем неверно"
                        aria-label="Скорее верно, чем неверно"
                        color="default"
                        className={classes.radioButton}
                        icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                        checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                    />
                </TableCell>
                <TableCell>
                    <Radio
                        checked={this.props.question.answer === 'Скорее неверно, чем верно'}
                        onChange={event => this.props.handleChange(event, this.props.id)}
                        value="Скорее неверно, чем верно"
                        aria-label="Скорее неверно, чем верно"
                        color="default"
                        className={classes.radioSize}
                        icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                        checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                    />
                </TableCell>
                <TableCell>
                    <Radio
                        checked={this.props.question.answer === 'Неверно'}
                        onChange={event => this.props.handleChange(event, this.props.id)}
                        value="Неверно"
                        color="default"
                        aria-label="Неверно"
                        className={ classes.radioSize}
                        icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                        checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                    />
                </TableCell>
            </TableRow>
        );
    }
}

TestQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestQuestion);
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import UserInfo from "../../Users/UserInfo/UserInfo";
import ShortInfoFinishedSection from "../ShortInfoFinishedSection/ShortInfoFinishedSection";
import FullInfoFinishedSection from "../FullInfoFinishedSection/FullInfoFinishedSection";
import {getFinishedSection} from "../../../store/actions/sectionActions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {sendReview} from "../../../store/actions/reviewsActions";
import {Redirect} from 'react-router-dom';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px'
    },
    divider: {
        marginBottom: '12px'
    },
    title: {
        marginBottom: '12px'
    },
    sendReviewButton: {
        width: '30%',
        fontSize: '16px'
    },
    fieldReview: {
        width: '80%',
        marginBottom: '20px',
        paddingTop: '40px'
    }
});

class FinishedSection extends Component {

    state = {
        reviewText: ''
    };

    componentDidMount() {
        const paramsString = this.props.location.search;
        const searchParams = new URLSearchParams(paramsString);
        const userId = searchParams.get('userId');
        const sectionId = searchParams.get('sectionId');
        this.props.getFinishedSection(userId, sectionId);
    }

    textAreaChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    sendReviewHandler = (userId, sectionId) => {
        const reviewData = {
            userId,
            sectionId,
            review: this.state.reviewText,
            author: this.props.author._id
        };
        if (this.state.reviewText.length > 0) {
          this.props.sendReview(reviewData);
        }
    };

    render() {

        if(this.props.user && this.props.author.role !== 'admin') {
            return (
                <Redirect to='/sections' />
            )
        }

        const {classes, section} = this.props;
      console.log(section);
      return (
            <Paper className={classes.root} elevation={1}>
                <ShortInfoFinishedSection
                    title={section && section.title}
                />
                <div className={classes.content}>
                    <UserInfo
                        displayName={section && section.answers[0].userId.displayName}
                        email={section && section.answers[0].userId.email}
                    />
                    <FullInfoFinishedSection
                      data={section && section.answers}
                    />
                    <TextField
                        multiline
                        className={classes.fieldReview}
                        placeholder='Введите текст рецензии'
                        value={this.state.reviewText}
                        name="reviewText"
                        onChange={this.textAreaChangeHandler}
                    />
                    <Button
                        variant="outlined"
                        className={classes.sendReviewButton}
                        onClick={() => this.sendReviewHandler(section.answers[0].userId._id, section._id)}
                    >
                        Отправить рецензию
                    </Button>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        section: state.sections.finishedSection,
        author: state.users.user
    }
};

const mapDispatchToProps = dispatch => ({
    getFinishedSection: (userId, sectionId) => dispatch(getFinishedSection(userId, sectionId)),
    sendReview: reviewData => dispatch(sendReview(reviewData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FinishedSection));
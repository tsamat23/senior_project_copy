import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import ReviewListItem from "../../components/ReviewListItem/ReviewListItem";
import Paper from "../../components/UI/Paper/Paper";
import {fetchPsychologistReviews} from "../../store/actions/reviewsActions";

class PsychologistReviews extends Component {

    componentDidMount() {
        this.props.onFetchPsychologistReviews(this.props.match.params.id);
    }

    render() {
        console.log(this.props.psychologistReviews);
        return (
            <Fragment>
                {this.props.psychologistReviews.length > 0 ?
                    this.props.psychologistReviews.map(review => (
                        <ReviewListItem
                            key={review._id}
                            title={review.sectionId.title}
                            image={review.sectionId.image}
                            description={review.sectionId.description}
                            author={review.author.displayName}
                            user={review.userId.displayName}
                            review={review.review}
                        />
                    ))
                    :
                    <Paper
                        header="У данного психолога нет рецензии"
                        text="Данный психолог не написал ни одной рецензии"
                    />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    psychologistReviews: state.reviews.psychologistReviews
});

const mapDispatchToProps = dispatch => ({
    onFetchPsychologistReviews: id => dispatch(fetchPsychologistReviews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PsychologistReviews);
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import ReviewListItem from '../../components/ReviewListItem/ReviewListItem';
import Paper from "../../components/UI/Paper/Paper";
import {fetchAllReviews} from "../../store/actions/reviewsActions";
import './MyReviews.css';

class MyReviews extends Component {

    componentDidMount() {
        this.props.onFetchAllReviews();
    }

    render() {
        return (
            <div className='reviews'>
                {this.props.reviews.length > 0 ?
                    this.props.reviews.map(review => (
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
                        header="У вас нет рецензии"
                        text="Пройдите хотя бы одну секцию, чтобы получить рецензию"
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reviews: state.reviews.reviews
});

const mapDispatchToProps = dispatch => ({
    onFetchAllReviews: () => dispatch(fetchAllReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
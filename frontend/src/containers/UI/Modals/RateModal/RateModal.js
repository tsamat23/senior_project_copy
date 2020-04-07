import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, FormControl, Modal} from "react-bootstrap";
import Rating from 'react-rating';


import {sendRating} from "../../../../store/actions/sectionActions";
import {notifyAdmin} from "../../../../store/actions/adminActions";
import greyStar from '../../../../assets/images/grey-star.jpg.png';
import yellowStar from '../../../../assets/images/yellow-star.png';
import ShareInSocials from '../../../../components/UI/ShareButtons/ShareInSocials';

class RateModal extends Component {

    state = {
        comment: '',
        rate: 0
    };

    sendDataHandler = () => {
        const {notifyAdmin, userId, sectionId, onSendRating} = this.props;
        const {rate, comment} = this.state;

        const ratingData = {
            userId: userId,
            rate: rate,
            comment: comment
        };

        notifyAdmin(sectionId);

        this.props.onSendRating(ratingData, sectionId);
    };

    checkState = () => {
        if(this.state.comment.length <= 0) {
            return true
        } else {
            return false
        }

    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    setRating = value => {
        this.setState({rate: value});
    };

    render() {
        const {comment, rate} = this.state;
        console.log(this.props);

        return (
            <Modal
                {...this.props}
                bsSize="small"
                aria-labelledby="contained-modal-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Поздравляем с завершением секции!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: 'center', marginBottom: '20px'}}>
                        Вы молодец! Вы успешно завершили секцию
                    </p>
                    <FormControl
                        bsSize="lg"
                        componentClass="textarea"
                        type="text"
                        name="comment"
                        placeholder="Ваш комментарий"
                        value={comment}
                        onChange={(event) => this.inputChangeHandler(event)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{marginBottom: '10px'}}>Оцените пожалуйста секцию</span>
                        <Rating
                            onChange={(value) => {
                                this.setRating(value)
                            }}
                            initialRating={rate}
                            emptySymbol={<img src={greyStar} alt=""/>}
                            fullSymbol={<img src={yellowStar} alt=""/>}
                        />
                        <Button
                            onClick={this.sendDataHandler}
                            style={{marginTop: '20px'}}
                            // disabled={this.checkState()}
                        >
                            Далее
                        </Button>
                        {/*<p style={{marginTop: '15px', marginBottom: '10px'}}>Поделиться в социальных сетях</p>*/}
                        {/*<ShareInSocials/>*/}
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSendRating: (ratingData, sectionId) => dispatch(sendRating(ratingData, sectionId)),
    notifyAdmin: sectionId => dispatch(notifyAdmin(sectionId))
});

export default connect(null, mapDispatchToProps)(RateModal);
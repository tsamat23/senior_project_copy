import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";

import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';

import {fetchAllSection} from "../../store/actions/sectionActions";
import {getBlockById} from "../../store/actions/blocksActions";
import Card from "../../components/UI/Card/Card";
import CardFinish from "../../components/UI/Card/CardFinish";
import CardDisabled from "../../components/UI/Card/CardDisabled";
import Modal from '../../components/UI/Modals/Modal/Modal';
import Typography from "@material-ui/core/Typography/Typography";
import Rating from "react-rating";
import greyStar from "../../assets/images/grey-star.jpg.png";
import yellowStar from "../../assets/images/yellow-star.png";
import {Image} from 'react-bootstrap';
import config from "../../config";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: "auto",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    text: {
        fontSize: '14px'
    },
    div: {
        overflow: 'hidden'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    description: {
        fontSize: '17px'
    }
});


class SectionsList extends Component {

    state = {
        aboutUsModalIsOpen: true,
        show: false
    };

    handleAboutUsModalChange = () => {
        this.setState(prevState => ({aboutUsModalIsOpen: !prevState.aboutUsModalIsOpen}));
        localStorage.setItem('firstVisit', 'false');
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onGetBlockById(id);
    };

    cardHandlerClicked = (id) => {
        if (this.props.user) {
            this.props.route(`/questions?id=${id}`)
        } else {
            this.props.route('/register')
        }
    };

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };

    render() {

        const {classes} = this.props;
        const defUrl = `${config.imageUrl}/default.jpg`;

        const CardsFromUser = () => {
            return (
                this.props.block.sections.map((section, id) => {
                    console.log(section);
                    if (this.props.user && this.props.user.sections && this.props.user.sections.includes(section._id)) {
                        return (
                            <CardFinish rate={section.averageRating} key={section._id} title={section.title}
                                        description={section.description}/>
                        )
                    }
                    // if (this.props.user && this.props.user.sections && this.props.user.sections.length < id) {
                    //     return (
                    //         <CardDisabled key={section._id} title={section.title} description={section.description}/>
                    //
                    //     )
                    // }
                    else {
                        return (
                            <Fragment>
                                <Card image={section.image}
                                      click={() => this.cardHandlerClicked(section._id)}
                                      key={section._id}
                                      user={this.props.user}
                                      title={section.title}
                                      description={section.description}
                                      passedAmount={section.passed}
                                      averageRating={section.averageRating}
                                      clickModal={this.showModal}
                                />
                                {/*<Modal title={section.title}*/}
                                {/*       show={this.state.show}*/}
                                {/*       hide={this.hideModal}*/}
                                {/*>*/}
                                {/*    <Image className={classes.image}*/}
                                {/*           src={section.image !== "" ? `${config.imageUrl}/${section.image}` : defUrl}/>*/}
                                {/*    <div className={classes.flex}>*/}
                                {/*        <div className={classes.div}>*/}
                                {/*            <Typography className={classes.description}>*/}
                                {/*                {section.description}*/}
                                {/*            </Typography>*/}
                                {/*        </div>*/}
                                {/*        <Typography className={classes.text} component="p">*/}
                                {/*            Кол-во людей прошедших секцию: {section.passed}*/}
                                {/*        </Typography>*/}
                                {/*        <Rating*/}
                                {/*            initialRating={section.averageRating}*/}
                                {/*            readonly="true"*/}
                                {/*            emptySymbol={<img src={greyStar} alt=""/>}*/}
                                {/*            fullSymbol={<img src={yellowStar} alt=""/>}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</Modal>*/}
                            </Fragment>
                        )
                    }
                })
            )
        };


        return (
            <Grid
                container
                spacing={16}
                alignItems='flex-end'
                justify='space-around'

                className={classes.root}
            >
                {this.props.block ? CardsFromUser() : null}

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    block: state.blocks.blockById,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    route: path => dispatch(push(path)),
    onGetBlockById: id => dispatch(getBlockById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SectionsList));
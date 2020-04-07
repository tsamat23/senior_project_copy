import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Link} from "react-router-dom";

import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';

import {fetchAllBlock} from "../../store/actions/blocksActions";
import BlockCard from "../../components/UI/BlockCard/BlockCard";
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
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import FaHome from "react-icons/lib/fa/home";
import {fetchAllSection} from "../../store/actions/sectionActions";
import {NotificationManager} from "react-notifications";

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


class BlocksList extends Component {

    state = {
        aboutUsModalIsOpen: true,
        show: false
    };

    handleAboutUsModalChange = () => {
        this.setState(prevState => ({aboutUsModalIsOpen: !prevState.aboutUsModalIsOpen}));
        localStorage.setItem('firstVisit', 'false');
    };

    componentDidMount() {
        this.props.onFetchAllBlock();
        this.props.onFetchAllSection();
    };

    cardHandlerClicked = (id) => {
        if (this.props.user) {
            // this.props.route(`/questions?id=${id}`)
            this.props.route(`/block/${id}`)
        } else {
            this.props.route('/login')
        }
    };

    // viewResultsHandlerClicked = (id) => {
    //     if (this.props.user) {
    //         this.props.route(`/results/${id}`)
    //     } else {
    //         this.props.route('/register')
    //     }
    // };

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };

    render() {
        console.log(this.props.blocks);
        // console.log(this.props.user.sections.length);
        console.log(this.props.sections.length)

        const {classes} = this.props;
        const defUrl = `${config.imageUrl}/default.jpg`;

        const CardsFromUser = () => {
            return (
                this.props.blocks.map((block, id) => {
                    // if (this.props.user &&
                    //     this.props.user.sections &&
                    //     this.props.user.sections[id] === block._id) {
                    //     return (
                    //         <CardFinish rate={block.averageRating} key={block._id} title={block.title}
                    //                     description={block.description}/>
                    //     )
                    // }
                    // if (this.props.user && this.props.user.sections && this.props.user.sections.length < id) {
                    //     return (
                    //         <CardDisabled key={block._id} title={block.title} description={block.description}/>
                    //
                    //     )
                    // }
                    // else {
                        return (
                            <Fragment>
                                <BlockCard image={block.image}
                                      click={() => this.cardHandlerClicked(block._id)}
                                      key={block._id}
                                      user={this.props.user}
                                      title={block.title}
                                      description={block.description}
                                      passedAmount={block.passed}
                                      // averageRating={section.averageRating}
                                      clickModal={this.showModal}
                                />
                                <Modal title={block.title}
                                       // show={this.state.show}
                                       // hide={this.hideModal}
                                >
                                    <Image className={classes.image}
                                           src={block.image !== "" ? `${config.imageUrl}/${block.image}` : defUrl}/>
                                    <div className={classes.flex}>
                                        <div className={classes.div}>
                                            <Typography className={classes.description}>
                                                {block.description}
                                            </Typography>
                                        </div>
                                        {/*<Typography className={classes.text} component="p">*/}
                                        {/*    Кол-во людей прошедших секцию: {block.passed}*/}
                                        {/*</Typography>*/}
                                        {/*<Rating*/}
                                        {/*    initialRating={section.averageRating}*/}
                                        {/*    readonly="true"*/}
                                        {/*    emptySymbol={<img src={greyStar} alt=""/>}*/}
                                        {/*    fullSymbol={<img src={yellowStar} alt=""/>}*/}
                                        {/*/>*/}
                                    </div>
                                </Modal>
                            </Fragment>
                        )
                    // }
                })
            )
        };

        return (
            <Fragment>
                <Grid container
                    spacing={0}
                    alignItems='flex-end'
                    justify='space-around'
                    style={{
                        margin: 0,
                        width: '100%',
                    }}

                    className={classes.root}
                >
                    {this.props.blocks ? CardsFromUser() : null}

                    {this.props.user && this.props.user.sections.length === this.props.sections.length
                        ?
                        <div style={{ textAlign: 'center', margin: '50px' }}>
                            <Link style={{textDecoration: 'none'}} className={classes.textLine} to="/results">
                                <Button variant="outlined" color="secondary" style={{fontSize: '50px', margin: '50px'}}>Посмотреть результаты</Button>
                            </Link>
                        </div>
                        : null}
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.blocks.blocks,
    sections: state.sections.sections,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    route: path => dispatch(push(path)),
    onFetchAllBlock: () => dispatch(fetchAllBlock()),
    onFetchAllSection: () => dispatch(fetchAllSection())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlocksList));
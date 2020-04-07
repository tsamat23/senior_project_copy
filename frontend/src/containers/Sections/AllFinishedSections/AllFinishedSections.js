import React, {Fragment} from 'react';
import ReactToPrint from 'react-to-print';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";

import ComponentToPrint from '../../ComponentToPrint/ComponentToPrint';
import QuestionsWithAnswers from "../../AdminRoom/Questions/QuestionsWithAnswers/QuestionsWithAnswers";
import FinishedReview from "../../../components/Reviews/FinishedReview/FinishedReview";

const styles = {
    sectionBox: {
        padding: '20px',
        marginBottom: '20px'
    },
    header: {
        marginBottom: '15px'
    }
};

const AllFinishedSections = ({classes, sections}) => {
    return (
        <Fragment>
            <ComponentToPrint ref={el => (this.componentRef = el)}>
                {sections && sections.map(section => {
                    return <Paper key={section._id} className={classes.sectionBox}>
                        <Typography align='left' variant='title' className={classes.header}>
                            {section.title}
                        </Typography>
                        <Typography align='left' variant='title' className={classes.header}>
                            {section.description}
                        </Typography>
                        <QuestionsWithAnswers questions={section.questions}/>
                        {section.review.length > 0
                            ? <FinishedReview review={section.review}/>
                            : <Typography align='center' variant='h3'>Пользователю ещё не написали рецензию</Typography>
                        }
                    </Paper>
                })}
            </ComponentToPrint>
            <ReactToPrint
                trigger={() => <Button variant="outlined" color="default" type="button" className={classes.button}>Распечатать</Button>}
                content={() => this.componentRef}
                closeAfterPrint="true"
            />
        </Fragment>
    );
};

export default withStyles(styles)(AllFinishedSections);
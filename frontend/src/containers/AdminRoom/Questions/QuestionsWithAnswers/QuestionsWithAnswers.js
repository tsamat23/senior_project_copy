import React, {Component} from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CanvasDraw from 'react-canvas-draw';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withStyles} from '@material-ui/core/styles';
import TestAnswers from "../../../../components/Questions/AnswersOfQuestion/TestAnswers";


const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  pictureQuestion: {
    marginBottom: '20px'
  },
  infoBlock: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

class QuestionsWithAnswers extends Component {

  render() {
    const {classes, questions} = this.props;

    return questions.map(question => {
      if (question.type === 'picture') {
        return (
          <ExpansionPanel
            key={question._id}
            className={classes.pictureQuestion}
            id='showPicture'
            onClick={() => this.loadableCanvas.loadSaveData(JSON.parse(question.answers[0].body[0]))}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.heading}>{question.title}</Typography>
              <Typography className={classes.secondaryHeading}>
                Нажмите, чтобы посмотреть рисунок
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CanvasDraw
                disabled
                ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                canvasWidth={800}
                canvasHeight={400}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      } else if (question.type === 'test') {
        return (
          <TestAnswers
            answer={question.answers[0]}
            title={question.title}
          />
        )
      } else if (question.type === 'info') {
        const parsedData = JSON.parse(question.data[0]);
        return (
          <div className='infoBlock'>
            <Typography className={classes.infoBlock}>{question.title}</Typography>
            <textarea className='infoBlock__text' disabled name="" id="" cols="100" rows="3">
                      {parsedData.blocks[0].text}
            </textarea>
          </div>
        )
      } else {
        return (
          <List
            key={question._id}
            component="nav"
            subheader={
              <ListSubheader component="div">
                {question.title}
              </ListSubheader>
            }
          >
            {question.answers.map(answer => (
              <ListItem key={answer._id}>
                <ListItemText
                  inset primary={`Ответ: ${answer.body}`}
                />
              </ListItem>
            ))}
          </List>
        )
      }
    })
  }
}

export default withStyles(styles)(QuestionsWithAnswers);
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
import TestAnswers from "./TestAnswers";
import './AnswersOfQuestion.css';


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
    pictureBlock: {
      marginBottom: '20px'
    },
    infoBlock: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
});

class AnswersOfQuestion extends Component {

    render() {
        const {classes, data} = this.props;
      console.log(data);
      return data && data.map(item => {
        if (item.questionId.type === 'picture') {
                return (
                    <ExpansionPanel className={classes.pictureBlock} id='showPicture' onClick={() => this.loadableCanvas.loadSaveData(JSON.parse(item.body[0]))}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>{item.questionId.title}</Typography>
                            <Typography className={classes.secondaryHeading}>Нажмите, чтобы посмотреть
                                рисунок</Typography>
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
            } else if (item.questionId.type === 'test') {
                return <TestAnswers answer={item} />
            } else if (item.questionId.type === 'info') {
              const parsedData = JSON.parse(item.body);
                return (
                  <div className='infoBlock'>
                    <Typography className={classes.infoBlock}>{item.questionId.title}</Typography>
                    <textarea className='infoBlock__text' disabled name="" id="" cols="100" rows="3">
                      {parsedData.blocks[0].text}
                    </textarea>
                  </div>
                )
            } else {
                return (
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div">
                                {item.questionId.title}
                            </ListSubheader>
                        }
                    >
                        <ListItem>
                            {item.body.map(answer => {
                                return <ListItemText inset primary={`Ответ: ${answer}`}/>
                            })}
                        </ListItem>
                    </List>
                )
            }
        })
    }
}

export default withStyles(styles)(AnswersOfQuestion);
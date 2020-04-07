import React, {Component} from 'react';
import CanvasDraw from 'react-canvas-draw';
import './SketchStyle.css';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {CirclePicker} from 'react-color';
import IconButton from "@material-ui/core/IconButton/IconButton";
import IconClear from '@material-ui/icons/Clear';
import IconBack from '@material-ui/icons/Redo';

const styles = theme => ({
    text: {
        htmlFontSize: 4
    },
});

const theme = createMuiTheme({
    typography: {
        fontSize: 16,
        htmlFontSize: 6,
        fontFamily: ['Comfortaa', 'cursive'],
    }
});

class Sketch extends Component {
    state = {
        color: "#2B2B2B",
        width: 800,
        height: 400,
        coordinates: null,
    };

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    render() {

        const {classes, title} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Typography style={{fontSize: '20px', margin: '15px 25px 0 0'}}>
                    {title}
                </Typography>
            <div className="box">
                <div className='tools'>
                    <IconButton
                        onClick={() => {this.saveableCanvas.clear()}}
                        variant="fab" color="secondary" aria-label="add">
                        <IconClear/>
                    </IconButton>

                    <IconButton
                        onClick={() => {this.saveableCanvas.undo()}}
                        variant="fab" color="secondary" aria-label="add">
                        <IconBack/>
                    </IconButton>

                    <CirclePicker
                        width='100px'
                        className='colorPicker'
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>
                <Tooltip placement='top'
                         style={classes.text}
                         title='Кликни и удерживай мышку, что бы начать рисовать'>
                <div className="sketch">

                    <CanvasDraw
                        id="mycanvas"
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushColor={this.state.color}
                        canvasWidth={this.state.width}
                        canvasHeight={this.state.height}
                        onChange={(event) => this.props.changed(this.saveableCanvas.getSaveData(event), this.props.id, this.props.type, title)}
                    />
                </div>
                </Tooltip>

            </div>

            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(Sketch);
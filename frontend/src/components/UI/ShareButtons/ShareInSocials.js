import React, {Component} from 'react';
import {FacebookShareButton, VKShareButton} from 'react-share';
import Facebook from 'react-icons/lib/fa/facebook-square';
import IconButton from '@material-ui/core/IconButton';
import withStyles from "@material-ui/core/styles/withStyles";
import VK from "react-icons/lib/fa/vk";

const styles = theme => ({
    button: {
        marginLeft: '15px',
        marginRight: "15px",
        background: '#fff'
    },
    registerBtn: {
        background: '#5282b8',
        color: '#fff',
        fontSize: '12px'
    }
});


class FacebookShare extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className='flex-buttons'>
                <IconButton className={classes.button} variant="fab" color="secondary" aria-label="add">
                    <FacebookShareButton style={{outline: 'none'}} url='http://psyhology.ddns.net/'>
                        <Facebook style={{fontSize: '30px'}}/>
                    </FacebookShareButton>
                </IconButton>

                <IconButton className={classes.button} variant="fab" color="secondary" aria-label="add">
                    <VKShareButton style={{outline: 'none'}} url="http://psyhology.ddns.net/">
                        <VK style={{fontSize: '30px'}}/>
                    </VKShareButton>
                </IconButton>
            </div>
        )
    }
}

export default withStyles(styles)(FacebookShare);
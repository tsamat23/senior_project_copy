import React from 'react';
import Switch from '@material-ui/core/Switch';


const SwitchButton = (props) => {
    return (
        <Switch
            onChange={props.onChange}
            color={props.color}
            checked={}
        />
    )
};

export default SwitchButton;
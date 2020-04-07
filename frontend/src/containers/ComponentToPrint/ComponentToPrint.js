import React, {Component} from 'react';

class ComponentToPrint extends Component {
    render() {
        return (
            this.props.children
        );
    }
}

export default ComponentToPrint;
import React, {Component} from 'react';

import Routes from './Routes';
import Layout from "./containers/Layout/Layout";

class App extends Component {
    render() {
        return (
            <Layout>
                <Routes/>
            </Layout>
        );
    }
}

export default App;

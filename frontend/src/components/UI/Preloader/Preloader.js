import React from 'react';
import {Image} from 'react-bootstrap';
import preloader from '../../../assets/preloader/45.gif';
import './Preloader.css';

const PreloaderComponent = props => {
    return (
        <Image className='preloader' src={preloader}/>
    )
};

export default PreloaderComponent;
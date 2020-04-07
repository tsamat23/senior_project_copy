import React from 'react';
import img_1 from './1532507470737.jpg';
import img_2 from './1532507578899.jpg';
import img_3 from './1532507595072.jpg';
import './Landing.css';

const Landing = props => {
    return (
        <div>
            <img src={img_1} alt="#"/>
            <img src={img_2} alt="#"/>
            <img src={img_3} alt="#"/>
        </div>
    )
};

export default Landing;
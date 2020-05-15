import React from 'react';
import preloader from './../../pictures/preloader.gif'

const Preloader = () => {
    return (<div style = {{width: 10}}>
        <img src={preloader} alt="Loading..." />
    </div>
    )
}

export default Preloader
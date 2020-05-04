import React from 'react';
import preloader from './../../pictures/preloader.gif'

const Preloader = (props) => {
    return (<div  style = {{width: 10}}>
        <img src={preloader} alt="Loaging" />
    </div>
    )
}

export default Preloader
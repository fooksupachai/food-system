import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    // console.log(props.height);
    
  return(
    <div className={classes.Logo} >
        <img src={burgerLogo} alt="MyBurger" height={props.height} width={props.width} />
    </div>

  )
}

export default logo;
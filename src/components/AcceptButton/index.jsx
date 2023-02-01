import React from 'react';
import { Button } from '../Button/'

import './accept-button.css'



export const AcceptButton = ({ buttonName, state}) => {
  const handleClick = () => {
    const [index, setState, lenght] = state 
    console.log('here_Accept')
    console.log(index)
    if (index <= lenght) {
      setState(index + 1)
    } 
    else console.log("кончились")
    // setState(currentIndex + 1);
  }
  return (
    <Button nameButton = {buttonName} classNameButton={'accpet-button'} clickFunction={handleClick} />
    
  )
};
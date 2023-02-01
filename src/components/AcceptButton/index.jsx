import React from 'react';
import { Button } from '../Button/'

import './accept-button.css'

export const AcceptButton = ({ buttonName }) => {
  const handleClick = () => {
    console.log('here_Accept')
  }
  return (
    <Button nameButton = {buttonName} classNameButton={'accpet-button'} clickFunction={handleClick} />
    
  )
};
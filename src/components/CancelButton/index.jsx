import React from 'react';
import { Button } from '../Button/'

import './cancel-button.css'

export const CancelButton = ({ stringValue }) => {
  
  return (
    <Button nameButton = {stringValue} classNameButton={'cancel-button'}/>
    
  )
};
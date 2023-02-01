import React from 'react';
import './button.css'

const handleClick = () => {
  console.log('here_standart button')
}
export const Button = ({ buttonName = 'Стандартная кнопка', classNameButton='btn', clickFunction = handleClick}) => {
  return (
    <button className={classNameButton} onClick={clickFunction}>{buttonName}</button>
    
  )
};
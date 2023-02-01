import React from 'react';
import { useState } from 'react';
import { TextCard } from '../components/TextCard'
import { AcceptButton } from '../components/AcceptButton'
import { Button } from '../components/Button'
import { CancelButton } from '../components/CancelButton'
import { ReworkButton } from '../components/ReworkButton'



const inputString = [
  'Дети, которые совершают насилие над собой совершают преступление', 
  'Не дети, совершают насилие', 
  'asdfsadfsa'
]
const nameAcceptButton = 'Принять строку'
const nameCancelButton = 'Отклонить строку'
const nameReworkButton = 'Отправить на доработку'




export const HomePage = () => {
  const [currentStringIndex, setNextString] = useState(0);

  console.log(currentStringIndex)
  return (
    <>
      <p className='label-string__card_block'>Входная строка:</p>
      <TextCard stringValue={inputString} stringIndex = {currentStringIndex} />
      <CancelButton stringValue={nameCancelButton}/>
      <ReworkButton stringValue={nameReworkButton}/>
      <AcceptButton stringValue={nameAcceptButton}/>
    </>
  );
}

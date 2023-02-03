import React from "react";
// import { useState } from 'react';

import "./text-card.css";

export const TextCard = ({ stringValue, stringIndex }) => {
  return (
    <div className="card_block">
      {
        <h1 key={stringIndex} className="input-string__card_block">
          {stringValue[stringIndex]}
        </h1>
        // stringValue.map((element, index)=>(
        //   <h1 key={index} className='input-string__card_block'>
        //     {element}
        //   </h1>
        // ))
      }
    </div>
  );
};

import React from "react";
// import { useState } from 'react';

import "./text-card.css";

export const TextCard = ({ stringIndex, textCard }) => {
  const handleChange = () => {
    // console.log(textCard);
  };

  return (
    <div className="card_block">
      {
        <form action="" method="post" className="form__card_block">
          <textarea
            key={textCard}
            type="text"
            className="input-string__card_block"
            value={textCard ? textCard : "loading..."}
            onChange={handleChange}
          ></textarea>
        </form>
      }
    </div>
  );
};

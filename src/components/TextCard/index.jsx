import React from "react";
import { v4 } from "uuid";

import { useState } from "react";
import { useForm } from "react-hook-form";

import "./text-card.css";

export const TextCard = ({ text, rememberText }) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const handleChange = (e) => {
    const changedText = e.target.value;
    console.log(changedText);
    rememberText(changedText);
    // const w = watch();
    // console.log(w.changedText);
    // text = changedText + "333";
    // console.log(text);
  };

  return (
    <div className="card_block">
      {
        <form
          id="generationTextForm"
          action=""
          method="post"
          className="form__card_block"
        >
          <textarea
            autoFocus
            key={text}
            name="saveContent"
            type="text"
            className="input-string__card_block"
            defaultValue={text ? text : "loading..."}
            onChange={handleChange}
          />
        </form>
      }
    </div>
  );
};

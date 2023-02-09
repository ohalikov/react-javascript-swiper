import React from "react";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import "./text-card.css";
import { DevTool } from "@hookform/devtools";

export const TextCard = ({ text, onSubmit }) => {
  const { register, control, handleSubmit, watch, setValue } = useForm();

  return (
    <div className="card_block">
      {
        <form className="form__card_block" onChange={handleSubmit(onSubmit)}>
          <textarea
            key={text}
            name="saveContent"
            type="text"
            className="input-string__card_block"
            defaultValue={text}
            {...register("textArea", {
              required: true,
            })}
          />
          <DevTool control={control} />
          {/* <input type="submit" /> */}
        </form>
      }
    </div>
  );
};

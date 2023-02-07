import React from "react";
import "./button.css";

export const Button = ({ children, classNameButton = "btn", onClick }) => {
  return (
    <button className={classNameButton} onClick={onClick}>
      {children}
    </button>
  );
};

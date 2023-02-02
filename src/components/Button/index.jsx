import React from "react";
import "./button.css";

const handleClick = () => {
  console.log("here_standart button");
};
export const Button = ({
  children,
  classNameButton = "btn",
  clickFunction = handleClick,
}) => {
  return (
    <button className={classNameButton} onClick={clickFunction}>
      {children}
    </button>
  );
};

import React, { Children } from "react";
import { Button } from "../Button/";

import "./accept-button.css";

export const AcceptButton = ({ children, state }) => {
  const handleClick = () => {
    const [index, setState, lenght] = state;
    console.log("here_Accept");
    console.log(index);
    if (index <= lenght) {
      setState(index + 1);
    } else console.log("кончились");
    // setState(currentIndex + 1);
  };
  return (
    <Button classNameButton={"accpet-button"} clickFunction={handleClick}>
      {children}
    </Button>
  );
};

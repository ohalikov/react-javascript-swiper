import React, { Children } from "react";
import { Button } from "../Button/";

import "./accept-button.css";

export const AcceptButton = ({ children, state }) => {
  const handleClick = () => {
    const [nextString, setString, nextDataFetch] = state;
    console.log(`"nextstring -> ", ${nextString}`);

    setString(nextString);
    nextDataFetch();
  };
  return (
    <Button classNameButton={"accpet-button"} onClick={handleClick}>
      {children}
    </Button>
  );
};

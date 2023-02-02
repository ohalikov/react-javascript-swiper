import React from "react";
import { Button } from "../Button/";

import "./cancel-button.css";

export const CancelButton = ({ children }) => {
  return <Button classNameButton={"cancel-button"}>{children}</Button>;
};

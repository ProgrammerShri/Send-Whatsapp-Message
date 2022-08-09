import * as React from "react";
import Button from "@mui/material/Button";

const AppButton = ({ title = "Send" }) => {
  return <Button variant="contained">{title}</Button>;
};

export default AppButton;

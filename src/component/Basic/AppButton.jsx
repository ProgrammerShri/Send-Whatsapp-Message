import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const AppButton = ({ title = "Send", onClick , ...otherProps}) => {
  return (
    <>
      <Button variant="contained" endIcon={<SendIcon />} {...otherProps}>
        Send
      </Button>
    </>
  );
};

export default AppButton;

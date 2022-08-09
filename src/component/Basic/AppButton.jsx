import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const AppButton = ({ title = "Send", onClick , ...otherProps}) => {
  return (
  <>
    <Button variant="contained" endIcon={<SendIcon />} onClick={onClick} {...otherProps} >
      {title}
    </Button>
    
  </>
  );
};

export default AppButton;



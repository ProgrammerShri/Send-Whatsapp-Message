import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";


const AppInput = ({label = "Enter or Paste Whatsapp Number",}) => {
  return (
    <div>
      <TextField
        label={label}
        sx={{ m: 1, width: "40ch" }}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ContentPasteIcon
                style={{
                  cursor: "pointer",
                  backgroundColor: "lightGray",
                  padding:"1rem"               
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default AppInput;

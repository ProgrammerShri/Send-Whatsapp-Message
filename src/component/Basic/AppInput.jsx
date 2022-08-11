import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Tooltip from "@mui/material/Tooltip";

const AppInput = ({
  id = "",
  label = "Enter or Paste Whatsapp Number",
  onChange,
  onClick,
  error = false,
  ...otherProps
}) => {
  return (
    <div>
      <TextField
        label={label}
        id={id}
        onChange={onChange}
        sx={{ m: 1, width: "40ch" }}
        type="number"
        error={error}
        helperText={error ? "Please Enter Valid Whatsapp Number" : ""}
        {...otherProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Paste Copied Number">
                <ContentPasteIcon
                  onClick={onClick}
                  style={{
                    cursor: "pointer",
                    color: "#00bcd4",
                  }}
                />
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default AppInput;

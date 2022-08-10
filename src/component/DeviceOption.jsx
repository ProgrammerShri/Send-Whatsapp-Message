import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const DeviceOption = ({ onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        label="Whatsapp is installed in your device ?"
        onChange={(ev) => onChange(ev.target.checked)}
      />
    </FormGroup>
  );
};

export default DeviceOption;

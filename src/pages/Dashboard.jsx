import { Divider } from "@mui/material";
import React, { useState } from "react";
import AppButton from "../component/Basic/AppButton";
import AppHeading from "../component/Basic/AppHeading";
import AppInput from "../component/Basic/AppInput";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handlePasteInput = async () => {
    const text = await navigator.clipboard.readText();
    setMobileNumber(text);
  };

  const handleSubmit = () => {
    let url = `https://wa.me/${mobileNumber}`;
    window.open(url, "_blank");
    setMobileNumber("");
  };

  return (
    <>
      <AppHeading
        variant="h5"
        content="Send Whatsapp Message Without Saving On Your Device"
      />
      <Divider />
      <Paper>
        <AppHeading variant="button" content="Enter number with country code" />
        <AppInput
          onChange={(ev) => setMobileNumber(ev.target.value)}
          onClick={handlePasteInput}
          value={mobileNumber}
        />
        <AppButton onClick={handleSubmit} disabled={mobileNumber.length < 10} />
      </Paper>
    </>
  );
};

export default Dashboard;

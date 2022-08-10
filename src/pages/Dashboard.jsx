import { Divider } from "@mui/material";
import React, { useState } from "react";
import AppButton from "../component/Basic/AppButton";
import AppText from "../component/Basic/AppText";
import AppInput from "../component/Basic/AppInput";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { Container } from "@mui/system";

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
    <DashboardContainer>
      <MainHeading>
        <AppText
          variant="h5"
          content="Send Whatsapp Message Without Saving Number On Your Device"
        />
      </MainHeading>
      <Divider />
      <MainContainer>
        <SubHeadingContainer>
          <AppText variant="button" content="Enter number with country code" />
        </SubHeadingContainer>
        <AppInput
          onChange={(ev) => setMobileNumber(ev.target.value)}
          onClick={handlePasteInput}
          value={mobileNumber}
        />
        <AppButton onClick={handleSubmit} disabled={mobileNumber.length < 10} />
      </MainContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MainHeading = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const SubHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Dashboard;

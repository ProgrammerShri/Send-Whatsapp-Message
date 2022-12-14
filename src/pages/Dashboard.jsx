import { Divider } from "@mui/material";
import React, { useState } from "react";
import AppButton from "../component/Basic/AppButton";
import AppText from "../component/Basic/AppText";
import AppInput from "../component/Basic/AppInput";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import AppList from "../component/AppList";
import useDeviceDetect from "../hooks/useDeviceDetect";
import DeviceOption from "../component/DeviceOption";

const Dashboard = () => {
  const [list, setList] = React.useState([]);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [error, setError] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isWhatsappInstalled, setIsWhatsappInstalled] = React.useState(false);

  const device = useDeviceDetect();

  const getListItems = () => {
    const searchedList = window.localStorage.getItem("SearchedList");
    if (searchedList) {
      setList(JSON.parse(searchedList));
    }
  };

  React.useEffect(() => {
    getListItems();
    if (device === "mobile") {
      setIsMobile(true);
    }
  }, [list.length, device]);

  const handlePasteInput = async () => {
    const text = await navigator.clipboard.readText();
    // validate mobile number and set error if not valid else set mobile number to state
    if (text.length === 10 && text.match(/^[0-9]+$/)) {
      setMobileNumber(text);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSubmit = async () => {
    let url = `https://wa.me/${mobileNumber}`;

    if (!isMobile) {
      let INSTALLED_URL = `https://wa.me/${mobileNumber}`;
      let WHATSAPP_WEB_URL = `https://web.whatsapp.com/send?phone=${mobileNumber}`;

      isWhatsappInstalled ? (url = INSTALLED_URL) : (url = WHATSAPP_WEB_URL);
    }

    window.open(url, "_blank");
    setMobileNumber("");

    let loacalSaveddArray = window.localStorage.getItem("SearchedList");

    loacalSaveddArray
      ? (loacalSaveddArray = JSON.parse(loacalSaveddArray))
      : (loacalSaveddArray = []);

    const currentUser = {
      id: Math.random() * 100,
      mobileNumber: mobileNumber,
      searchedAt: new Date(),
    };

    loacalSaveddArray.push(currentUser);

    setList(loacalSaveddArray);

    window.localStorage.setItem(
      "SearchedList",
      JSON.stringify(loacalSaveddArray)
    );
  };

  const handleDelete = async (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    await window.localStorage.setItem("SearchedList", JSON.stringify(newList));
  };

  const handleClear = async () => {
    setList([]);
    await window.localStorage.removeItem("SearchedList");
  };

  const handleChange = (e) => {
    const re = /[0-9]/;
    const isValid = re.test(e.target.value);
    if (isValid || e.target.value === "") {
      setMobileNumber(e.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleCheckWhatsappInstalled = (e) => {
    setIsWhatsappInstalled(e);
  };

  return (
    <DashboardContainer>
      <MainHeading>
        <AppText
          variant="h5"
          content="Send Whatsapp Message Without Saving Number On Your Device"
        />
      </MainHeading>
      <MainContainer>
        <SubHeadingContainer>
          <AppText variant="button" content="Enter number with country code" />
        </SubHeadingContainer>
        <AppInput
          onChange={(ev) => handleChange(ev)}
          onClick={handlePasteInput}
          value={mobileNumber}
          error={error}
        />
        {isMobile === false && (
          <DeviceOption onChange={(ev) => handleCheckWhatsappInstalled(ev)} />
        )}
        <AppButton
          onClick={handleSubmit}
          title="Send Message"
          disabled={mobileNumber.length < 10 || error}
        />
      </MainContainer>
      <AppList
        list={list}
        onClick={(id) => handleDelete(id)}
        onClear={handleClear}
        isMobile={isMobile}
        isWhatsappInstalled={isWhatsappInstalled}
      />
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

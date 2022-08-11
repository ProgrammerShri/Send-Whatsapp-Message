import * as React from "react";
// import { styled } from '@mui/material/styles';
import styled from "styled-components";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  ListItemButton,
} from "@mui/material";
import { PersonPinCircleOutlined } from "@mui/icons-material";

// Render Time (with format)
export function renderTime(timeStamp) {
  const date = new Date(timeStamp);
  const dateString = date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return dateString;
}

const AppList = ({ list, onClick, onClear, isMobile, isWhatsappInstalled }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [mobileNumber, setMobileNumber] = React.useState(null);

  const handleClickOpen = (mobileNumber) => {
    setOpen(true);
    setMobileNumber(mobileNumber);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Divider />
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12} md={10}>
          <HeadingContainer>
            <Typography
              sx={{ my: 2, mx: 1, fontSize: "1.3rem" }}
              variant="h6"
              component="div"
            >
              {list.length > 0
                ? `Previous Searched Contacts : ${list.length}`
                : "No Previous Searched Contacts"}
            </Typography>

            {list.length > 0 && (
              <Button
                sx={{ my: 2, mx: 1 }}
                variant="outlined"
                onClick={onClear}
              >
                Clear All
              </Button>
            )}
          </HeadingContainer>
          <div>
            <List>
              {list.map((item) => (
                <ListItemContainer key={item.id}>
                  <ListContainer
                    // onClick={() => redirectUrl(item.mobileNumber)}
                    onClick={() => handleClickOpen(item.mobileNumber)}
                    href="#!"
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <WhatsAppIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.mobileNumber}
                      secondary={`Searched at ${renderTime(item.searchedAt)}`}
                    />
                  </ListContainer>
                  <DeleteIconContainer>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onClick(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </DeleteIconContainer>
                </ListItemContainer>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        isMobile={isMobile}
        isWhatsappInstalled={isWhatsappInstalled}
        mobileNumber={mobileNumber}
      />
    </Box>
  );
};

const ListItemContainer = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;

  &:hover {
    background-color: #121212;
    color: #fff;
  }
`;

const ListContainer = styled.a`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

const DeleteIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const openOptions = ["WhatsApp Web", "WhatsApp App"];

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    isMobile,
    isWhatsappInstalled,
    mobileNumber,
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);

    let url = `https://wa.me/${mobileNumber}`;

    if (!isMobile) {
      let INSTALLED_URL = `https://wa.me/${mobileNumber}`;
      let WHATSAPP_WEB_URL = `https://web.whatsapp.com/send?phone=${mobileNumber}`;

      value === "WhatsApp App"
        ? (url = INSTALLED_URL)
        : (url = WHATSAPP_WEB_URL);
    }

    return window.open(url, "_blank");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Open With</DialogTitle>
      <List>
        {openOptions.map((value) => (
          <ListItem
            button
            onClick={() => handleListItemClick(value)}
            key={value}
          >
            <ListItemAvatar>
              <Avatar>
                <WhatsAppIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default AppList;

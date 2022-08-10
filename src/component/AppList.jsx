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
import { Button, Divider, ListItemButton } from "@mui/material";

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

const AppList = () => {
  const [list, setList] = React.useState([]);

  const getListItems = () => {
    const searchedList = window.localStorage.getItem("SearchedList");
    if (searchedList) {
      setList(JSON.parse(searchedList));
    }
  };

  React.useEffect(() => {
    getListItems();
  }, []);

  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    window.localStorage.setItem("SearchedList", JSON.stringify(newList));
    getListItems();
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
                onClick={() => console.log("DD")}
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
                    href={`https://wa.me/${item.mobileNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    button="true"
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
                      onClick={() => handleDelete(item.id)}
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

export default AppList;

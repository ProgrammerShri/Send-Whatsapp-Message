import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AppText = ({ variant = "h1", content = "Heading" }) => {
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Typography variant={variant} component="div">
          {content}
        </Typography>
      </Box>
    </div>
  );
};

export default AppText;

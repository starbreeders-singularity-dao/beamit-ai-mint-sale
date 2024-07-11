import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import React from "react";

const AboutSkeleton = () => {
  return (
    <Box>
      <Typography component="div" variant="h3">
        <Skeleton />
      </Typography>
      <Divider />
      <Typography component="div" variant="body1">
        <Skeleton />
      </Typography>
    </Box>
  );
};

export default AboutSkeleton;

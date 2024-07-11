/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import React, { useEffect } from "react";

const CustomTabWrapper = styled(Box)`
  margin-left: 0%;

  .MuiTabs-root {
    min-height: auto;
  }
  .main_tabWrapper {
    background-color: ${primaryColors.bodyColor};
    border-radius: 8px;
    padding: 4px;
    min-height: auto;

    .MuiButtonBase-root {
      padding: 12px 20px;
      width: auto;
      min-height: auto;
      color: ${primaryColors?.mainFontColor};
      &:hover {
        background-color: none !important;
      }
      &.Mui-selected {
        background-color: ${primaryColors.info};
        border-radius: 8px;
        border-bottom: none;
        color: ${primaryColors.white};
      }
    }
    .MuiTabs-indicator {
      display: none;
    }
  }
`;
interface toggleProps {
  dataset: string[];
  onDataCallback?: (data: string | any) => void;
}
const OnlineToggleTab = ({ dataset, onDataCallback }: toggleProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (value !== null) {
      if (onDataCallback !== undefined) {
        onDataCallback(value);
      }
    }
  }, [onDataCallback, value]);
  return (
    <CustomTabWrapper>
      <Box
        sx={{ width: "100%", bgcolor: "background.paper" }}
        className="main_tabWrapper"
      >
        <Tabs value={value} onChange={handleChange} centered>
          {dataset.map((value) => (
            <Tab label={value} />
          ))}
        </Tabs>
      </Box>
    </CustomTabWrapper>
  );
};

export default OnlineToggleTab;

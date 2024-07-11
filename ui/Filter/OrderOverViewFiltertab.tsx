import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

const CustomTabWrapper = styled(Box)`
  margin-left: 0%;
  .MuiTabs-root {
    min-height: auto;
  }
  .main_tabWrapper {
    background-color: ${primaryColors.bodyColor};
    border-radius: 8px;
    padding: 4px;

    .MuiButtonBase-root {
      padding: 12px 16px;
      width: 33.33%;
      min-height: auto;
      color: ${primaryColors?.mainFontColor};
      position: relative;
      &::after {
        content: "";
        width: 2px;
        height: 16px;
        background-color: ${primaryColors?.borderprimary};
        border-radius: 8px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &:hover {
        background-color: none !important;
      }

      &.Mui-selected {
        background-color: ${primaryColors.white};
        border-radius: 8px;
        border-bottom: none;
        color: ${primaryColors.textPrimaryColor};

        &::after {
          opacity: 0;
        }
      }
    }
    .MuiTabs-indicator {
      display: none;
    }
  }
`;
export default function OrderOverviewFilterTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CustomTabWrapper>
      <Box
        sx={{ width: "100%", bgcolor: "background.paper" }}
        className="main_tabWrapper"
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="All" />
          <Tab label="Patient" />
          <Tab label="Pharmacy" />
        </Tabs>
      </Box>
    </CustomTabWrapper>
  );
}

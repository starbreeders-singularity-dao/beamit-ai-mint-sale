import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HeaderWrap = styled(Box)`
  &.main_head {
    padding: 35px 0;
    @media (max-width: 899px) {
      padding: 30px 0;
    }
    @media (max-width: 599px) {
      padding: 20px 0;
    }
    .headerContainer {
      background: ${primaryColors?.black};
      .MuiContainer-root {
        @media (min-width: 1200px) {
          max-width: 1475px;
        }
      }
    }
    .MuiToolbar-root {
      min-height: inherit;
      padding: 0;
    }
  }
  .bmntRtPrt {
    margin-left: auto;
    .txtrtLg {
      font-size: 35px;
      line-height: 1.3;
      font-family: "square721_btroman";
      font-weight: normal;
      color: ${primaryColors?.primary};
      @media (max-width: 599px) {
        font-size: 25px;
      }
    }
  }

  .headerLogo {
    width: 120px;
    img {
      @media (max-width: 899px) {
        width: 100px;
      }
      @media (max-width: 599px) {
        width: 80px;
      }
    }
  }
`;

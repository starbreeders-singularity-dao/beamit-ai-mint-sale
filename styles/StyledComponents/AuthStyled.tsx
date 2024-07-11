import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const AuthStyled = styled(Box)`
  .capchaLoginSec {
    display: flex;
    @media (max-width: 479px) {
      display: block;
    }
    > .MuiFormControl-root {
      width: calc(100% - 230px);
      flex-basis: calc(100% - 230px);
      .MuiInputBase-root {
        height: 45px;
      }
      @media (max-width: 899px) {
        width: calc(100% - 170px);
        flex-basis: calc(100% - 170px);
      }
      @media (max-width: 599px) {
        width: calc(100% - 130px);
        flex-basis: calc(100% - 130px);
      }
      @media (max-width: 479px) {
        width: 100%;
        flex-basis: 100%;
      }
    }
    > .customBtnCn {
      width: 216px;
      flex-basis: 216px;
      padding: 3px 10px;
      height: 45px;
      margin-left: auto;
      @media (max-width: 899px) {
        width: 150px;
        flex-basis: 150px;
        min-width: 150px;
      }
      @media (max-width: 599px) {
        width: 120px;
        flex-basis: 120px;
        min-width: 120px;
      }
      @media (max-width: 479px) {
        width: auto;
        display: table;
        margin: 0 auto;
        flex-basis: 100%;
        height: auto;
        min-width: 150px;
        padding: 13px 18px;
        margin-top: 15px;
      }
    }
  }

  .capchaLoginSectn {
    max-width: 850px;
    margin: 0 auto;
    .capchaLoginBtnSc {
      @media (max-width: 1199px) {
        border: 2px solid ${primaryColors?.primary};
      }
    }
  }
`;

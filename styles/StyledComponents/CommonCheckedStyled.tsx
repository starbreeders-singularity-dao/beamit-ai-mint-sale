import { Box, styled } from "@mui/material";

export const CommonCheckedStyled = styled(Box)`
  .cmnChkWrapper {
    .MuiFormControlLabel-root {
      margin: 0;
      .MuiCheckbox-root,
      .MuiRadio-root {
        padding: 0;
      }
      .MuiFormControlLabel-label {
        padding-left: 13px;
      }
    }
  }
`;

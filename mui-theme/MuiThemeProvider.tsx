import React, { useMemo } from "react";
// material-ui
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { ThemeProvider,createTheme } from "@mui/material/styles";
import { MuiThemeOptions } from "./_muiTheme";


// Mui theme set up provider for whole application

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeOptions = useMemo(() => {
    return MuiThemeOptions("light");
  }, []);

  const theme = createTheme(themeOptions);



  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;

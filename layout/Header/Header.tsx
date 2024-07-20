/* eslint-disable no-console */

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

import { HeaderWrap } from "@/styles/StyledComponents/HeaderWrapper";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// const CustomButton = dynamic(() => import("@/ui/Buttons/CustomButton"));

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userData, isLoggedIn } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <HeaderWrap sx={{ display: "flex" }} className="main_head">
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        className="headerContainer"
      >
        <Container fixed>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: "none" }}
              >
                <MenuIcon />
              </IconButton>
              <Link href="/" className="headerLogo">
                <Image src={assest.logoMain} width={150} height={95} alt="Logo" />
              </Link>
              <Box sx={{ marginLeft: "20px", color: "#00ffff" }}>
                <Link href="https://whitelist.beamit.space/" passHref>
                  <a style={{ color: "#00ffff", textDecoration: "none", fontSize: "12px", display: "block" }}>Alphamint Waitlist</a>
                </Link>
                <Link href="https://docs.google.com/forms/d/1TzmYPtzWh2udYO8RD-ZOSOpSWgewQK_WL4ZaS1UeTb4/" passHref>
                  <a style={{ color: "#00ffff", textDecoration: "none", fontSize: "12px", display: "block" }}>Join Ambassador Program</a>
                </Link>
              </Box>
            </Box>
            {isLoggedIn ? (
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                className="navbar"
              >
                <CustomButtonPrimary
                  onClick={handleLogout}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  <span>Logout</span>
                </CustomButtonPrimary>

                <CustomButtonPrimary
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  <span>{userData?.email}</span>
                </CustomButtonPrimary>
              </Box>
            ) : (
              <Box className="bmntRtPrt">
                <Typography variant="h3" className="txtrtLg">
                  alphamint
                </Typography>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HeaderWrap>
  );
}

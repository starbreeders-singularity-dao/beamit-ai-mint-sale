import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { isAddressWhitelisted } from "@/lib/supabase/db";
import { AuthStyled } from "@/styles/StyledComponents/AuthStyled";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";


function Index() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (walletAddress: string) => {
    if (!walletAddress) {
      await Swal.fire({
        icon: "warning",
        title: "No Wallet Address",
        text: "Please provide a wallet address."
      });
      return;
    }

    try {
      const isWhitelisted = await isAddressWhitelisted(walletAddress);

      if (isWhitelisted) {
        localStorage.setItem("whiteListAddress", walletAddress);
        await Swal.fire({
          icon: "success",
          title: "Whitelist Address",
          text: `The address ${walletAddress} successfully logged in.`
        });
        router.push("/");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `The address ${walletAddress} is not whitelisted.`
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${error.message}`
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await handleLogin(walletAddress);
  };

  return (
    <Wrapper imageWrapper={assest?.BackstickyMain2}>
      <Container fixed>
        <AuthStyled>
          <Box>
            <div style={{ fontSize: "12px", color: "#00ffff" }}>
              FCFS Whitelist access: <span id="counter">LIVE</span>
            </div>
            <div style={{ fontSize: "12px", color: "#00ffff" }}>
              <Link href="https://docs.google.com/forms/d/1TzmYPtzWh2udYO8RD-ZOSOpSWgewQK_WL4ZaS1UeTb4/" passHref>
                <a style={{ color: "#00ffff", textDecoration: "none" }}>Join Ambassador Program</a>
              </Link>
            </div>
            <div style={{ fontSize: "12px", color: "#00ffff" }}>
              <Link href="https://whitelist.beamit.space/" passHref>
                <a style={{ color: "#00ffff", textDecoration: "none" }}>Alphamint Waitlist</a>
              </Link>
            </div>
          </Box>
          <Box className="capchaLoginSectn">
            <Grid
              container
              rowSpacing={{ xs: 2, md: 4.8 }}
              columnSpacing={{ xs: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <Box className="capchaLoginSec">
                    <InputFieldCommon
                      type="text"
                      onChange={(e) => {
                        setWalletAddress(e.target.value);
                      }}
                    />
                    <CustomButtonPrimary
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="customBtnCn"
                    >
                      Login
                    </CustomButtonPrimary>
                  </Box>
                </form>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <CustomButtonPrimary
                  type="button"
                  variant="contained"
                  color="secondary"
                  className="customBtnCn capchaLoginBtnSc"
                >
                  ReCAPTCHA
                </CustomButtonPrimary>
              </Grid>
            </Grid>
          </Box>
        </AuthStyled>
      </Container>
    </Wrapper>
  );
}

export default Index;

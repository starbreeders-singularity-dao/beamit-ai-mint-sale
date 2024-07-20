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
          <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ fontSize: "12px", color: "#00ffff" }}>Alphamint Waitlist</div>
            <div style={{ fontSize: "12px", color: "#00ffff" }}>Join Ambassador Program</div>
            <div style={{ fontSize: "20px", color: "#ff00f2" }}>Guaranteed Whitelist access: <span style={{ color: "#00ffff" }}>LIVE</span></div>
            <div style={{ fontSize: "20px", color: "#ff00f2" }}>FCFS Whitelist access: <span style={{ color: "#00ffff" }}>LIVE</span></div>
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
                      login
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
                  recaptcha
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

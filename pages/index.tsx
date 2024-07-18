import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import { isAddress } from "web3-validator";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CommonRadio from "@/components/CommonChecked/CommonRadio";
import ProtectedRoute from "@/components/Authentication/ProtectedRoute";
import assest from "@/json/assest";
import { checkedSource } from "@/json/mock/checkedSource.mock";
import { paymentMethodList as initialPaymentMethodList } from "@/json/mock/paymentMethodList.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { HomePageStyled } from "@/styles/StyledComponents/HomePageStyled";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import {
  checkWalletAddress,
  fetchLatestMintId,
  isAddressWhitelisted,
  register,
} from "@/lib/supabase/db";

export default function Home() {
  const router = useRouter();
  const [nftAddress, setNftAddress] = useState("");
  const [holderAddress, setHolderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [paymentHash, setPaymentHash] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [mintId, setMintId] = useState("");
  const [nftAddress2, setNftAddress2] = useState("");
  const [nftAddress3, setNftAddress3] = useState("");
  const [paymentMethodList, setPaymentMethodList] = useState(initialPaymentMethodList);
  const [openStepModal, setOpenStepModal] = useState(false);



  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedSource(event.target.value);
};


  function isValidEthAddress(address) {
    return isAddress(address);
  }

  function validateHolderAddress(selectedSource) {
    try {
      if (selectedSource === "BTC Ordinal" || selectedSource === "ETH NFT" || selectedSource === "Solana NFT") {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  const handleLogout = () => {
    try {
      const check = localStorage.getItem("whiteListAddress");
      if (check) {
        localStorage.removeItem("whiteListAddress");
        router.push("/auth/login");
      }
    } catch (error) {
      // Handle error (optional)
    }
  };

  const updatePaymentMethodList = () => {
    let multiplier = 1;
    if (nftAddress && nftAddress2 && nftAddress3) {
      multiplier = 3;
    } else if (nftAddress && nftAddress2) {
      multiplier = 2;
    }

    const updatedList = initialPaymentMethodList.map((item) => ({
      ...item,
      price: (parseFloat(item.price) * multiplier).toFixed(5),
    }));

    setPaymentMethodList(updatedList);
  };

  useEffect(() => {
    updatePaymentMethodList();
  }, [nftAddress, nftAddress2, nftAddress3]);

  const handleSubmit = async () => {
    try {
      const isWhitelistedAddress = localStorage.getItem("whiteListAddress");
      if (!isWhitelistedAddress) {
        throw new Error("No whitelisted address found");
      }

      const isWhitelisted = await isAddressWhitelisted(isWhitelistedAddress);
      const checkWalletAlreadyPresent = await checkWalletAddress(isWhitelistedAddress);

      if (checkWalletAlreadyPresent) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This wallet address is already registered.",
          confirmButtonText: "OK",
        });
        return false;
      }

      const errors = {
        optionSelected: selectedSource === "",
        pfpAddress: nftAddress === "",
        sourceHolderAddress: holderAddress === "",
        destinationWalletAddress: recipientAddress === "",
        paymentTxHash: paymentHash === "",
      };

      if (
        errors.pfpAddress ||
        errors.sourceHolderAddress ||
        errors.destinationWalletAddress ||
        errors.paymentTxHash ||
        errors.optionSelected
      ) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in all required fields.",
          confirmButtonText: "OK",
        });
        return true;
      }

      if (isWhitelisted) {
        const objData = {
          nftAddress,
          holderAddress,
          recipientAddress,
          paymentHash,
          isWhitelistedAddress,
          selectedSource,
          nftAddress2,
          nftAddress3,
        };

        const isValidHolderAddress = validateHolderAddress(selectedSource);
        if (isValidHolderAddress) {
          const create = await register(objData);

          if (create) {
            const mintedId = await fetchLatestMintId(isWhitelistedAddress);
            setMintId(mintedId);

            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "You have successfully registered.",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "An error occurred while registering.",
              confirmButtonText: "OK",
            });
          }
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // Validation for recipientAddress
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (recipientAddress) {
        if (!selectedSource) {
          Swal.fire({
            icon: "error",
            title: "Select Options",
            text: "Invalid Options",
            confirmButtonText: "OK",
          });
        }
        const isValidEth = isValidEthAddress(recipientAddress);
        if (!isValidEth) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Invalid Ethereum Address",
            confirmButtonText: "OK",
          });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [recipientAddress, selectedSource]);

  // Validation for holderAddress
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (holderAddress) {
        if (!isValidEthAddress(holderAddress)) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Paste the wallet that is holding your NFTs / Ordinals here.",
            confirmButtonText: "OK",
          });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [holderAddress]);

  // Validation for nftAddress
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (nftAddress) {
        if (!nftAddress) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Pick the PFP you want to beam into a 3D avatar. Paste NFT Address or Ordinals Inscription number here.",
            confirmButtonText: "OK",
          });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [nftAddress]);

  const handleStepModalClose = () => {
    setOpenStepModal(false);
  };

  return (
    <ProtectedRoute>
      <Wrapper imageWrapper={assest?.BackstickyMain}>
        <HomePageStyled>
          <Box className="homeSourceWrap">
            <Container fixed>
              <Box className="homeSourceWrapTop">
                <Box className="homeSourceWrapLf">
                  <Typography variant="body1">Source PFP:</Typography>
                </Box>

                <Box className="homeSourceWrapRt">
                  <Box className="homeSourceChckbx">
                    {checkedSource.map((item) => (
                      <CommonRadio
                        name="source"
                        key={item.value} // Use unique value as key
                        label={item?.name}
                        value={item?.value}
                        checked={selectedSource === item?.value}
                        onChange={handleRadioChange}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box className="homeSourceWrapBtm">
                <Grid
                  container
                  rowSpacing={{ xs: 2, sm: 3, md: 4 }}
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h5" className="inputLabel">
                        Source PFP NFT Address/ Ordinals Inscription ID
                      </Typography>
                      <Typography variant="body2" style={{ color: '#ff00f2' }}>
                        Pick the PFP you want to beam into a 3D avatar. Paste NFT Address or Ordinals Inscription number here.
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={nftAddress}
                        onChange={(e) => {
                          setNftAddress(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h5" className="inputLabel">
                        2nd Source PFP NFT Address/ Ordinals Inscription ID
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={nftAddress2}
                        onChange={(e) => {
                          setNftAddress2(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h5" className="inputLabel">
                        3rd Source PFP NFT Address/ Ordinals Inscription ID
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={nftAddress3}
                        onChange={(e) => {
                          setNftAddress3(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h5" className="inputLabel">
                        Source Holder Wallet Address
                      </Typography>
                      <Typography variant="body2" style={{ color: '#ff00f2' }}>
                        Paste the wallet that is holding your NFTs / Ordinals here.
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={holderAddress}
                        onChange={(e) => {
                          setHolderAddress(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h5" className="inputLabel">
                        Ethereum Destination Wallet Address
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => {
                          setRecipientAddress(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  {mintId && (
                    <Grid item xs={12}>
                      <Box className="txtInnerCmdl">
                        <Typography variant="body1">
                          Congratulations for attending the Beamit AI Alphamint!
                          Given your payment and information was entered
                          correctly, your 3D Avatar will be mintable within 10
                          days on{" "}
                          <Link href="http://alphamint.beamit.space.">
                            http://alphamint.beamit.space.
                          </Link>
                        </Typography>
                        <Typography variant="body1">
                          Please check our discord for updates. Your mint ID is{" "}
                          <Typography variant="caption" className="numbrID">
                            {mintId}
                          </Typography>
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  {!mintId &&
                  nftAddress.length > 0 &&
                  holderAddress.length > 0 &&
                  recipientAddress.length > 0 ? (
                    <Grid item xs={12}>
                      <Box className="paymentAdress">
                        <Typography variant="h5" className="hdPymnt">
                          Make your payment (payment must be made from source
                          holder Wallet Address):
                        </Typography>

                        <Box className="paymentAdressTable">
                          <Table>
                            <TableBody>
                              {paymentMethodList.map((item) => (
                                <TableRow key={item.value}> {/* Use unique value as key */}
                                  <TableCell component="td" scope="row">
                                    <Box className="paymentInfoInner">
                                      <Box className="coinName">
                                        {item?.name}
                                      </Box>
                                      <Box className="coinPrice">
                                        {item?.price}
                                      </Box>
                                      <Box className="coinValue">
                                        {item?.value}
                                      </Box>
                                    </Box>
                                  </TableCell>

                                  <TableCell component="td" scope="row">
                                    <Box className="walletAdrss">
                                      <Typography variant="body1">
                                        {item?.wallet}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Box>
                    </Grid>
                  ) : (
                    " "
                  )}

                  <Grid item xs={12}>
                    <Box className="inputfldInner">
                      <Typography variant="h4" className="inputLabel">
                        Payment Transaction Hash
                      </Typography>
                      <InputFieldCommon
                        type="text"
                        value={paymentHash}
                        onChange={(e) => {
                          setPaymentHash(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <List className="submitBtnLtt">
                      <ListItem>
                        <CustomButtonPrimary
                          type="button"
                          variant="contained"
                          color="primary"
                          className="customBtnCn"
                          onClick={handleSubmit}
                        >
                          Submit
                        </CustomButtonPrimary>
                      </ListItem>

                      <ListItem>
                        <CustomButtonPrimary
                          type="button"
                          variant="contained"
                          color="primary"
                          className="customBtnCn"
                          onClick={handleLogout}
                        >
                          Logout
                        </CustomButtonPrimary>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </HomePageStyled>
      </Wrapper>

      <MuiModalWrapper
        open={openStepModal}
        onClose={handleStepModalClose}
        title=""
      >
        <Box className="modalStepOutrSc">
          <Typography variant="body1">
            Congratulations for attending the Beamit AI Alphamint! Given your
            payment and information was entered correctly, your 3D Avatar will
            be mintable within 10 days on{" "}
            <Link href="http://alphamint.beamit.space.">
              http://alphamint.beamit.space.
            </Link>
          </Typography>
          <Typography variant="body1">
            Please check our discord for updates. Your mint ID is{" "}
            <Typography variant="caption" className="numbrID">
              {mintId}
            </Typography>
          </Typography>
        </Box>
      </MuiModalWrapper>
    </ProtectedRoute>
  );
}

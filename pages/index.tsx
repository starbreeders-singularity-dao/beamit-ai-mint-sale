/* eslint-disable react/no-array-index-key */
import CommonRadio from "@/components/CommonChecked/CommonRadio";
import assest from "@/json/assest";
import { checkedSource } from "@/json/mock/checkedSource.mock";
import { paymentMethodList } from "@/json/mock/paymentMethodList.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  checkWalletAddress,
  fetchLatestMintId,
  isAddressWhitelisted,
  register
} from "@/lib/supabase/db";
import { HomePageStyled } from "@/styles/StyledComponents/HomePageStyled";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { isAddress } from "web3-validator";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, ListItem } from "@mui/material";
import ProtectedRoute from "../components/Authentication/ProtectedRoute";

export default function Home() {
  // nft address
  //holder address
  // reciepient address
  const router = useRouter();
  const [nftAddress, setNftAddress] = useState("");
  const [holderAddress, setHolderAddress] = useState("");
  const [reciepientAddress, setReciepientAddress] = useState("");
  const [paymentHash, setPaymentHash] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const [mintId, setMintId] = useState("");
const [nftAddress2, setNftAddress2] = useState("");
const [nftAddress3, setNftAddress3] = useState("");

  // const [formErrors, setFormErrors] = useState({
  //   pfpAddress: false,
  //   sourceHolderAddress: false,
  //   destinationWalletAddress: false,
  //   paymentTxHash: false,
  //   optionSelected: false
  // });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSource(event.target.value);
  };

  function isValidEthAddress(address: any): boolean {
    return isAddress(address);
  }

  // function isValidPaymentHash(hash: string): boolean {
  //   const regex = /^0x([A-Fa-f0-9]{64})$/;
  //   return regex.test(hash);
  // }

  // function isValidBTCAddress(address: string): boolean {
  //   const regex =  /^(1[a-zA-HJ-NP-Z0-9]{25,34}|3[a-zA-HJ-NP-Z0-9]{25,34}|bc1[0-9a-z]{6,}\w{2,})$/i;
  //   return regex.test(address);
  // }
  // function isValidSolanaAddress(address: string): boolean {
  //   const regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  //   return regex.test(address);
  // }

  function validateHolderAddress(selectedSource: any): boolean {
    try {
      if (selectedSource === "BTC Ordinal") {
        return true 
        // return isValidBTCAddress(holderAddress);
        // return true;
      } else if (selectedSource === "ETH NFT") {
        return true 
        // return isValidEthAddress(holderAddress);
      } else if (selectedSource === "Solana NFT") {
        return true 
        // return isValidSolanaAddress(holderAddress);
      } else {
        return false;
      }
    } catch (error: any) {
      // console.log(error);
      return false;
    }
  }

  // function validateNftHash(): boolean {
  //   let regex: RegExp = /^/i;
  //   switch (selectedSource) {
  //     case "BTC Ordinal":
  //       // regex = /^(1[a-km-zA-HJ-NP-Z1-9]{25,34}|3[a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[0-9a-z]{1,8}[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38,87})$/i;;
  //       // break;
  //       return true 
  //     case "ETH NFT":
  //       regex = /^0x[a-fA-F0-9]{40}$/;
  //       break;
  //     case "Solana NFT":
  //       regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  //       break;
  //     default:
  //       return false;
  //   }

  //   return regex.test(nftAddress);
  // }

  const handleLogout = () => {
    try {
      const check = localStorage.getItem("whiteListAddress");
      if (check) {
        localStorage.removeItem("whiteListAddress");
        router.push("/auth/login");
      }
    } catch (error) {
      // console.log(error)
    }
  };

  const handleSubmit = async () => {
    try {
      const isWhitelistedAddress: any =
        localStorage.getItem("whiteListAddress");
      const isWhitelisted = await isAddressWhitelisted(isWhitelistedAddress);
      const checkWalletAlreadyPresent = await checkWalletAddress(
        isWhitelistedAddress
      );
      // console.log(checkWalletAlreadyPresent , isWhitelisted);
      if (checkWalletAlreadyPresent) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This wallet address is already registered.",
          confirmButtonText: "OK"
        });
        return false;
      }
      const errors = {
        optionSelected: selectedSource === "",
        pfpAddress: nftAddress === "",
        sourceHolderAddress: holderAddress === "",
        destinationWalletAddress: reciepientAddress === "",
        paymentTxHash: paymentHash === ""
      };

      // setFormErrors(errors);
      // if(formErrors)

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
          confirmButtonText: "OK"
        });
        return true;
      }

      if (isWhitelisted) {
        // let mintId = generateShortNumericCode(6)
        // console.log(mintId);
        const objData = {
          nftAddress,
          holderAddress,
          reciepientAddress,
          paymentHash,
          isWhitelistedAddress,
          selectedSource
          // mintId
        };

        // const isValidNFT = validateNftHash();

        const isValidHolderAddress = validateHolderAddress(selectedSource);
        // const isValidEth = isValidEthAddress(reciepientAddress);
        // const isValidPayment: any = isValidPaymentHash(paymentHash);
        // console.log("ethAddress", isValidNFT, isValidHolderAddress);
        // if (isValidNFT && isValidHolderAddress) {
          if ( isValidHolderAddress) {

          const create = await register(objData);

          if (create) {
            const mintedId = await fetchLatestMintId(isWhitelistedAddress);
            setMintId(mintedId);

            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "You have successfully registered.",
              confirmButtonText: "OK"
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "An error occurred while registering.",
            confirmButtonText: "OK"
          });
        }
      }

      return true;
    } catch (error) {
      // console.log(error);

      return false;
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (nftAddress) {
  //       if (!selectedSource) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Select NFT Options",
  //           text: "Invalid NFT Options",
  //           confirmButtonText: "OK"
  //         });
  //       }
  //       if (selectedSource) {
  //         const isValidNFT = validateNftHash();

  //         if (!isValidNFT) {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Validation Error",
  //             text: "Invalid NFT Address",
  //             confirmButtonText: "OK"
  //           });
  //         }
  //       }
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [nftAddress]);

  // useEffect(() => {

  //   const timeoutId = setTimeout(() => {
  
  //     if (holderAddress) {
  //       if (!selectedSource) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Select Options",
  //           text: "Invalid Options",
  //           confirmButtonText: "OK"
  //         });
  //       }else{
  //         const isValidHolder = validateHolderAddress(selectedSource);
  //         // console.log(isValidHolder);
  //         if (!isValidHolder) {
   
  //           Swal.fire({
  //             icon: "error",
  //             title: "Validation Error",
  //             text: `Invalid ${selectedSource} Holder Address`,
  //             confirmButtonText: "OK"
  //           });
  //         }
  //       }
        
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [holderAddress]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (reciepientAddress) {
        if (!selectedSource) {
          Swal.fire({
            icon: "error",
            title: "Select  Options",
            text: "Invalid  Options",
            confirmButtonText: "OK"
          });
        }
        const isValidEth = isValidEthAddress(reciepientAddress);
        if (!isValidEth) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Invalid Ethereum Address",
            confirmButtonText: "OK"
          });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [reciepientAddress]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (paymentHash) {
  //       const isValidTxHash = isValidPaymentHash(paymentHash);
  //       if (!isValidTxHash) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Validation Error",
  //           text: "Invalid Ethereum Transaction Hash",
  //           confirmButtonText: "OK"
  //         });
  //       }
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [paymentHash]);

  const [openStepModal, setopenStepModal] = useState(false);

  // const handleStepModalOpen = () => {
  //   setopenStepModal(true);
  // };
  const handleStepModalClose = () => {
    setopenStepModal(false);
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
                    {checkedSource.map((item, index) => (
                      <CommonRadio
                        name="source"
                        key={index}
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
                        value={reciepientAddress}
                        onChange={(e) => {
                          setReciepientAddress(e.target.value);
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
                  reciepientAddress.length > 0 ? (
                    <Grid item xs={12}>
                      <Box className="paymentAdress">
                        <Typography variant="h5" className="hdPymnt">
                          Make your payment (payment must be made from source
                          holder Wallet Address):
                        </Typography>

                        <Box className="paymentAdressTable">
                          <Table>
                            <TableBody>
                              {paymentMethodList.map((item, index) => (
                                <TableRow key={index}>
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
              1038
            </Typography>
          </Typography>
        </Box>
      </MuiModalWrapper>
    </ProtectedRoute>
  );
}

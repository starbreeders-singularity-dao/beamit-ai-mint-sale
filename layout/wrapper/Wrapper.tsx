/* eslint-disable no-undef */
import Seo from "@/components/Seo/Seo";
import useOnlineStatus from "@/hooks/utils/useDetectOnline";
import { WrapperStyle } from "@/styles/StyledComponents/WrapperStyle";
import { primaryColors } from "@/themes/_muiPalette";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface wrapperProps {
  children: React.ReactNode;
  imageWrapper?: string | any | undefined;
}

const Wrapper = (props: wrapperProps) => {
  const { children, imageWrapper } = props;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // useEffect(() => {
  //   if (document) {
  //     const hdrElm = document.querySelector<HTMLElement>(".main_head");
  //     const hdrHeight = hdrElm?.clientHeight;
  //     const paaddngELM = document.querySelector<HTMLElement>(".body_content");
  //     if (!!paaddngELM) {
  //       paaddngELM.style.paddingTop = hdrHeight + "px";
  //     }
  //   }
  // });
  const router = useRouter();

  const routerText = router.pathname.split("");

  routerText.shift();
  const favText = routerText.join("").toString().toUpperCase();
  const projectName = "beamit";

  useOnlineStatus();

  useEffect(() => {
    const handleResize = () => {
      const mainHead = document.querySelector(".main_head") as HTMLElement;
      const footerWrap = document.querySelector(
        ".footerWrapMainS"
      ) as HTMLElement;
      const bodyContent = document.querySelector(
        ".body_content"
      ) as HTMLElement;

      if (mainHead && footerWrap && bodyContent) {
        const mainHeadRect = mainHead.getBoundingClientRect();
        const footerWrapRect = footerWrap.getBoundingClientRect();

        const mainHeadHeight = mainHeadRect.height;
        const footerWrapHeight = footerWrapRect.height;
        const minHeight = `calc(100vh - ${mainHeadHeight}px - ${footerWrapHeight}px)`;

        bodyContent.style.minHeight = minHeight;
        bodyContent.style.paddingBottom = `${footerWrapHeight}px`;
      }
    };

    const handleScroll = () => {
      const footerWrap = document.querySelector(
        ".footerWrapMainS"
      ) as HTMLElement;
      if (footerWrap) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight) {
          footerWrap.classList.add("active");
        } else {
          footerWrap.classList.remove("active");
        }
      }
    };

    handleResize();
    handleScroll();

    const resizeListener = () => setTimeout(handleResize, 100);
    const scrollListener = () => handleScroll();

    window.addEventListener("resize", resizeListener);
    window.addEventListener("orientationchange", resizeListener);
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("orientationchange", resizeListener);
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <WrapperStyle>
      <Seo
        title={
          router.pathname === "/"
            ? `${projectName}`
            : `${projectName} || ${favText}`
        }
        canonical=""
        description=""
        url=""
        image=""
      />
      <Header />

      <Box className="shapeStickyBtm">
        <Image src={imageWrapper} width={1930} height={470} alt="no image" />
      </Box>

      <Box className="body_content">{children}</Box>

      <Footer />

      <Backdrop
        sx={{
          color: `${primaryColors?.white}`,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </WrapperStyle>
  );
};

export default Wrapper;

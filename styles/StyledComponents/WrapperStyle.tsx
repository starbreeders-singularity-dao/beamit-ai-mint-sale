import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const WrapperStyle = styled(Box)`
  strong,
  b {
    font-weight: 700;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: #00a5d0;
    display: inline-block;
    text-decoration: none;
  }

  a:hover {
    color: #00a5d0;
  }

  a:focus {
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
    color: var(--color07171E);
  }
  h1 {
    text-transform: capitalize;
  }
  p:last-child {
    margin-bottom: 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  ul li {
    padding: 0;
    position: relative;
    list-style: none;
  }

  button {
    .MuiTouchRipple-root {
      display: none;
    }
  }

  a,
  button {
    transition: 0.3s all ease-in-out 0s;
    -webkit-transition: 0.3s all ease-in-out 0s;
    -moz-transition: 0.3s all ease-in-out 0s;
  }

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="password"],
  input[type="search"],
  input[type="number"],
  input[type="tel"],
  input[type="range"],
  input[type="date"],
  input[type="month"],
  input[type="week"],
  input[type="time"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="color"],
  textarea {
    padding: 5px 10px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: 2px solid #656664;
    border-radius: 0;
  }

  select {
    background: url(/assets/images/down-arrow.svg) right 10px center no-repeat;
    background-size: 20px;
  }

  select[multiple] {
    background: transparent;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: pink;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: pink;
  }

  :-ms-input-placeholder {
    /* IE 10+ */
    color: pink;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: pink;
  }

  /* button, */
  input[type="button"],
  input[type="submit"] {
    text-align: center;
    padding: 8px 20px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    color: #fff;
    background: #51bff0;
    border: 1px solid #51bff0;
    transition: 0.3s all ease-in-out 0s;
    -webkit-transition: 0.3s all ease-in-out 0s;
    -moz-transition: 0.3s all ease-in-out 0s;
    cursor: pointer;
    display: inline-block;
    border-radius: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  button:hover,
  input[type="button"]:hover,
  input[type="submit"]:hover {
    background-color: #51bff0;
    color: #ffffff;
    outline: none;
    text-decoration: none;
  }

  .MuiButtonBase-root {
    text-transform: none !important;
  }

  .cmn_gap {
    padding: 50px 0;
  }

  .cmn_gap_top {
    padding-top: 0 !important;
  }

  .cmn_gap_btm {
    padding-bottom: 0 !important;
  }

  .cmn_head {
    margin-bottom: 50px;
    text-align: center;

    h2 {
      font-size: 40px;
      text-transform: none;
      color: #202020;
      @media (max-width: 1200px) {
      }
    }
  }

  // ====================================================

  // contact input
  .form_group {
    margin-bottom: 19px;
    label {
      display: block;
      margin-bottom: 11px;
    }
    input[type="text"],
    input[type="email"],
    input[type="url"],
    input[type="password"],
    input[type="search"],
    input[type="number"],
    input[type="tel"],
    input[type="range"],
    input[type="date"],
    input[type="month"],
    input[type="week"],
    input[type="time"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="color"],
    textarea {
      width: 100%;
      background: var(--white);
      border: 1px solid var(--colorEBEBEB);
      border-radius: 10px;
      padding: 21.5px 28px;
      font-size: 16px;

      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: var(--color748992);
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: var(--color748992);
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: var(--color748992);
      }
    }
    textarea {
      resize: none;
      height: 140px !important;
      font-family: "Work Sans";
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: #f9f9f9;
    border-radius: 44px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    width: 6px;
    background: #329691;
    border-radius: 44px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #329691;
  }

  // &::-webkit-scrollbar:vertical {
  //   display: none;
  // }

  .slick-slider {
    width: 100%;
  }

  // validation message
  .MuiFormHelperText-root {
    font-size: 16px !important;
    color: var(--colorff0000) !important;
  }

  .errSpan {
    color: red;
  }

  // ========================================
  //   .global_slick {
  //     .slick-dots {
  //       text-align: start;
  //       bottom: -65px;
  //       li {
  //         width: 14px;
  //         height: 14px;
  //         button {
  //           border: 1px solid rgba(255, 255, 255, 0.5);
  //           width: 10px;
  //           height: 10px;
  //           line-height: 10px;
  //           background: transparent;
  //           border-radius: 100%;
  //           margin: auto;

  //           &::before {
  //             font-size: 0;
  //             line-height: 10px;

  //             width: auto;
  //             height: auto;
  //             content: "";
  //             text-align: center;
  //             border: 0;
  //             opacity: 1;
  //             background: transparent;
  //             border-radius: 100%;
  //           }
  //         }
  //         &.slick-active {
  //           button {
  //             opacity: 1;
  //             background: linear-gradient(
  //               158.45deg,
  //               #0bd3d3 17.08%,
  //               #ab2aa9 64.21%,
  //               #f890e7 97.73%
  //             );
  //             &::before {
  //               // opacity: 1;
  //               // background: linear-gradient(
  //               //   158.45deg,
  //               //   #0bd3d3 17.08%,
  //               //   #ab2aa9 64.21%,
  //               //   #f890e7 97.73%
  //               // );
  //               // outline: 1px solid rgba(11, 211, 211, 1);
  //               // outline-offset: 3px;
  //               width: auto;
  //               height: auto;
  //               border: 1px solid rgba(11, 211, 211, 1);
  //               border-radius: 100%;
  //               content: "";
  //               top: -4px;
  //               left: -3px;
  //               right: -3px;
  //               bottom: -2px;
  //             }
  //           }
  //         }
  //       }
  //     }

  //     .slick-prev {
  //       background-image: url("../public/assets/images/prev.svg");
  //       background-position: center;
  //       background-repeat: no-repeat;
  //       background-size: 30px;
  //       left: -40px;
  //       width: 30px;
  //       height: 30px;
  //       &::before {
  //         content: "";
  //       }
  //       &:hover {
  //         background: url("../public/assets/images/prev2.svg") center no-repeat
  //           transparent;

  //         background-size: 30px;
  //       }
  //       &:focus {
  //         background: url("../public/assets/images/prev2.svg") center no-repeat
  //           transparent;

  //         background-size: 30px;
  //       }
  //     }
  //     .slick-next {
  //       background-image: url("../public/assets/images/next.svg");
  //       background-position: center;
  //       background-repeat: no-repeat;
  //       background-size: 30px;
  //       right: -40px;
  //       width: 30px;
  //       height: 30px;
  //       &::before {
  //         content: "";
  //       }
  //       &:hover {
  //         background: url("../public/assets/images/next2.svg") center no-repeat
  //           transparent;

  //         background-size: 30px;
  //       }
  //       &:focus {
  //         background: url("../public/assets/images/next2.svg") center no-repeat
  //           transparent;

  //         background-size: 30px;
  //       }
  //     }
  //   }

  // ==============================

  .shapeStickyBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    line-height: 0;
    z-index: -1;
    pointer-events: none;
    @media (max-width: 1199px) {
      bottom: 30px;
    }
    @media (max-width: 599px) {
      bottom: 62px;
    }
    img {
      width: 100%;
    }
  }
  .body_content {
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 1199px){
      padding-bottom: 0 !important;
    }
    > * {
      width: 100%;
    }
  }
  .MuiContainer-root {
    @media (min-width: 1200px) {
      max-width: 1000px;
      padding: 0 15px;
    }
    &.cus_container {
      @media (min-width: 1400px) {
        max-width: 1470px;
      }
    }
  }
  //   ======================
`;

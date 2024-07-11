import { primaryColors } from "@/themes/_muiPalette";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const HomePageStyled = styled(Box)`
  .homeSourceWrap {
    padding-bottom: 106px;
    @media (max-width: 899px) {
      padding-bottom: 70px;
    }
    @media (max-width: 599px) {
      padding-bottom: 40px;
    }
  }
  .homeSourceWrapTop {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 899px) {
      display: block;
    }
    .homeSourceWrapLf {
      width: 180px;
      flex-basis: 180px;
      @media (max-width: 899px) {
        width: 100%;
        flex-basis: 100%;
        margin-bottom: 20px;
      }
    }
    .homeSourceWrapRt {
      width: calc(100% - 180px);
      flex-basis: calc(100% - 180px);
      align-self: center;
      padding-left: 30px;
      @media (max-width: 899px) {
        width: 100%;
        flex-basis: 100%;
        padding: 0;
      }
      .homeSourceChckbx {
        margin-bottom: -30px;
        @media (max-width: 479px) {
          margin-bottom: -15px;
        }
      }
      .cmnChkWrappeHead {
        display: inline-block;
        margin-right: 80px;
        margin-bottom: 30px;
        @media (max-width: 1199px) {
          margin-right: 40px;
        }
        @media (max-width: 479px) {
          margin-right: 20px;
          margin-bottom: 15px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .homeSourceWrapBtm {
    display: inline-block;
    width: 100%;
    margin-top: 40px;
    @media (max-width: 599px) {
      margin-top: 30px;
    }
  }

  .inputfldInner {
    max-width: 750px;
    margin: 0 auto;
    text-align: center;
    .inputLabel {
      color: ${primaryColors?.primary};
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 1.3;
      @media(max-width: 599px){
        font-size: 15px;
      }
    }
  }

  .paymentAdress {
    .hdPymnt {
      color: ${primaryColors?.primary1};
      margin-bottom: 15px;
    }
  }

  .paymentAdressTable {
    tr {
      @media (max-width: 599px) {
        display: grid;
        padding: 0;
        border-bottom: 1px solid ${primaryColors?.primary1};
        padding: 15px 0;
      }

      td {
        padding: 0;
        border: 0;
        color: ${primaryColors?.primary1};
        font-size: 22px;
        line-height: 1.3;
        padding-right: 68px;
        @media (max-width: 1199px) {
          padding-bottom: 10px;
        }
        @media (max-width: 899px) {
          padding-right: 40px;
        }
        @media (max-width: 599px) {
          display: grid;
          padding: 0;
          padding-bottom: 5px;
        }
        &:last-child {
          padding-right: 0;
        }
      }
      &:first-child {
        @media (max-width: 599px) {
          padding-top: 0;
        }
      }
      &:last-child {
        td {
          @media (max-width: 1199px) {
            padding-bottom: 0;
          }
        }
        @media (max-width: 599px) {
          border-bottom: 0;
        }
      }
    }
  }

  .paymentInfoInner {
    display: flex;
    font-size: 22px;
    line-height: 1.3;
    color: ${primaryColors?.primary1};
    @media (max-width: 599px) {
      font-size: 16px;
    }
    .coinName {
      flex-basis: 110px;
      min-width: 110px;
      @media (max-width: 599px) {
        flex-basis: inherit;
        min-width: inherit;
      }
    }
    .coinPrice {
      flex-basis: 90px;
      min-width: 90px;
      padding-left: 10px;
      @media (max-width: 599px) {
        flex-basis: inherit;
        min-width: inherit;
      }
    }
    .coinValue {
      padding-left: 10px;
      text-align: right;
      flex-basis: 110px;
      @media (max-width: 599px) {
        flex-basis: inherit;
        min-width: inherit;
      }
    }
  }

  .walletAdrss {
    p {
      color: ${primaryColors?.primary1};
      word-break: break-all;
    }
  }

  .txtInnerCmdl{
    text-align: center;
    p{
      color: ${primaryColors?.primary1};
      a{
        color: ${primaryColors?.primary1};
        &:hover{
          color: ${primaryColors?.primary};
        }
      }
      .numbrID{
        font-size: 100%;
      }
    }
  }

  .submitBtnLtt{
    padding: 0;
    margin: 0;
      li{
        padding: 0;
        margin: 0;
        width: auto;
        display: inline-block;
        margin-right: 15px;
        &:last-child{
          margin-right: 0;
        }
        .MuiButtonBase-root{
          @media(max-width: 479px){
            padding: 10px 16px;
            min-width: 120px;
          }
        }
      }
  }

`;

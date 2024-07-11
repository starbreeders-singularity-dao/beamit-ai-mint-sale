import { primaryColors } from "@/themes/_muiPalette";
import { Dialog, styled } from "@mui/material";

export const CustomDialog = styled(Dialog)`
  &.cmnModalSectns{
    .MuiDialogContent-root{
        @media(max-width: 479px){
            padding-top: 5px;
        }
    }
    /* .MuiBackdrop-root{
        background-color: rgba(255, 255, 255, 0.5);
    } */
    .MuiPaper-root{
        border: 2px solid ${primaryColors?.white};
        background: ${primaryColors?.black};
        max-height: calc(100% - 64px);
        max-width: 600px;
        height: auto;
        margin: 32px;
        @media(max-width: 599px){
            margin: .625em;
        }
        .dialogBoxStack{
            padding: 10px 18px 0 18px;
        }
        .dialogBoxIcon{
            background: transparent;
            padding: 0;
            margin: 0;
            svg{
                font-size: 30px;
                color: ${primaryColors?.white};
            }
        }
    }
  }

  .modalStepOutrSc{
    p{
        color: ${primaryColors?.primary1};
        a{
            color: ${primaryColors?.primary};
            &:hover{
                color: ${primaryColors?.primary1};
            }
        }
        .numbrID{
            font-size: 100%;
        }
    }
  }
`;

import { CustomDialog } from "@/styles/StyledComponents/CustomDialog";
import { borderRadius } from "@/themes/themeConstant";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

interface MuiModalWrapperProps {
  open: boolean;
  onClose?: () => void;
  scroll?: "paper" | "body";
  children: JSX.Element | JSX.Element[];
  title: string;
  customClass?: string;
}

export default function MuiModalWrapper({
  open,
  onClose,
  scroll,
  children,
  customClass,
  title
}: MuiModalWrapperProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CustomDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="responsive-dialog-title"
      className={customClass || "cmnModalSectns"}
      PaperProps={{
        style: {
          borderRadius
        }
      }}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          className="dialogBoxStack"
        >
          <Typography className="dialogBoxTitle">{title}</Typography>
          <IconButton className="dialogBoxIcon" onClick={onClose} autoFocus>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent>{children}</DialogContent>
    </CustomDialog>
  );
}

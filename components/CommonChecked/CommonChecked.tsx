import { CommonCheckedStyled } from "@/styles/StyledComponents/CommonCheckedStyled";
import WithCheck from "@/ui/Icons/WithCheck";
import WithoutCheck from "@/ui/Icons/WithoutCheck";
import {
  Box,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme
} from "@mui/material";

interface CommonCheckedInterface {
  label: string;
}

function CommonChecked({ label }: CommonCheckedInterface) {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <CommonCheckedStyled className="cmnChkWrappeHead">
      <Box className="cmnChkWrapper">
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <WithoutCheck
                  IconHeight={isLgScreen ? "35" : "20"}
                  IconWidth={isLgScreen ? "35" : "20"}
                />
              }
              checkedIcon={
                <WithCheck
                  IconHeight={isLgScreen ? "35" : "20"}
                  IconWidth={isLgScreen ? "35" : "20"}
                />
              }
            />
          }
          label={label}
        />
      </Box>
    </CommonCheckedStyled>
  );
}

export default CommonChecked;

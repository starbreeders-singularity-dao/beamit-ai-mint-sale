/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { CommonCheckedStyled } from "@/styles/StyledComponents/CommonCheckedStyled";
import WithCheck from "@/ui/Icons/WithCheck";
import WithoutCheck from "@/ui/Icons/WithoutCheck";
import {
  Box,
  FormControlLabel,
  Radio,
  useMediaQuery,
  useTheme
} from "@mui/material";

interface CommonRadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CommonRadio({
  label,
  name,
  value,
  checked,
  onChange
}: CommonRadioProps) {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <CommonCheckedStyled className="cmnChkWrappeHead">
      <Box className="cmnChkWrapper">
        <FormControlLabel
          control={
            <Radio
              icon={
                <WithoutCheck
                  IconHeight={isLgScreen ? "26" : "20"}
                  IconWidth={isLgScreen ? "26" : "20"}
                />
              }
              checkedIcon={
                <WithCheck
                IconHeight={isLgScreen ? "26" : "20"}
                IconWidth={isLgScreen ? "26" : "20"}
                />
              }
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
            />
          }
          label={label}
        />
      </Box>
    </CommonCheckedStyled>
  );
}

export default CommonRadio;

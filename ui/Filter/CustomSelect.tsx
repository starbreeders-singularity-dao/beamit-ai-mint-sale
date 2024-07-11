/* eslint-disable react/destructuring-assignment */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectProps } from "@mui/material/Select";

const CustomSelectWrapper = styled(Select)`
  &.MuiOutlinedInput-root {
    background-color: ${primaryColors.white};
    padding: 10px 12.5px;
    width: 100%;
    border-radius: 8px;
    /* border: 1px solid ${primaryColors.borderprimary}; */
    min-width: 130px;

    .MuiSelect-select {
      padding: 0;
      /* padding-right: 40px; */
      color: ${primaryColors.black};
      font-size: 16px;
      font-weight: 500;
      text-align: left;
    }
    fieldset {
      border: 1px solid ${primaryColors.borderprimary};
    }
    .MuiSelect-icon {
      padding: 0;
      line-height: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .menu_item {
    &.MuiMenuItem-root {
      color: ${primaryColors.black};
    }
  }
`;
interface CustomSelectProps {}
const CustomSelect: React.FC<CustomSelectProps & SelectProps> = ({
  ...props
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto"
        // backgroundColor:"#000"
      }
    }
  };

  return (
    <CustomSelectWrapper
      displayEmpty
      input={<OutlinedInput />}
      IconComponent={props?.IconComponent}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
      // className={props.className}
      {...props}
    >
      {/* {dataset.map((name) => (
        <MenuItem key={name} value={name} className="menu_item">
          {name}
        </MenuItem>
      ))} */}
      {props.children}
    </CustomSelectWrapper>
  );
};

export default CustomSelect;

/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import React, { useEffect } from "react";

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
    input {
      + div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .menu_item {
    &.MuiMenuItem-root {
      color: ${primaryColors.black};
    }
  }
`;

interface SelectProps {
  onDataCallback?: (data: string | undefined) => void;
  dataset: string[];
  Icon?: JSX.Element | any;
  defaultValueDisplay: string;
  className?: string;
}
const SortDropdown = ({
  onDataCallback,
  dataset,
  Icon,
  defaultValueDisplay,
  className
}: SelectProps) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto"
        // backgroundColor:"#000"
      }
    }
  };

  const [personName, setPersonName] = React.useState<string>();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      value
    );
  };

  useEffect(() => {
    if (personName !== "") {
      if (onDataCallback !== undefined) {
        onDataCallback(personName);
      }
    }
  }, [onDataCallback, personName]);
  return (
    <CustomSelectWrapper
      displayEmpty
      value={personName}
      onChange={(e: any) => handleChange(e)}
      input={<OutlinedInput />}
      IconComponent={Icon}
      renderValue={(selected: any) => {
        if (!selected) {
          return { defaultValueDisplay };
        }

        return selected;
      }}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
      className={className}
    >
      {dataset.map((name) => (
        <MenuItem key={name} value={name} className="menu_item">
          {name}
        </MenuItem>
      ))}
    </CustomSelectWrapper>
  );
};

export default SortDropdown;

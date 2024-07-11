/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import {
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack
} from "@mui/material";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import DropDownIcon from "../Icons/DropdownIcon";

const CustomSelectWrapper = styled(Select)`
  /* width: fit-content; */
  &.MuiOutlinedInput-root {
    background-color: ${primaryColors.white};
    padding: 10px 12.5px;
    /* width: 200px; */
    border-radius: 8px;

    min-width: 200px;
    .MuiSelect-select {
      padding: 0;
      /* padding-right: 40px; */
      color: ${primaryColors.black};
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      img {
        margin-right: 8px;
      }

      .MuiStack-root {
        &.pending {
          color: ${primaryColors.pendingTextColor};
        }
        &.collected {
          color: ${primaryColors.deepGreen};
        }
        &.rejected {
          color: ${primaryColors.danger_text};
        }
      }
    }
    fieldset {
      border: 1px solid ${primaryColors.borderprimary};
    }
    .MuiSelect-icon {
      /* position: static; */
      padding: 0;
      line-height: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
interface datasetInterface {
  name: string;
  icon: string;
}
interface SelectProps {
  onDataCallback?: (data: string | undefined) => void;
  dataset: datasetInterface[];
}
const Filter1Dropdown = ({ onDataCallback, dataset }: SelectProps) => {
  const menuItemStyle = {};
  const MenuProps = {
    PaperProps: {
      sx: {
        borderRadius: "8px",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.06)",
        border: "1px solid #DBE0E8",
        filter: "none",
        marginTop: "26px",
        "& .MuiList-root": {
          padding: "4px"
        },
        "& .MuiMenuItem-root": {
          padding: "8px",
          borderRadius: "4px",
          img: {
            marginRight: "8px"
          },
          "&:nth-child(1)": {
            color: `${primaryColors?.warning_text}`,

            marginBottom: "4px",
            "&:hover": {
              backgroundColor: `${primaryColors?.pendingColor}`
            }
          },
          "&:nth-child(2)": {
            color: `${primaryColors?.text_success}`,

            marginBottom: "4px",
            "&:hover": {
              backgroundColor: `${primaryColors?.lightGreen}`
            }
          },
          "&:nth-child(3)": {
            color: `${primaryColors?.textDanger}`,

            "&:hover": {
              backgroundColor: `${primaryColors?.dangerColor}`
            }
          }
        }
      }
    }
  };

  const [personName, setPersonName] = React.useState<datasetInterface>(
    dataset.at(0)!
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      dataset.filter((data) => data.name === value).at(0)!
    );
  };

  useEffect(() => {
    if (personName?.name !== "") {
      if (onDataCallback !== undefined) {
        onDataCallback(personName?.name);
      }
    }
  }, [onDataCallback, personName]);

  const ref = useRef<HTMLSelectElement>(null);
  return (
    <CustomSelectWrapper
      displayEmpty
      ref={ref}
      value={personName}
      onChange={(e: any) => handleChange(e)}
      input={<OutlinedInput />}
      IconComponent={(props) => (
        <IconButton {...props}>
          <DropDownIcon />
        </IconButton>
      )}
      className="select_menu"
      renderValue={(selected) => {
        if (!selected) {
          return (
            <Stack
              direction="row"
              className={
                personName.name === "Pending"
                  ? "pending"
                  : personName.name === "Collected"
                  ? "collected"
                  : "rejected"
              }
            >
              <Image src={dataset[0]?.icon} alt="" /> {dataset[0]?.name}
            </Stack>
          );
        }

        return (
          <Stack
            direction="row"
            className={
              personName.name === "Pending"
                ? "pending"
                : personName.name === "Collected"
                ? "collected"
                : "rejected"
            }
          >
            <Image src={personName?.icon} alt="" width={20} height={20} />{" "}
            {personName?.name}
          </Stack>
        );
      }}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
    >
      {dataset.map((name) => (
        <MenuItem
          key={name.name}
          value={name.name}
          className="menu_item"
          style={menuItemStyle}
          disableRipple
        >
          <img src={name.icon} alt="" /> {name.name}
        </MenuItem>
      ))}
    </CustomSelectWrapper>
  );
};

export default Filter1Dropdown;

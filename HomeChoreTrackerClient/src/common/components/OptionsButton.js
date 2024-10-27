import React, { useState } from "react";

import { Button, ButtonGroup, MenuItem, Menu } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

export const OptionsButton = ({ label, items }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const openMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup variant="contained" onClick={openMenu}>
        <Button>{label}</Button>
        <Button sx={{ px: 0 }}>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Menu
        id="options-menu"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuAnchorEl)}
        onClose={closeMenu}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
            },
          },
        }}
      >
        {items.map(({ label, onClick }) => (
          <MenuItem key={label} onClick={() => closeMenu() && onClick()}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default OptionsButton;

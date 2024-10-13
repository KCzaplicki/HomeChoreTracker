import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useAuth } from "../../features/auth/contexts/AuthContext";
import { Logout, Person } from "@mui/icons-material";

const navLinks = [
  { name: "Chores", path: "/chores" },
  { name: "Users", path: "/users" },
];

const AppHeader = () => {
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);

  const { isAuthenticated, clearAuthentication } = useAuth();
  const navigate = useNavigate();

  const handleAccountMenu = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleAccountMenuClose();

    clearAuthentication();
    navigate("/");
  };

  return (
    <Toolbar disableGutters>
      <Link component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
          }}
        >
          Home Chore Tracker
        </Typography>
      </Link>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        {isAuthenticated &&
          navLinks.map((navLink) => (
            <NavButton
              key={navLink.name}
              component={RouterLink}
              to={navLink.path}
            >
              {navLink.name}
            </NavButton>
          ))}
      </Box>
      {!isAuthenticated && (
        <Box sx={{ flexGrow: 0 }}>
          <NavButton component={RouterLink} to="/login">
            Login
          </NavButton>
        </Box>
      )}
      {isAuthenticated && (
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            aria-label="current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: 32 }} />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={accountMenuAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(accountMenuAnchorEl)}
            onClose={handleAccountMenuClose}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 200,
                },
              },
            }}
          >
            <MenuItem
              component={RouterLink}
              to="/profile"
              onClick={handleAccountMenuClose}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <Typography>Profile</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Toolbar>
  );
};

const NavButton = styled(Button)`
  margin: 16px 8px;
  color: white;
  display: block;
  text-decoration: none;
`;

export default AppHeader;

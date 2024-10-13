import React from "react";
import { Toolbar, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";

const navLinks = [
  { name: "Chores", path: "/chores" },
  { name: "Users", path: "/users" },
];

const AppHeader = () => {
  return (
    <Toolbar disableGutters>
      <Link component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
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
        {navLinks.map((navLink) => (
          <NavButton key={navLink} component={RouterLink} to={navLink.path}>
            {navLink.name}
          </NavButton>
        ))}
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <NavButton component={RouterLink} to="/login">
          Login
        </NavButton>
      </Box>
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

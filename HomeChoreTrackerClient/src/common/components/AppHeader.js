import React from "react";
import { Toolbar, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const pages = [
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
        {pages.map((page) => (
          <Button
            key={page}
            component={RouterLink}
            to={page.path}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              textDecoration: "none",
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </Toolbar>
  );
};

export default AppHeader;

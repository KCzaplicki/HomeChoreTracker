import React from "react";

import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";

const AddActivityForm = () => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Activity name"
        size="small"
        variant="outlined"
        required
        fullWidth
      />
      <Button variant="contained">Add</Button>
    </Stack>
  );
};

export default AddActivityForm;

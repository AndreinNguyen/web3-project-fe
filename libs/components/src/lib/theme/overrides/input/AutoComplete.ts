import { Theme } from "@mui/material";

export default function AutoComplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-root": {
            padding: "4.5px",
          },
        },
        endAdornment: {
          top: "auto",
        },
      },
    },
  };
}

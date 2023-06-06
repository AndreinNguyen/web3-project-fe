import { Theme } from "@mui/material";

export default function Popper(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          color: "#ffffff",
        },
      },
    },
  };
}

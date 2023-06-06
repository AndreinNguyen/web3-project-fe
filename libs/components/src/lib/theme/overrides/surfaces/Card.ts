import { Theme } from "@mui/material";

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "16px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          color: "#FAFAFA",
        },
      },
    },
  };
}

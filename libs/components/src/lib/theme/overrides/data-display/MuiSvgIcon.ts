import { Theme } from "@mui/material";

export default function MuiSvgIcon(theme: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // color: "white",
        },
        colorPrimary: {
          // color: "#FCFCFD",
        },
        fontSizeSmall: {
          fontSize: "20px",
        },
      },
    },
  };
}

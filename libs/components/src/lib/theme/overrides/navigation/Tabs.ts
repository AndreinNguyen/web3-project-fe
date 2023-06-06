import { Theme } from "@mui/material";

export default function Tabs(theme: Theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          // color: "#FAFAFA",
        },
      },
    },
  };
}

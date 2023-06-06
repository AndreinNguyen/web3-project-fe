import { Theme } from "@mui/material";

export default function Divider(theme: Theme) {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#434343",
        },
      },
    },
  };
}

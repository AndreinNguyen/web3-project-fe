import { Theme } from "@mui/material";

export default function (theme: Theme) {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
        maxWidthLg: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: 1000,
          },
        },

        maxWidthMd: {
          "&.MuiContainer-maxWidthMd": {
            maxWidth: 715,
          },
        },
      },
    },
  };
}

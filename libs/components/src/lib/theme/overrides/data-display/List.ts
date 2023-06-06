import { Theme } from "@mui/material";

export default function MuiListItemIcon(theme: Theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "white",
          minWidth: "28px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            // backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    },
  };
}

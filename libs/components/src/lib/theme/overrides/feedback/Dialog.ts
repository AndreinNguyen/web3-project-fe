import { Theme } from "@mui/material";

export default function Dialog(theme: Theme) {
  return {
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
  };
}

// ----------------------------------------------------------------------

import { Theme } from "@mui/material";

export default function (theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            "& svg": { color: theme.palette.text.disabled },
          },
          background: theme.palette.grey[100],
          padding: 12,
          borderRadius: 12,
        },
        input: {
          "&::placeholder": {
            opacity: 1,
            color: "#939393",
          },
          padding: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: theme.palette.grey[100],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[100],
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
          "&.Mui-focused": {
            background: theme.palette.primary.main,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before": {
            borderBottomColor: theme.palette.grey[100],
          },
          border: "1px solid #4D4D4D",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          borderRadius: "12px",
          input: {
            // padding: '5px',
            padding: 0,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  };
}

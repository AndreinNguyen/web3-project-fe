import { Theme } from "@mui/material";

export default function Button(theme: Theme) {
  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // padding: "8px 20px",
          textTransform: "none",
          // color: theme.palette.text.primary,
        },
        contained: {
          // color: theme.palette.text.primary,
        },
        // sizeLarge: {
        //   fontSize: "0.9375rem",
        //   lineHeight: "1.75",
        //   fontWeight: 500,
        //   padding: "8px 22px",
        // },
        sizeMedium: {
          fontSize: "1.25rem",
          lineHeight: "1.75",
          fontWeight: 500,
          padding: "12px 36px",
        },
        sizeSmall: {
          fontSize: "1rem",
          lineHeight: "1.75",
          fontWeight: 500,
          padding: "8px 16px",
          minWidth: "50px",
        },

        containedInherit: {
          // color: theme.palette.grey[800],
        },
        containedPrimary: {
          // boxShadow: theme.palette.primary.main,
        },
        containedSecondary: {
          // boxShadow: theme.palette.secondary.main,
        },
        textInherit: {
          "&:hover": {
            // backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}

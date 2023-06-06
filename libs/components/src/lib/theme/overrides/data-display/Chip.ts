import { Theme } from "@mui/material";
// import { HEADING_FONT } from "../../typography";

export default function (theme: Theme) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "600",
          // fontFamily: HEADING_FONT,
          border: `1.5px solid ${theme.palette.primary.main}`,
          borderRadius: "12px",
        },
        outlined: {
          color: "#ffffff",
          padding: 0,
        },
        deletable: {
          backgroundColor: theme.palette.grey[100],
        },
      },
    },
  };
}

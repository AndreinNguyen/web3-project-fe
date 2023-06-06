import { Theme } from "@mui/material";

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingTop: 4,
          paddingBottom: 4,
          // "&.Mui-disabled": {
          // "& svg": { color: theme.palette.text.disabled },
          // },
          // background: theme.palette.grey[100],
          // padding: 12,
          // borderRadius: "12px",
        },
        outlined: {
          // color: "#ffffff",
          // padding: 0,
        },
      },
    },
  };
}

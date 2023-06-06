import { Theme } from "@mui/material";

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          // color: "#FAFAFA",
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          large: "p",
          medium: "p",
          small: "p",
          tiny: "p",
          article: "p",
        },
      },
    },
  };
}

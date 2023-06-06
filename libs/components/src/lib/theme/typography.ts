declare module "@mui/material/styles" {
  interface TypographyVariants {
    large?: React.CSSProperties;
    medium?: React.CSSProperties;
    small?: React.CSSProperties;
    tiny?: React.CSSProperties;
    article?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    large?: React.CSSProperties;
    medium?: React.CSSProperties;
    small?: React.CSSProperties;
    tiny?: React.CSSProperties;
    article?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h6: true;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    caption: false;
    large: true;
    medium: true;
    small: true;
    tiny: true;
    article: true;
  }
}

export const BODY_FONT = "var(--bai-jamjuree)";
export const HEADING_FONT = "var(--bai-jamjuree)";

const typography = {
  htmlFontSize: 10,
  // fontFamily: ["var(--inria-san)", "var(--irish-grover)"].join(","),
  fontFamily: ["var(--bai-jamjuree)"].join(","),
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightMedium: "500",
  fontWeightBold: "700",
  h1: {
    fontFamily: HEADING_FONT,
    fontSize: "64px",
    lineHeight: "38px",
  },
  h2: {
    fontFamily: HEADING_FONT,
    fontSize: "48px",
    lineHeight: "32px",
  },
  h3: {
    fontFamily: HEADING_FONT,
    fontSize: "40px",
    lineHeight: "32px",
  },
  h4: {
    fontFamily: HEADING_FONT,
    fontSize: "20px",
    lineHeight: "26px",
  },

  h5: {
    fontFamily: HEADING_FONT,
    fontSize: "18px",
    lineHeight: "24px",
  },
  h6: {
    fontFamily: HEADING_FONT,
    fontSize: "14px",
    lineHeight: "20px",
  },
  button: {
    fontFamily: HEADING_FONT,
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
  },
  // disable default variant of Mui
  body1: undefined,
  body2: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
  caption: undefined,
  //
  large: {
    fontFamily: BODY_FONT,
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "600",
  },
  medium: {
    fontFamily: BODY_FONT,
    fontSize: "14px",
    lineHeight: "20px",
  },
  small: {
    fontFamily: BODY_FONT,
    fontSize: "12px",
    lineHeight: "16px",
  },
  tiny: {
    fontFamily: BODY_FONT,
    fontSize: "10px",
    lineHeight: "14px",
  },
};

export default typography;

import { Button, ButtonProps } from "@mui/material";
// import { Bebas_Neue } from "@next/font/google";

// const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

/* eslint-disable-next-line */
export interface ButtonCustomProps extends ButtonProps {
  isItalic?: boolean;
  component?: string;
  target?: "_blank" | "_self" | "_top" | "parent";
}

export function ButtonCustom(props: ButtonCustomProps) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        color: "#000000",
        boxShadow: "7px 7px 0px #000000",
        height: 60,
        fontSize: { lg: 36, xs: 28 },
        border: "3px solid #000000",
        transform: props.isItalic ? "rotate(3.18deg)" : undefined,
        fontFamily: "var(--bebas-neue)",

        "&:hover": {
          border: "3px solid #000000",
          boxShadow: "7px 7px 0px #000000",
        },
        ...props.sx,
      }}
      // className={bebasNeue.className}
    >
      {props.children}
    </Button>
  );
}

export default ButtonCustom;

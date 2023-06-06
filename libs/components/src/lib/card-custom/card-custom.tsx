import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { Bebas_Neue } from "@next/font/google";
import { ReactNode } from "react";

// const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

/* eslint-disable-next-line */
export interface CardCustomProps extends CardProps {
  headerBackgroundColor?: string;
  title?: string;
  content?: ReactNode;
}

const PADDING = 4;

export function CardCustom(props: CardCustomProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "7px 7px 0px #000000",
        border: "3px solid #000000",
        borderRadius: "7px",
        ...props.sx,
      }}
    >
      <CardHeader
        sx={{
          borderBottom: "3px solid #000000",
          backgroundColor: props.headerBackgroundColor,
          padding: PADDING,
        }}
        titleTypographyProps={{
          sx: {
            fontSize: 34,
            color: "#ffffff",
            fontFamily: "var(--bebas-neue)",
            lineHeight: 1,
          },
          // className: bebasNeue.className,
        }}
        title={props.title}
      />
      <CardContent sx={{ padding: PADDING }}>
        <Typography
          component={typeof props.content === "string" ? "p" : "div"}
          color="text.secondary"
        >
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardCustom;

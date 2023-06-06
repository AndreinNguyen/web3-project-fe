import { Typography, styled, ListItemText, Container } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import Link from "next/link";
import { FOOTER_HEIGHT } from "../layout/layout";
// import { Bebas_Neue } from "@next/font/google";

// const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const FooterStyled = styled("footer")(({ theme }) => ({
  backgroundColor: "#2B6065",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 15,
  paddingTop: 15,
  minHeight: FOOTER_HEIGHT,
  [theme.breakpoints.up("lg")]: {},
}));

// interface ListItemWithNextLinkProps {
//   href: string;
//   children: React.ReactNode;
// }

// const ListItemWithNextLink = ({
//   children,
//   href,
// }: ListItemWithNextLinkProps) => {
//   return (
//     <ListItemButton LinkComponent={Link} href={href}>
//       <ListItemText sx={{ fontWeight: 700, fontSize: 14 }}>
//         {children}
//       </ListItemText>
//     </ListItemButton>
//   );
// };

// const FlexStyled = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "flex-start",
//   padding: 20,
//   flexDirection: "column",
//   gap: 10,
//   minHeight: 200,
//   [theme.breakpoints.up("lg")]: {
//     gap: 50,
//     paddingTop: 50,
//     flexDirection: "row",
//   },
// }));

function Footer() {
  return (
    <FooterStyled>
      <Container maxWidth={"lg"}>
        <Typography
          fontWeight={400}
          color="white"
          variant="h6"
          textAlign="center"
          gutterBottom
          // className={bebasNeue.className}
          fontSize={20}
          fontFamily="var(--bebas-neue)"
          alignContent="center"
          sx={{ opacity: 0.5 }}
        >
          © 2023 SIX. All right reserved.
        </Typography>
      </Container>
    </FooterStyled>
  );
}

export default Footer;

import { styled } from "@mui/material";
import Footer from "../footer/footer";

export const APP_BAR_MOBILE = 44;
export const APP_BAR_DESKTOP = 72;
export const FOOTER_HEIGHT = 60;

/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

const RootStyled = styled("div")(({ theme }) => ({
  minHeight: "100%",
  overflow: "hidden",
  display: "flex",
  flex: 1,
  flexDirection: "column",
}));

const MainStyle = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: `calc(100vh - ${APP_BAR_MOBILE}px - ${FOOTER_HEIGHT}px)`, //calc(100% - 80px)
  // paddingBottom: theme.spacing(22),
  // paddingTop: APP_BAR_MOBILE,
  backgroundColor: theme.palette.background.default,
  fontSize: 16,
  [theme.breakpoints.up("lg")]: {
    fontSize: 20,
    minHeight: `calc(100vh - ${APP_BAR_DESKTOP}px - ${FOOTER_HEIGHT}px)`, //calc(100% - 80px)
    // paddingTop: APP_BAR_DESKTOP,
  },
}));

export function Layout({ children, header }: LayoutProps) {
  return (
    <RootStyled>
      {header}
      <MainStyle>{children}</MainStyle>
      <Footer />
    </RootStyled>
  );
}

export default Layout;

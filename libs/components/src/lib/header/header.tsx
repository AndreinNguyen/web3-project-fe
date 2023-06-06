import {
  AppBar,
  AppBarProps,
  Box,
  Container,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_BAR_MOBILE, APP_BAR_DESKTOP } from "../layout/layout";
// import { Inria_Sans } from "@next/font/google";
import { useModal } from "mui-modal-provider";
import Link from "next/link";

import { Link as MUILink } from "@mui/material";
import Image from "next/image";
import ModalMobileHeader from "../modal-mobile-header/modal-mobile-header";
import { HTMLAttributeAnchorTarget } from "react";

// const inriaSans = Inria_Sans({ weight: ["400", "700"], subsets: ["latin"] });

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isTransparentBackground",
  name: "AppBarStyled",
  slot: "Root",
})<AppBarProps & { isTransparentBackground: boolean }>(
  ({ theme, isTransparentBackground }) => ({
    boxShadow: "none",
    width: "100%",
    zIndex: 1,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#000000",
    transform: "translateY(0)",
    transition: "transform .35s ease-in-out,background-color .75s",
  })
);

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APP_BAR_DESKTOP,
  },
}));

/* eslint-disable-next-line */
export interface HeaderProps {}

export type MenuItem = {
  url: string;
  label: string;
  target?: HTMLAttributeAnchorTarget;
};

const menuItems: MenuItem[] = [
  { url: "/", label: "Home" },
  { url: "/", label: "Dashboard" },
  { url: "/", label: "Ecosystem" },
  {
    url: "https://cau-vang.gitbook.io/cau-vang/",
    label: "Docs",
    target: "_blank",
  },
];

export function Header(props: HeaderProps) {
  // const { ref, inView } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  //   initialInView: true,
  // });

  const { showModal } = useModal();

  return (
    <>
      {/* <ObserverDom ref={ref} className="ObserverDom" /> */}
      <AppBarStyled position="static" isTransparentBackground={false}>
        <Container maxWidth={"lg"}>
          <ToolbarStyled>
            {/* Start mobile  */}
            <Box
              className="navbar-mobile"
              display={{ xs: "flex", lg: "none" }}
              justifyContent="space-between"
              width="100%"
            >
              <Box className="navbar-mobile__left">
                <IconButton
                  className="menu-icon-mobile"
                  sx={{ color: "text.primary" }}
                >
                  <Link href={"/"}>
                    <Image
                      src="/svgs/cauvang-logo.svg"
                      alt="Artisan verse logo"
                      width={120}
                      height={30}
                    />
                  </Link>
                </IconButton>
              </Box>
              <Box className="navbar-mobile__right" display="flex">
                <IconButton
                  onClick={() => {
                    showModal(ModalMobileHeader, { menuItems });
                  }}
                  className="menu-icon-mobile"
                  sx={{ color: "text.primary" }}
                >
                  <MenuIcon fontSize="small" sx={{ color: "#ffffff" }} />
                </IconButton>
              </Box>
            </Box>
            {/* End mobile */}
            {/* Start desktop */}
            <Box
              className="navbar-desktop"
              sx={{ display: { xs: "none", lg: "inherit" } }}
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <Box sx={{ cursor: "pointer" }}>
                <Link href={"/"}>
                  <Image
                    src="/svgs/cauvang-logo.svg"
                    alt="Cau Vang logo"
                    width={120}
                    height={50}
                  />
                </Link>
              </Box>

              <Box display="flex" alignItems="center">
                {menuItems.map((item, index) => {
                  // const isActive = pathname.includes(item.url);
                  // const isActive = false;

                  return (
                    <MUILink
                      key={item.url}
                      href={item.url}
                      variant="h5"
                      fontWeight={500}
                      underline="none"
                      // className={inriaSans.className}
                      sx={{
                        px: 2,
                        color: "#FFFFFF",
                        // ":hover": {
                        //   scale: "1.25",
                        //   bgcolor: "transparent",
                        // },
                        // transition: "0.3s",
                        fontFamily: "var(--inria-sans)",
                      }}
                      component={Link}
                      target={item.target}
                    >
                      {item.label}
                    </MUILink>
                  );
                })}
              </Box>
            </Box>
            {/* End desktop */}
          </ToolbarStyled>
        </Container>
      </AppBarStyled>
    </>
  );
}

export default Header;

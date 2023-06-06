import { Box, List, ListItemText } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../custom-dialog/custom-dialog";
import { MenuItem } from "../header/header";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import ConnectWallet from "../connect-wallet/connect-wallet";
/* eslint-disable-next-line */
export interface ModalMobileHeaderProps {
  menuItems?: MenuItem[];
}

export function ModalMobileHeader(props: ModalMobileHeaderProps) {
  const { menuItems } = props;

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomDialog
      {...props}
      open={open}
      maxWidth="xs"
      fullWidth
      handleClose={handleClose}
      onClose={handleClose}
      title=""
    >
      <List>
        {menuItems?.map((el) => (
          <Link href={el.url} target={el.target}>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={handleClose}
            >
              <ListItemText primary={el.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Box padding={3}>
        <ConnectWallet fullWidth />
      </Box>
    </CustomDialog>
  );
}

export default ModalMobileHeader;

import Button from "@mui/material/Button";
import type { ButtonProps as ButtonPropsMui } from "@mui/material/Button";

import { ConnectKitButton } from "connectkit";

/* eslint-disable-next-line */
export interface ConnectWalletProps extends ButtonPropsMui {}

export function ConnectWallet(props: ConnectWalletProps) {
  return (
    <div>
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, isConnecting }) => {
          return (
            <Button
              variant="outlined"
              {...props}
              disabled={isConnecting}
              size="small"
              color="secondary"
              sx={{
                textTransform: "capitalize",
                marginRight: "25px",
              }}
              onClick={show}
            >
              {isConnected ? truncatedAddress : "Connect wallet"}
            </Button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}

export default ConnectWallet;

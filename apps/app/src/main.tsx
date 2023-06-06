import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Buffer } from "buffer";

import App from "./app/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@root/utils";
import { HeaderApp, Layout, Theme } from "@root/components";
import { ConnectKitProvider } from "connectkit";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>
          <Theme>
            <Layout header={<HeaderApp />}>
              <App />
              <ToastContainer theme="light" />
            </Layout>
          </Theme>
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </StrictMode>
);

window.Buffer = Buffer;

import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { Theme } from "@root/components";
import {
  Inria_Sans,
  Irish_Grover,
  Bebas_Neue,
  Bai_Jamjuree,
} from "@next/font/google";
import ModalProvider from "mui-modal-provider";
import { DefaultSeoProps, DefaultSeo } from "next-seo";
import { NextPage } from "next";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@root/utils";
import { ConnectKitProvider } from "connectkit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SEO: DefaultSeoProps = {
  titleTemplate: "%s | $SIX",
  defaultTitle: "$SIX",
  description: "Super Deflationary - Multi-level Referral - Real Yield Token",
  twitter: {
    cardType: "summary_large_image",
    handle: "@root",
    site: "@root",
  },
  openGraph: {
    title: "🥇 Super Deflationary - Multi-level Referral - Real Yield Token",
    description: "Super Deflationary - Multi-level Referral - Real Yield Token",
    images: [{ url: "/images/banner.png" }],
  },
};

const irishGrover = Irish_Grover({
  weight: "400",
  subsets: ["latin"],
  variable: "--irish-grover",
});
const inriaSans = Inria_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--inria-sans",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--bebas-neue",
});
const bai_Jamjuree = Bai_Jamjuree({
  weight: "400",
  subsets: ["latin"],
  variable: "--bebas-neue",
});

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>;
  /** render component without all layouts */
  pure?: true;
  /** is mini program */
  mp?: boolean;
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC]
   * */
  /**
   * Meta component for page, hacky solution for static build page to avoid `PersistGate` which blocks the page from rendering
   */
  Meta?: React.FC<React.PropsWithChildren<unknown>>;
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cau Vang</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Cau Vang is a community-first project on Optimism, backed by nothing except the love, passion and creativity of blockchain users and degens!"
        />
        <meta name="theme-color" content="#1FC7D4" />
        {(Component as NextPageWithLayout).mp && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            src="https://public.bnbstatic.com/static/js/mp-webview-sdk/webview-v1.0.0.min.js"
            id="mp-webview"
          />
        )}
        <link rel="preload" href="/images/intro-bg.png" as="image" />
      </Head>
      <DefaultSeo {...SEO} />

      <main
        className={`${inriaSans.className} ${inriaSans.variable} ${irishGrover.variable} ${bebasNeue.variable} ${bai_Jamjuree.variable}`}
      >
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <Theme>
              <ModalProvider>
                <Component {...pageProps} />
                <ToastContainer theme="light" position="bottom-right" />
              </ModalProvider>
            </Theme>
          </ConnectKitProvider>
        </WagmiConfig>
      </main>
    </>
  );
}

export default CustomApp;

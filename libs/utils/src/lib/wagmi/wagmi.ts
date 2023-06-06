import { configureChains, createClient, createStorage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { publicProvider } from "wagmi/providers/public";
import { zkSync, zkSyncTestnet, goerli, Chain, arbitrum } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import memoize from "lodash/memoize";

export enum ChainId {
  GOERLI = goerli.id,
  ARBITRUM = arbitrum.id,
  ZKSYNC_TESTNET = zkSyncTestnet.id,
  ZKSYNC_MAINNET = zkSync.id,
}

export let CHAINS: Chain[] = [];

// console.log("%cwagmi.ts line:20 process.env", "color: #26bfa5;", process.env);

// console.log(
//   "%cwagmi.ts line:20 process.env.NX_NEXT_PUBLIC_MODE",
//   "color: #26bfa5;",
//   process.env.NX_NEXT_PUBLIC_MODE
// );

// console.log(
//   "%cwagmi.ts line:20 process.env.NX_NEXT_PUBLIC_SIX_ADDRESS",
//   "color: #26bfa5;",
//   process.env.NX_NEXT_PUBLIC_SIX_ADDRESS
// );

let defaultChain: Chain;
if (process.env.NX_NEXT_PUBLIC_MODE === "production") {
  defaultChain = arbitrum;
} else if (process.env.NX_NEXT_PUBLIC_MODE === "staging") {
  defaultChain = goerli;
} else {
  defaultChain = arbitrum;
}

CHAINS = [defaultChain];

export const { chains, provider, webSocketProvider } = configureChains(CHAINS, [
  publicProvider(),
]);
export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "pinstripe",
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: "",
  },
});

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  // webSocketProvider,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    coinbaseConnector,
    walletConnectConnector,
  ],
});

export const isChainSupported = memoize(
  (chainId: number, chainsIds?: ChainId[]) =>
    (chainsIds || chains.map((e) => e.id)).includes(Number(chainId)),
  (chainId: number, chainsIds?: ChainId[]) =>
    `${chainId}-${(chainsIds || chains.map((e) => e.id))
      .map((c) => c)
      .join("-")}`
);

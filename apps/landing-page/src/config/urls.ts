import { ChainId } from "@root/utils";

export const DEX_URLS: { [chainId in ChainId]: string } = {
  [ChainId.ARBITRUM]: "https://app.camelot.exchange/?token2=",
  [ChainId.GOERLI]: "https://app.uniswap.org/#/swap?outputCurrency=",
};

export function getUrl(chainId: ChainId): string {
  if (!DEX_URLS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  return DEX_URLS[chainId];
}

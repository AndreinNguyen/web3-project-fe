import { ChainId } from "@root/utils";

export const CONTRACTS: { [chainId in ChainId]: { [key: string]: string } } = {
  [ChainId.ZKSYNC_TESTNET]: {
    HAC: "0xFE187Ee69144E398960c1Ea9cbAbeBB9E7f0E8AC",
    RewardTracker: "0x6a75ff8A01BC4D4e32e9C321E28505FA4E62D541",
  },
  [ChainId.ZKSYNC_MAINNET]: {
    HAC: "",
  },
};

export function getContract(chainId: ChainId, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}

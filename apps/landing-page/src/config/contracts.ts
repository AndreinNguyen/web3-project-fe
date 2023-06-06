import { ChainId, getContractWithContracts } from "@root/utils";

export const CONTRACTS: { [chainId in ChainId]: { [key: string]: string } } = {
  [ChainId.GOERLI]: {
    SIX_TOKEN: "0xb5b423a677fe499f3a59220f629efb0a4d5bf320",
  },
  [ChainId.ARBITRUM]: {
    SIX_TOKEN: "0x4649814e34a8c11D5C7e0F011a06DCa6eC4497EA",
  },
};

export function getContract(chainId: ChainId, name: string): string {
  return getContractWithContracts(CONTRACTS, chainId, name);
}

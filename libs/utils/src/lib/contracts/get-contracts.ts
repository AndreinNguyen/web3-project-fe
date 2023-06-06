import { ChainId } from "../wagmi/wagmi";

export function getContractWithContracts(
  contracts: {
    [x: number]: {
      [key: string]: string;
    };
  },
  chainId: ChainId,
  name: string
): string {
  if (!contracts[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!contracts[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return contracts[chainId][name];
}

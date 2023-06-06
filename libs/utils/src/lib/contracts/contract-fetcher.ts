import { Provider } from "@wagmi/core";
import { utils, Contract } from "ethers";

export const contractFetcher =
  <T = any>(provider: Provider, contractInfo: any, additionalArgs?: any[]) =>
  (...args: any): Promise<T> => {
    // WARNING about swr argument. Read more details: https://swr.vercel.app/docs/arguments
    const [, , arg0, arg1, ...params] = args[0];

    const method = utils.isAddress(arg0) ? arg1 : arg0;

    const contractCall = getContractCall({
      provider,
      contractInfo,
      arg0,
      arg1,
      method,
      params,
      additionalArgs,
    });

    return new Promise((resolve, reject) => {
      contractCall
        .then((result: any) => {
          resolve(result);
        })
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.error("fetcher error", contractInfo.contractName, method, e);
        });
    });
  };

function getContractCall({
  provider,
  contractInfo,
  arg0,
  arg1,
  method,
  params,
  additionalArgs,
}: {
  provider: any;
  contractInfo: any;
  arg0: any;
  arg1: any;
  method: string;
  params: any;
  additionalArgs: any;
}) {
  if (utils.isAddress(arg0)) {
    const address = arg0;
    const contract = new Contract(address, contractInfo.abi, provider);

    if (additionalArgs) {
      return contract[method](...params.concat(additionalArgs));
    }
    return contract[method](...params);
  }

  if (!provider) {
    return;
  }

  return provider[method](arg1, ...params);
}

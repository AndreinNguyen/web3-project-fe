import { BuyInputSection } from "@root/components";
import {
  callContract,
  contractFetcher,
  formatAmountFree,
  formatTokenAmount,
  parseValue,
} from "@root/utils";
import { BigNumber, Signer, ethers } from "ethers";
import {
  useChainId,
  useAccount,
  useProvider,
  useSigner,
  useFeeData,
} from "wagmi";
import { getContract } from "../config/contracts";
import Token from "../abis/Token.json";
import RewardTracker from "../abis/RewardTracker.json";
import useSWR from "swr";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const HAC_DECIMALS = 18;

/* eslint-disable-next-line */
export interface StakeProps {}
export function Stake(props: StakeProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const chainId = useChainId();
  const { address: account } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { data: feeData } = useFeeData();

  const hacAddress = getContract(chainId, "HAC");
  const rewardTrackerAddress = getContract(chainId, "RewardTracker");
  const contract = new ethers.Contract(
    rewardTrackerAddress,
    RewardTracker.abi,
    signer as Signer
  );

  const inputAmount = parseValue(inputValue || "0", HAC_DECIMALS)!;

  const { data: balance } = useSWR<BigNumber>(
    [`Balance:${account}`, chainId, hacAddress, "balanceOf", account],
    contractFetcher(provider, Token),
    {
      refreshInterval: 1000,
    }
  );

  function onSubmit() {
    callContract(chainId, contract, "stake", [inputAmount], {
      sentMsg: `Stake submitted.`,
      successMsg: `Stake ${formatTokenAmount(
        inputAmount,
        HAC_DECIMALS,
        "HAC"
      )}`,
      failMsg: `Stake failed.`,
      // setPendingTxns: p.setPendingTxns,
    });
  }

  const { data: tokenAllowance } = useSWR<BigNumber>(
    [
      !!account,
      chainId,
      hacAddress,
      "allowance",
      account,
      rewardTrackerAddress,
    ],
    {
      fetcher: contractFetcher(provider, Token),
    }
  );

  const needApproval =
    tokenAllowance && inputAmount && inputAmount.gt(tokenAllowance);

  function getError() {
    if (inputAmount.gt(balance ?? 0)) return [`Insufficient HAC balance`];
    return [false];
  }

  function onApprove() {
    if (!chainId) return;
    const tokenContract = new ethers.Contract(
      hacAddress,
      Token.abi,
      signer as Signer
    );
    callContract(
      chainId,
      tokenContract,
      "approve",
      [rewardTrackerAddress, ethers.constants.MaxUint256],
      {
        sentMsg: `Approve submitted.`,
        successMsg: `Approve success`,
        failMsg: `Approve failed.`,
        gasPrice: feeData?.gasPrice,
        // setPendingTxns: p.setPendingTxns,
      }
    );
  }

  function setValueByTokenAmount(amount?: BigNumber) {
    const nextValue = amount?.gt(0)
      ? formatAmountFree(amount, HAC_DECIMALS)
      : "";

    // safe update the state
    if (nextValue !== inputValue) {
      setInputValue(nextValue);
    }
  }

  function getSubmitButtonState(): {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
  } {
    const error = getError();

    if (typeof error[0] === "string") {
      return {
        text: error[0],
        disabled: true,
      };
    }

    if (needApproval) {
      return {
        text: `Approve HAC approval`,
        disabled: false,
        onClick: onApprove,
      };
    }

    return {
      text: `Stake`,
      disabled: false,
      onClick: onSubmit,
    };
  }

  const buttonState = getSubmitButtonState();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <BuyInputSection
        topLeftLabel="Stake HAC"
        topRightLabel={`Balance` + `:`}
        topRightValue={formatTokenAmount(balance, HAC_DECIMALS)}
        inputValue={inputValue}
        onInputValueChange={(e) => setInputValue(e.target.value)}
        showMaxButton={balance?.gt(0)}
        onClickMax={() => {
          setValueByTokenAmount(balance);
        }}
      />
      <Button
        disabled={buttonState.disabled}
        fullWidth
        variant="contained"
        onClick={buttonState.onClick}
      >
        {buttonState.text}
      </Button>
    </Box>
  );
}

export default Stake;

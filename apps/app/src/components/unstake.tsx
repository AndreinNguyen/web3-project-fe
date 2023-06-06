import { BuyInputSection } from "@root/components";
import {
  callContract,
  contractFetcher,
  formatAmountFree,
  formatTokenAmount,
  parseValue,
} from "@root/utils";
import { BigNumber, Signer, ethers } from "ethers";
import { useChainId, useAccount, useProvider, useSigner } from "wagmi";
import { getContract } from "../config/contracts";
import RewardTracker from "../abis/RewardTracker.json";
import useSWR from "swr";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const HAC_DECIMALS = 18;

/* eslint-disable-next-line */
export interface UnStakeProps {}
export function UnStake(props: UnStakeProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const chainId = useChainId();
  const { address: account } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const rewardTrackerAddress = getContract(chainId, "RewardTracker");
  const contract = new ethers.Contract(
    rewardTrackerAddress,
    RewardTracker.abi,
    signer as Signer
  );

  const inputAmount = parseValue(inputValue || "0", HAC_DECIMALS)!;

  const { data: stakedAmount } = useSWR<BigNumber>(
    [
      `Staked:${account}`,
      chainId,
      rewardTrackerAddress,
      "stakedAmounts",
      account,
    ],
    contractFetcher(provider, RewardTracker),
    { refreshInterval: 1000 }
  );

  const { data: claimableRewards } = useSWR<{
    amountToken0: BigNumber;
    amountToken1: BigNumber;
  }>(
    [
      `claimableRewards:${account}`,
      chainId,
      rewardTrackerAddress,
      "claimableRewards",
      account,
    ],
    contractFetcher(provider, RewardTracker),
    { refreshInterval: 1000 }
  );

  function setValueByTokenAmount(amount?: BigNumber) {
    const nextValue = amount?.gt(0)
      ? formatAmountFree(amount, HAC_DECIMALS)
      : "";

    // safe update the state
    if (nextValue !== inputValue) {
      setInputValue(nextValue);
    }
  }

  function onSubmitUnstake() {
    callContract(chainId, contract, "withdraw", [inputAmount], {
      sentMsg: `Unstake submitted.`,
      successMsg: `Unstake ${formatTokenAmount(
        inputAmount,
        HAC_DECIMALS,
        "HAC"
      )}`,
      failMsg: `Unstake failed.`,
      // setPendingTxns: p.setPendingTxns,
    });
  }

  function onSubmitClaim() {
    callContract(chainId, contract, "claim", [inputAmount], {
      sentMsg: `Claim submitted.`,
      successMsg: `Claim ${formatTokenAmount(
        inputAmount,
        HAC_DECIMALS,
        "HAC"
      )}`,
      failMsg: `Claim failed.`,
      // setPendingTxns: p.setPendingTxns,
    });
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <BuyInputSection
        topLeftLabel="Unstake HAC"
        topRightLabel={`Staked` + `:`}
        topRightValue={formatTokenAmount(stakedAmount, HAC_DECIMALS)}
        inputValue={inputValue}
        onInputValueChange={(e) => setInputValue(e.target.value)}
        showMaxButton={stakedAmount?.gt(0)}
        onClickMax={() => {
          setValueByTokenAmount(stakedAmount);
        }}
      />
      <Button fullWidth variant="contained" onClick={onSubmitUnstake}>
        Unstake
      </Button>
      <Typography
        fontSize={14}
        component={Box}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography fontWeight={700}>Claimable Rewards</Typography>
          <Typography component="div">
            <Typography display="inline">
              {formatTokenAmount(claimableRewards?.amountToken0, 18)}
            </Typography>
            <Typography display="inline">WETH</Typography>
            {", "}
            <Typography display="inline">
              {formatTokenAmount(claimableRewards?.amountToken1, 18)}
            </Typography>
            <Typography display="inline">VANG</Typography>
          </Typography>
        </Box>
        <Button onClick={onSubmitClaim} variant="contained">
          Claim
        </Button>
      </Typography>
    </Box>
  );
}

export default UnStake;

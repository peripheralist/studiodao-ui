import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import useContractReader from "../hooks/contractReader";
import { useGenericContract } from "../hooks/genericContract";

export default function TokenBalance({
  wallet,
  token,
  tokenType,
}: {
  wallet: string | undefined;
  token: string | undefined;
  tokenType: "ERC721" | "ERC20";
}) {
  const balance = useContractReader<BigNumber>({
    contract: useGenericContract(token, tokenType),
    functionName: "balanceOf",
    args: [wallet],
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{token}:</div>
      <div>{balance ? formatEther(balance) : "--"}</div>
    </div>
  );
}

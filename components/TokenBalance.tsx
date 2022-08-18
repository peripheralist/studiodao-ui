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
  const contract = useGenericContract(token, tokenType);

  const balance = useContractReader<BigNumber>({
    contract,
    functionName: "balanceOf",
    args: [wallet],
  });

  const symbol = useContractReader<string>({
    contract,
    functionName: "symbol",
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <b>{symbol}</b>{" "}
        <span style={{ opacity: 0.5 }}>
          ({tokenType} 0x...{token?.substring(38)})
        </span>
        :
      </div>
      <div>
        {balance
          ? formatEther(balance).split(".")[0] +
            "." +
            formatEther(balance).split(".")[1].substring(0, 4)
          : "--"}
      </div>
    </div>
  );
}

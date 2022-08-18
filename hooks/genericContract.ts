import { isAddress } from "@ethersproject/address";
import { Contract, ContractInterface } from "@ethersproject/contracts";

import { NetworkContext } from "../contexts/networkContext";
import * as constants from "@ethersproject/constants";
import { useContext, useEffect, useState } from "react";

import { readProvider } from "../constants/readProvider";

export function useGenericContract(
  address: string | undefined,
  name: "ERC20" | "ERC721"
) {
  const [contract, setContract] = useState<Contract>();
  const { signingProvider } = useContext(NetworkContext);

  useEffect(() => {
    const loadAbi = (): Promise<{ default: ContractInterface }> =>
      import(`../constants/abis/${name}.json`);

    const provider = signingProvider ?? readProvider;

    provider.listAccounts().then(async (accounts) => {
      const abi = await loadAbi();

      console.log("abi", abi);

      if (
        !address ||
        !isAddress(address) ||
        address === constants.AddressZero
      ) {
        setContract(undefined);
      } else if (!accounts.length) {
        setContract(new Contract(address, abi.default, readProvider));
      } else {
        setContract(new Contract(address, abi.default, provider.getSigner()));
      }
    });
  }, [address, signingProvider, name]);

  return contract;
}

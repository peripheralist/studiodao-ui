import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";

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
    const loadAbi = () => import(`../constants/abis/${name}.json`);

    const provider = signingProvider ?? readProvider;

    provider.listAccounts().then(async (accounts) => {
      const abi = await loadAbi();

      if (
        !address ||
        !isAddress(address) ||
        address === constants.AddressZero
      ) {
        setContract(undefined);
      } else if (!accounts.length) {
        setContract(new Contract(address, abi, readProvider));
      } else {
        setContract(new Contract(address, abi, provider.getSigner()));
      }
    });
  }, [address, signingProvider, name]);

  return contract;
}

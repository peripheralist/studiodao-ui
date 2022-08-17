import { useContext, useEffect, useState } from "react";

import { readProvider } from "../constants/readProvider";
import { NetworkContext } from "../contexts/networkContext";
import { ContractName, Contracts } from "../models/contracts";
import { loadContract } from "../utils/loadContract";

export function useContractLoader() {
  const [contracts, setContracts] = useState<Contracts>();

  const { signingProvider } = useContext(NetworkContext);

  useEffect(() => {
    async function loadContracts() {
      try {
        // Contracts can be used read-only without a signer, but require a signer to create transactions.
        const signerOrProvider = signingProvider?.getSigner() ?? readProvider;

        const contractLoaders = await Promise.all(
          Object.values(ContractName).map((contractName) =>
            loadContract(contractName, signerOrProvider)
          )
        );

        const newContractMap = Object.values(ContractName).reduce(
          (accumulator, contractName, idx) => ({
            ...accumulator,
            [contractName]: contractLoaders[idx],
          }),
          {} as Contracts
        );

        setContracts(newContractMap);
      } catch (e) {
        console.error("CONTRACT LOADER ERROR:", e);
      }
    }

    loadContracts();
  }, [signingProvider, setContracts]);

  return contracts;
}

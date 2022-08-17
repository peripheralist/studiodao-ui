import { Contract, ContractInterface } from "@ethersproject/contracts";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ContractName } from "../models/contracts";

export const loadContract = async (
  contractName: ContractName,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
): Promise<Contract | undefined> => {
  let contractJson: { abi: ContractInterface; address: string } | undefined =
    undefined;

  contractJson = await loadAbi(contractName);

  if (!contractJson) {
    throw new Error(`Error importing contract ${contractName})`);
  }

  return new Contract(contractJson.address, contractJson.abi, signerOrProvider);
};

const loadAbi = async (contractName: ContractName) => {
  return await import(`constants/abis/${contractName}.json`);
};

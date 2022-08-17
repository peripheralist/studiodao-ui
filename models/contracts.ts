import { Contract } from "@ethersproject/contracts";

export enum ContractName {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
}

export type Contracts = Record<ContractName, Contract>;

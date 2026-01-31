import { RpcProvider, Contract } from "starknet";
import OracleContractABI from "../abis/OracleContract.json";

export const provider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

export const OracleContractAddress =
    process.env.NEXT_PUBLIC_ORACLE_ADDRESS; // 👈 no literal typing

export const oracleContract = new Contract({
  abi:OracleContractABI as any,
  address:OracleContractAddress as string,
  providerOrAccount:provider
});



import { RpcProvider, Contract } from "starknet";
import AsceSwapABI from "../abis/AsceSwap.json";

export const provider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

export const ASCE_SWAP_ADDRESS =
    process.env.NEXT_PUBLIC_ASCESWAP_ADDRESS; // 👈 no literal typing

export const asceSwap = new Contract({
  abi:AsceSwapABI as any,
  address:ASCE_SWAP_ADDRESS as string,
  providerOrAccount:provider
});



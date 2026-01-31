import { Account, RpcProvider } from "starknet";

export function getStarknetAccount() {
  if (typeof window === "undefined") {
    throw new Error("Window not available");
  }

  const starknet = (window as any).starknet;

  if (!starknet || !starknet.account) {
    throw new Error("Starknet wallet not connected");
  }

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  });

  return new Account({
    provider,
    address: starknet.account.address,
    signer: starknet.account.signer,
  });
}

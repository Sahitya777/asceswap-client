import { Contract, uint256 } from "starknet";
import AsceSwapABI from "../../abis/AsceSwap.json";

export async function supplyLpCollateral(
  pairId: string | number,
  amount: number,
  decimals: number,
  asceSwapAddress: string
) {
  if (!(window as any).starknet) {
    throw new Error("Starknet wallet not found");
  }

  // 🔑 Must enable wallet
  await (window as any).starknet.enable();

  const account = (window as any).starknet.account;

  if (!account?.address || account.address === "0x") {
    throw new Error("Wallet not connected");
  }

  const contract = new Contract({
    abi:AsceSwapABI,
    address:asceSwapAddress,
    providerOrAccount:account
});

  const amountU256 = uint256.bnToUint256(
    BigInt(amount) * BigInt(10) ** BigInt(decimals)
  );

  const tx = await contract.supply_lp_collateral(
    pairId,
    amountU256
  );

  return tx.transaction_hash;
}

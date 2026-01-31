import { Contract, uint256 } from "starknet";
import { ERC20_ABI } from "../../abis/erc20";
import AsceSwapABI from "../../abis/AsceSwap.json";

function toU256(amount: number, decimals: number) {
  return uint256.bnToUint256(
    BigInt(Math.round(amount * 10 ** decimals))
  );
}

export async function approveAndSupplyLp({
  tokenAddress,
  asceSwapAddress,
  pairId,
  amount,
  decimals,
}: {
  tokenAddress: string;
  asceSwapAddress: string;
  pairId: string; // felt252
  amount: number;
  decimals: number;
}) {
  if (!(window as any).starknet) {
    throw new Error("Starknet wallet not found");
  }

  await (window as any).starknet.enable();
  const account = (window as any).starknet.account;

  if (!account?.address || account.address === "0x") {
    throw new Error("Wallet not connected");
  }

  const amountU256 = toU256(amount,decimals);

  const erc20 = new Contract({abi:ERC20_ABI, address:tokenAddress, providerOrAccount:account});
  const asceSwap = new Contract({abi:AsceSwapABI, address:asceSwapAddress, providerOrAccount:account});

  const calls = [
    // 1️⃣ Approve
    erc20.populate("approve", [
      asceSwapAddress,
      amountU256,
    ]),

    // 2️⃣ Supply LP collateral
    asceSwap.populate("supply_lp_collateral", [
      pairId,
      amountU256,
    ]),
  ];

  const tx = await account.execute(calls);
  return tx.transaction_hash;
}

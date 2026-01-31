import { uint256 } from "starknet";

function toU256ArrayFromDecimal(amount: number, decimals: number): string[] {
  const v = BigInt(Math.round(amount * 10 ** decimals));
  const u = uint256.bnToUint256(v);
  return [u.low.toString(), u.high.toString()];
}

function toU256Array(value: number): string[] {
  const u = uint256.bnToUint256(BigInt(value));
  return [u.low.toString(), u.high.toString()];
}

export async function approveAndBuySwap({
  tokenAddress,
  asceSwapAddress,
  pairId,
  side,
  notional,
  collateral,
  maxRateBps,
  decimals,
}: {
  tokenAddress: string;
  asceSwapAddress: string;
  pairId: string;
  side: "FIXED" | "FLOATING";
  notional: number;
  collateral: number;
  maxRateBps: number;
  decimals: number;
}) {
  await (window as any).starknet.enable();
  const account = (window as any).starknet.account;

  if (!account?.address || account.address === "0x") {
    throw new Error("Wallet not connected");
  }

  const sideValue = side === "FIXED" ? "0" : "1";

  const notionalArr = toU256ArrayFromDecimal(notional, decimals);
  const collateralArr = toU256ArrayFromDecimal(collateral, decimals);
  const maxRateArr = toU256Array(maxRateBps); // 🔥 FIX

  const calls = [
    // 1️⃣ approve
    {
      contractAddress: tokenAddress,
      entrypoint: "approve",
      calldata: [
        asceSwapAddress,
        ...collateralArr,
      ],
    },

    // 2️⃣ buy_swap (correct u256 layout)
    {
      contractAddress: asceSwapAddress,
      entrypoint: "buy_swap",
      calldata: [
        pairId,
        sideValue,
        ...notionalArr,
        ...collateralArr,
        ...maxRateArr, // 🔥 THIS FIXES PARAM #5
      ],
    },
  ];

  const tx = await account.execute(calls);
  return tx.transaction_hash;
}

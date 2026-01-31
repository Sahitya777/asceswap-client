import { Contract, uint256 } from "starknet";
import { ERC20_ABI } from "../../abis/erc20";

export async function mintMockToken(
  tokenAddress: string,
  decimals: number
) {
  if (!(window as any).starknet) {
    throw new Error("Starknet wallet not found");
  }

  // 🔑 THIS IS REQUIRED
  await (window as any).starknet.enable();

  const account = (window as any).starknet.account;

  if (!account?.address || account.address === "0x") {
    throw new Error("Starknet account not ready");
  }

  const erc20 = new Contract({
    abi:ERC20_ABI,
    address:tokenAddress,
    providerOrAccount:account
});

  const amount = uint256.bnToUint256(
    BigInt(10_000) * BigInt(10) ** BigInt(decimals)
  );

  const tx = await erc20.mint(
    account.address,
    amount
  );

  return tx.transaction_hash;
}

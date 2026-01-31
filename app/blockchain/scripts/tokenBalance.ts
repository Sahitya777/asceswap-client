import { Contract, RpcProvider, uint256 } from "starknet";
import { ERC20_ABI } from "../abis/erc20";

const provider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
});

export async function getTokenBalance(
  tokenAddress: string,
  userAddress: string
) {
  const erc20 = new Contract({
    abi:ERC20_ABI,
    address:tokenAddress,
    providerOrAccount:provider
});

  const [balanceRes, decimalsRes] = await Promise.all([
    erc20.balance_of(userAddress),
    erc20.decimals(),
  ]);

  const balance = uint256.uint256ToBN(balanceRes);

  const decimals = Number(decimalsRes);

  return {
    balance,                      // bigint (raw)
    decimals,                     // number                     // string
    formatted:
      Number(balance) / 10 ** decimals,
  };
}

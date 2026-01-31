
export enum MarketSide {
  FIXED_TAKER = 'FIXED_TAKER',
  VARIABLE_TAKER = 'VARIABLE_TAKER'
}

export enum Duration {
  D1 = '1D',
  D7 = '7D',
  D30 = '30D'
}

export interface MarketState {
  side: MarketSide;
  duration: Duration;
  notional: number;
}

export interface MarketData {
  id: string;
  protocol: ProtocolSymbol;
  name: string;
  oracleRate: number;
  icon?: string;
  fixedDuration: Duration;
  maturityTimestamp: number;
}

export type TokenSymbol = "STRK" | "USDC" | "ETH" | "BTC" | "USDT"; 

export type SwapDirection = 'FIXED' | 'FLOATING';

// interface/types.ts
export type ProtocolSymbol = "Ekubo" | "Vesu" | "Nostra" | "Asceswap";

// interface/formattedMarket.ts

export interface FormattedMarket {
  pairId: number;
  status: "ACTIVE" | "PAUSED";

  oracle: string;           // hex address
  curator: string;          // hex address
  collateralToken: string;  // hex address
  decimals: number;

  rate: {
    currentPct: number;
    lastUpdated: Date;
  };

  pool: {
    totalCollateral: number;
    lockedFixed: number;
    lockedFloating: number;
    availableLiquidity: number;
  };

  params: {
    liquidationThresholdPct: number;
    initialMarginMultiplierPct: number;
    minMarginFloorPct: number;

    swapTermDays: number;
    minHoldPeriodMinutes: number;

    swapFeePct: number;
    earlyExitFeePct: number;
    liquidationBonusPct: number;
    feeSpreadPct: number;

    maxUtilizationPct: number;

    minNotional: number;
    maxNotional: number;

    maxOracleStalenessSeconds: number;
    maxRateChangePct: number;

    minRatePct: number;
    maxRatePct: number;

    isLpPermissioned: boolean;
  };

  stats: {
    totalSwaps: number;
    activeSwaps: number;
  };
}


export const CONTRACTS: Record<string, string> = {
    dai: "DAI",
    worldOne: "WorldOneERC20Token",
    treasury: "WorldOneTreasury",
    warrantDepo: "WorldOneWarrantDepository",
};

export enum MANAGING {
    RESERVEDEPOSITOR = 0,
    RESERVESPENDER,
    RESERVETOKEN,
    RESERVEMANAGER,
    LIQUIDITYDEPOSITOR,
    LIQUIDITYTOKEN,
    LIQUIDITYMANAGER,
    DEBTOR,
    REWARDMANAGER,
    SOHM,
}


export const DAO = "0x9632a79656af553f58738b0fb750320158495942";

export const dexFactory = "0xe4a575550c2b460d2307b82dcd7afe84ad1484dd";

export const discount = 1000; // 10%

export const totalCapacity = 100;

export const minWarrantPrice = 1000; // 10.00 DAI/TIME

export const maxWarrantPayout = '100000'; // 100%

export const warrantFee = '0'; // 100 = 1%

export const warrantVestingLength = '129600';

export const initialMint = '100000000000000000000000'; // 100,000 DAI

export const initialMintOhm = '10000000000000000000'; // 10 TIME for 10 DAI
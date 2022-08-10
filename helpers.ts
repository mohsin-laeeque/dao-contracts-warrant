import { ContractReceipt, ContractTransaction } from "@ethersproject/contracts";
import { WorldOneWarrantDepository } from "./typechain-types";

export async function waitFor(txPromise: Promise<ContractTransaction>): Promise<ContractReceipt> {
    return await txPromise.then((tx) => tx.wait());
}

export async function makeDeposit(amount: string, warrantDepo: WorldOneWarrantDepository, depositor: string) {
    let cost = amount;
    if(amount === '0'){
        cost = (await warrantDepo.allCost()).toString();
    }
    console.log("\n********* Lot stats before deposit *********")
    let remaining = (await warrantDepo.remainingAvailable()).toString();
    console.log("    Remaining:", remaining);
    console.log(" Cost of Rem.:", cost);

    await warrantDepo.deposit(cost, cost, depositor);
    
    remaining = (await warrantDepo.remainingAvailable()).toString();
    cost = (await warrantDepo.allCost()).toString();
    console.log("\n********* Lot stats after deposit *********")
    console.log("    Remaining:", remaining);
    console.log(" Cost of Rem.:", cost);
}
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, MANAGING } from "../constants";
import { WorldOneTreasury__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);
    const daiDeployment = await deployments.get(CONTRACTS.dai);
    const warrantDepoDeployment = await deployments.get(CONTRACTS.warrantDepo);
    const treasury = WorldOneTreasury__factory.connect(treasuryDeployment.address, signer);
    if (!(await treasury.isReserveDepositor(warrantDepoDeployment.address))) {
        console.log("Setting DAI warrant as Reserve Depository for treasury...");
        try {
            await treasury.queue(MANAGING.RESERVEDEPOSITOR, warrantDepoDeployment.address);
            await new Promise(r => setTimeout(r, 2000));
            await treasury.toggle(MANAGING.RESERVEDEPOSITOR, warrantDepoDeployment.address);
        }
        catch (e) {
            console.log("Warrant reserve depositor toggle failed", e);
        }
    }
    if (!(await treasury.isReserveDepositor(daiDeployment.address))) {
        console.log("Setting DAI as Reserve Depository for treasury...");
        try {
            await treasury.queue(MANAGING.RESERVEDEPOSITOR, daiDeployment.address);
            await new Promise(r => setTimeout(r, 4000));
            await treasury.toggle(MANAGING.RESERVEDEPOSITOR, daiDeployment.address);
        }
        catch (e) {
            console.log("DAI reserve depositor toggle failed", e);
        }
    }

};

func.tags = ["AllowTreasuryAccess", "test"];
func.dependencies = ["DAI", "WorldOneTreasury", "WorldOneWarrantDepository"];
export default func;




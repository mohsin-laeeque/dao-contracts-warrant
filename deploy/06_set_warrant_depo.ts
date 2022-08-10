import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../constants";
import { WorldOneTreasury__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const warrantDepoDeployment = await deployments.get(CONTRACTS.warrantDepo);
    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);
    const treasury = WorldOneTreasury__factory.connect(treasuryDeployment.address, signer);
    const warrantDepo = await treasury.warrantDepository();
    if (warrantDepo != warrantDepoDeployment.address) {
        await treasury.setWarrantDepository(warrantDepoDeployment.address);
        console.log("Warrant depository is set in treasury");
    }
};

func.tags = ["WarrantDepoInTreasury", "test"];
func.dependencies = ["WorldOneWarrantDepository", "WorldOneTreasury"];
export default func;
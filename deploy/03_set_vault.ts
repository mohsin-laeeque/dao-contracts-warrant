import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../constants";
import { WorldOneERC20Token__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const worldOneDeployment = await deployments.get(CONTRACTS.worldOne);
    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);
    const worldOne = WorldOneERC20Token__factory.connect(worldOneDeployment.address, signer);
    const worldOneVault = await worldOne.vault();
    if (worldOneVault != treasuryDeployment.address) {
        await worldOne.setVault(treasuryDeployment.address);
        console.log("WorldOne vault is given to treasury");
    }
};

func.tags = ["SetVault", "test"];
func.dependencies = ["WorldOneERC20Token", "WorldOneTreasury"];
export default func;
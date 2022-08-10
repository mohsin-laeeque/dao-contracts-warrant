import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, DAO, dexFactory } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const worldOneDeployment = await deployments.get(CONTRACTS.worldOne);
    const daiDeployment = await deployments.get(CONTRACTS.dai);
    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);

    await deploy(CONTRACTS.warrantDepo, {
        from: deployer,
        args: [worldOneDeployment.address, daiDeployment.address, treasuryDeployment.address, DAO, dexFactory],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.warrantDepo, "test"];
func.dependencies = ["DAI", "WorldOneERC20Token", "WorldOneTreasury"];
export default func;
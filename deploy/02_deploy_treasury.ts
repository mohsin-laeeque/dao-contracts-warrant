import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const worldOneDeployment = await deployments.get(CONTRACTS.worldOne);
    const daiDeployment = await deployments.get(CONTRACTS.dai);
    await deploy(CONTRACTS.treasury, {
        from: deployer,
        args: [worldOneDeployment.address, daiDeployment.address, 0, 1000000000000],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.treasury, "test"];
func.dependencies = ["DAI", "WorldOneERC20Token"];
export default func;
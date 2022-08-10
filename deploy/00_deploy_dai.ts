import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS } from "../CONSTANTS";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log("Deployer: ", deployer);
    console.log("Chain ID: ", network.config.chainId);
    await deploy(CONTRACTS.dai, {
        from: deployer,
        args: [network.config.chainId || 1337],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};

func.tags = [CONTRACTS.dai, "test", "mock"];

export default func;
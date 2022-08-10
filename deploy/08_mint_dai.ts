import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, initialMint } from "../constants";
import { DAI__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const daiDeployment = await deployments.get(CONTRACTS.dai);
    const dai = DAI__factory.connect(daiDeployment.address, signer);
    await dai.mint(deployer, initialMint);
    console.log("Minting DAI...");
};

func.tags = ["MintDai", "test"];

export default func;




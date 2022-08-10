import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, discount, warrantFee, maxWarrantPayout, totalCapacity, warrantVestingLength, minWarrantPrice } from "../constants";
import { WorldOneWarrantDepository__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const warrantDepoDeployment = await deployments.get(CONTRACTS.warrantDepo);
    const warrantDepo = WorldOneWarrantDepository__factory.connect(warrantDepoDeployment.address, signer);

    await warrantDepo.initializeWarrantLot(discount, warrantVestingLength, totalCapacity, warrantFee, maxWarrantPayout, minWarrantPrice);
};

func.tags = ["InitWarrantDepo", "test"];
func.dependencies = ["WorldOneWarrantDepository"];
export default func;
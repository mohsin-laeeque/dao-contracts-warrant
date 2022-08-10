import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, discount, warrantVestingLength, totalCapacity, warrantFee, maxWarrantPayout, minWarrantPrice } from "../constants";
import { WorldOneWarrantDepository__factory, WorldOneERC20Token__factory, DAI__factory } from "../typechain-types";
import { makeDeposit } from "../helpers";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const warrantDepoDeployment = await deployments.get(CONTRACTS.warrantDepo);
    const warrantDepo = WorldOneWarrantDepository__factory.connect(warrantDepoDeployment.address, signer);

    const worldOneDeployment = await deployments.get(CONTRACTS.worldOne);
    const worldOne = WorldOneERC20Token__factory.connect(worldOneDeployment.address, signer);

    const daiDeployment = await deployments.get(CONTRACTS.dai);
    const dai = DAI__factory.connect(daiDeployment.address, signer);
    console.log("\n\n********************PLAYGROUND**********************\n");
    await dai.approve(warrantDepo.address, '30000000000000000000000');
    
    console.log("************** Deposit - 1.1 **************");
    await makeDeposit('0',warrantDepo,deployer);

    console.log("Balance before redeem: %s", (await worldOne.balanceOf(deployer)).toString());
    await new Promise(r => setTimeout(r, 1000));
    await warrantDepo.redeem(deployer);
    console.log(" Balance after redeem: %s", (await worldOne.balanceOf(deployer)).toString());
    await warrantDepo.redeem(deployer);

    await warrantDepo.initializeWarrantLot(discount, warrantVestingLength, totalCapacity, warrantFee, maxWarrantPayout, minWarrantPrice);

    console.log("************** Deposit - 2.1 **************");
    await makeDeposit('1000000000000000000',warrantDepo,deployer);

    console.log("************** Deposit - 2.2 **************");
    await makeDeposit('0',warrantDepo,deployer);
};

func.tags = ["play", "test"];
func.dependencies = ["DAI", "WorldOneERC20Token", "WorldOneTreasury", "WorldOneWarrantDepository", "SetVault", "AllowTreasuryAccess", "MintDai", "InitWarrantDepo"];
func.runAtTheEnd = true;
func.skip = () => new Promise((resolve, reject) => resolve(false));
export default func;
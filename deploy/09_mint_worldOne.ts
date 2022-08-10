import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CONTRACTS, initialMintOhm, MANAGING } from "../constants";
import { WorldOneTreasury__factory, DAI__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.provider.getSigner(deployer);

    const daiDeployment = await deployments.get(CONTRACTS.dai);
    const dai = DAI__factory.connect(daiDeployment.address, signer);
    const treasuryDeployment = await deployments.get(CONTRACTS.treasury);
    const treasury = WorldOneTreasury__factory.connect(treasuryDeployment.address, signer);
    // TODO: Remove this in production
    if (!(await treasury.isReserveDepositor(deployer))) {
        console.log("Setting DAI warrant as Reserve Depository for treasury...");
        try {
            await treasury.queue(MANAGING.RESERVEDEPOSITOR, deployer);
            await new Promise(r => setTimeout(r, 2000));
            await treasury.toggle(MANAGING.RESERVEDEPOSITOR, deployer);
        }
        catch (e) {
            console.log("Warrant reserve depositor toggle failed", e);
        }
    }
    console.log("Depositing " + initialMintOhm + " DAI to treasury to mint OHM to deployer's account...");
    await dai.approve(treasury.address, initialMintOhm);
    await treasury.deposit(initialMintOhm, dai.address, 0);
    console.log("Minting DAI...");
};

func.tags = ["MintWorldOne", "test"];
func.skip = () => new Promise((resolve, reject) => resolve(false));
export default func;

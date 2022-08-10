import { 
    Contract, 
    ContractFactory 
  } from "ethers";
import { ethers } from "hardhat";
import { 
    deployer,
    initialMint,
    warrantVestingLength,
    discount,
    totalCapacity,
    maxWarrantPayout,
    warrantFee,
    DAO,
    maxWarrantDebt,
    MANAGING
    } from "./constants";
  
  const main = async(): Promise<any> => {

    // Deploy DAI
    const DAI: ContractFactory = await ethers.getContractFactory('DAI');
    const dai: Contract = await DAI.deploy(0);
    await dai.deployed();
    console.log(`DAI deployed to: ${dai.address}`);

    // Mint DAI
    await dai.mint(deployer, initialMint);

    // Deploy WorldOneERC20
    const WorldOne: ContractFactory = await ethers.getContractFactory("WorldOneERC20Token");
    const worldOne: Contract = await WorldOne.deploy();
    await worldOne.deployed();
    console.log(`WorldOne deployed to: ${worldOne.address}`);

    // Deploy Treasury
    const Treasury: ContractFactory = await ethers.getContractFactory("WorldOneTreasury");
    const treasury: Contract = await Treasury.deploy(worldOne.address, dai.address, 0, 0);
    await treasury.deployed();
    console.log(`Treasury deployed to: ${treasury.address}`);

    // Set worldOne vault
    const worldOneVault = await worldOne.vault();
    if(worldOneVault != treasury.address){
        await worldOne.setVault(treasury.address);
        console.log("WorldOne vault is given to treasury");
    }
 
    // Deploy Warrant Depository
    const WarrantDepo: ContractFactory = await ethers.getContractFactory("WorldOneWarrantDepository");
    const warrantDepo: Contract = await WarrantDepo.deploy(worldOne.address, dai.address, treasury.address, DAO);
    await warrantDepo.deployed();
    console.log(`WarrantDepository deployed to: ${warrantDepo.address}`);

    // Initialize WarrantDepository
    await warrantDepo.initializeWarrantLot(discount, warrantVestingLength, totalCapacity, warrantFee, maxWarrantPayout);

    if (!(await treasury.isReserveDepositor(warrantDepo.address))) {
        console.log("Setting DAI warrant as Reserve Depository for treasury...");
        try {
            await treasury.queue(MANAGING.RESERVEDEPOSITOR, warrantDepo.address);
            await new Promise(r => setTimeout(r, 2000));
            await treasury.toggle(MANAGING.RESERVEDEPOSITOR, warrantDepo.address);
        }
        catch (e) {
            console.log("Warrant reserve depositor toggle failed", e); 
        }    
    }
    if (!(await treasury.isReserveDepositor(dai.address))) {
        console.log("Setting DAI as Reserve Depository for treasury...");
        try {
            await treasury.queue(MANAGING.RESERVEDEPOSITOR, dai.address);
            await new Promise(r => setTimeout(r, 4000));
            await treasury.toggle(MANAGING.RESERVEDEPOSITOR, dai.address);
        }
        catch (e) {
            console.log("DAI reserve depositor toggle failed", e); 
        }     
    }
    warrantDepo.deposit(100000000000,10000000000000,deployer);
  }
  
  main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  
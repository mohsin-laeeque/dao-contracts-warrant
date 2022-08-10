## Setup
1- Install dependencies
```
npm install -g yarn
```

2- AvalancheGo is an Avalanche node implementation written in Go. Avash is a tool to quickly deploy local test networks. Together, you can deploy local test networks and run tests on them.
[AvalanceGO](https://github.com/ava-labs/avalanchego)


3- Run AvalancheGO
```
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

### OR
Downlaod binary from [here](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.9) and do
```
./build/avalanchego --network-id=local --staking-enabled=false --snow-sample-size=1 --snow-quorum-size=1
```


4- Prints a list of accounts on the local Avash network.

```
yarn accounts --network local
```



5- Transfer 1,000 AVAX from the X-Chain to each of the 10 accounts in hardhat.config.ts with the script fund-cchain-addresses
```
yarn fund-cchain-addresses
```


6- Prints a list of accounts and their corresponding AVAX balances on the local Avash network.

```
yarn balances --network local
```

7- Send each of the accounts some AVAX from the first account.
```
yarn send-avax-wallet-signer --network local
```

8- Confirm that the balances are updated
```
yarn balances --network local
```

9- Compile smart contracts
```
yarn compile
```

10- Deploy smart contracts
```
yarn deploy --network local
```


11- Interact with Smart Contract
```
yarn console --network local
```


#### For console interaction
const warrantContract = await ethers.getContractFactory("WorldOneWarrantDepository");
const warrant = await warrantContract.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
const daiContract = await ethers.getContractFactory("DAI");
const dai = await daiContract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
await dai.approve(warrant.address, 10000000000);
const payout = warrant.deposit(1000000000,1000000000000,"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")# dao-contracts-warrant

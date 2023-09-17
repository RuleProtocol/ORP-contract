//change .network.ts to network.ts
const networkConfig = {
  defaultNetwork : "hardhat2",
  networks: {
    hardhat: {

    },

    hardhat2: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      allowUnlimitedContractSize: true,
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a7",
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff81",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78691d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab361a",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a1",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a1",
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff82",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78692d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab362a",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a2",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b002a7",
      ]

    },

    eth: {
      url: "https://rpc.ankr.com/eth",
      chainId: 1,
      accounts: [

      ],
    },


    rinkeBy: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 4,
      accounts: [

      ],
    },


  },
};


export default networkConfig;

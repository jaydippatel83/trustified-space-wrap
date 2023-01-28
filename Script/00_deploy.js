require("hardhat-deploy");
require("hardhat-deploy-ethers");
const ethers = require("ethers");
const fa = require("@glif/filecoin-address");
const util = require("util");
const request = util.promisify(require("request"));
console.log(network.config);
const DEPLOYER_PRIVATE_KEY = network.config.accounts[0];
async function callRpc(method, params) {
  var options = {
    method: "POST",
    url: "https://api.hyperspace.node.glif.io/rpc/v0",
    // url: "http://localhost:1234/rpc/v0",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    }),
  };
  const res = await request(options);
  return JSON.parse(res.body).result;
}
const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
module.exports = async ({ deployments }) => {
  const { deploy } = deployments;
  const priorityFee = await callRpc("eth_maxPriorityFeePerGas");
  console.log("Wallet Ethereum Address:", deployer.address);
  try {
    await deploy("Trustified", {
      from: deployer.address,
      // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
      // a large gasLimit. This should be addressed in the following releases.
      // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
      // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
      maxPriorityFeePerGas: priorityFee,
      log: true,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.tags = ["Trustified", "MinerAPI", "MarketAPI"];
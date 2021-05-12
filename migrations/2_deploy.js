//to deploy we create this file requiring json files (artifacts) in this repo are in the src/abis folder
const Token = artifacts.require("Token");
const dBank = artifacts.require("dBank");

//THIS SEQUENCE OF FUNCTION WHAT DOES IS TO DEPLOY AND TRANSFER MINTER ROLE FROM DEPLOYER TO DBANK (ADDRESS TO ADDRESS)
module.exports = async function (deployer) {
  //DEPLOY TOKEN WITH ACCOUNT ADDRESS FROM GANACHE
  await deployer.deploy(Token);
	//THE ADDRESS OF THE DEPLOYED SMART CONTRACT INSTANCE SAVED IN token VARIABLE
  const token = await Token.deployed();
  //pass token address for dBank contract(for future minting)
	//deploy address of minter (token) to dbank smart contract
  await deployer.deploy(dBank, token.address);
  //assign dBank contract into variable to get its address (dbank smart contract address)
  const dbank = await dBank.deployed();
  //change token's owner/minter from deployer to dBank
  await token.passMinterRole(dbank.address);
};




//then truffle migrate & truffle console. const token = await Token.deployed() then token.name() or token.address, or token.symbol() token.totalSupply()
//0x05BFDFe0271F29811dAbA0C7aF880712007a8ee5
//await web3.eth.getAccounts() all the accounts in our ganache wallet
//web3.eth.getBalance(acc[0]) (wei value)'99967763740000000000'
// dec = await token.decimals()
//dec.toString() >> '18'

//bal = await token.balanceOf(acc[0])
//bal >>> BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
//bal.toString()  >> '0'
//etherBalance = await web3.eth.getBalance(acc[0])
// etherBalance.toString() >> '99967763740000000000'
//web3.utils.fromWei(etherBalance) >> '99.96776374'

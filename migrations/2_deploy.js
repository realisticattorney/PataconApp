//to deploy we create this file requiring json files (artifacts) in this repo are in the src/abis folder
const Token = artifacts.require("Token");
const dBank = artifacts.require("dBank");

module.exports = async function (deployer) {
  //deploy Token
	await deployer.deploy(Token)
  //assign token into variable to get it's address
  //pass token address for dBank contract(for future minting)
  //assign dBank contract into variable to get it's address
  //change token's owner/minter from deployer to dBank
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

// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
//WE WILL START WITH A SUPPLY OF ZERO(0) THAT'S GOING TO BE MINT THROUGH DEPOSITS. INITIALLY WE ARE THE MINTER, BUT WE WANT TO PASS THAT ROLE TO dBank SMART CONTRACT SO THAT IT ASSIGNS IT TO THE ADDRESSES THAT DEPOSIT ON OUT BANK
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 { //Token extends ERC20
  address public minter; //we call minter to the address that's deploying our Contract Source

 event MinterChanged(address indexed from, address to);
 //this is to log the event change of transferring who the minter is, 
  //you can config events to be notification on your phone or something like that
  constructor() payable ERC20("Patacon", "MNM") {//it has to be public to be deployed/ payable because mm, and ERC20 to use the ERC20 parent
    minter = msg.sender;  //whenever we deploy it we want to set this minter as the sender of msg. msg is a global var inside of solidity
  }

  //Add pass minter role function to pass the minter role to dBank
  //Only the deployer/initial minter (me) can do this
  //dBank is the other smart contract
  function passMinterRole(address dBank) public returns (bool) {
    require(msg.sender == minter, 'Error, only minted can change pass minter role');
    minter = dBank;

    emit MinterChanged(msg.sender, dBank);
    return true;
  }

  function mint(address account, uint256 amount) public {
    //check if msg.sender have minter role
    require(msg.sender == minter, 'Error, msg.sender does not have minter role'); //if false, return
		_mint(account, amount);
	}
}



// MINTED SOME PATACONS using mint function from the truffle console
//token.mint(acc[0], web3.utils.toWei('100'))
//tokenBalance = await token.balanceOf(acc[0])
//tokenBalance.toString() >> '100000000000000000000' (100eth)
//web3.utils.fromWei(tokenBalance) >> '100'

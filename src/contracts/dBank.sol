// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol"; //we import the token so it can take ownership

contract dBank {
    //assign Token contract to variable
    Token private token; //Token is a data type of sorts. The instance we create in this line is going to be called token

    //add mappings
    mapping(address => uint256) public etherBalanceOf; //mapping key value pairs of addresses and their balances, in an array I guess
    mapping(address => uint256) public depositStart;
    mapping(address => bool) public isDeposited; //ADDRESS OF WHOEVER CALLS THE CONTRACT IS ATTACHED TO A VALUE THAT IT'S EXPECTED TO BE: AN INT, ANOTHER INT, AND A BOOLEAN

    //add events //THESE ARE LOGS OF ACTIVITY EMMITED BY DEPOSIT AND WITHDRAW FUNCTIONS, EACH EXPECTES A NUMBER OF PARAMS THAT ARE GOING TO BE STORED AS etherAmoun, timeStart, and so forth)
    event Deposit(address indexed user, uint256 etherAmount, uint256 timeStart);
    event Withdraw(
        address indexed user,
        uint256 etherBalanceOf,
        uint256 depositTime,
        uint256 interest
    );

    //pass as constructor argument deployed Token contract
    constructor(Token _token) { //deployment creates an instance of Token we will assign to token variable
        //assign token deployed contract to variable
        token = _token;
    }

    //INTEREST WILL BE CALCULATED BY NUMBER OF BLOCKS PASSED, AS BLOCKS HAVE A FIX BLOCK TIME RATE
    function deposit() public payable {
        //check if msg.sender didn't already deposited funds
        require(
            isDeposited[msg.sender] == false,
            "Error, deposit already made" //quite confusing but basically the default value is true
        );
        //check if msg.value is >= than 0.01 ETH
        require(msg.value >= 1e16, "Error, deposit must be >= 0.01 ETH"); //the transaction made to interact with this contract has a value
        //increase msg.sender ether deposit balance
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value; //amount of ether is msg.value
        //start msg.sender hodling time
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;
        //set msg.sender deposit status to true
        isDeposited[msg.sender] = true;
        //emit Deposit event
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        //check if msg.sender deposit status is true
        require(isDeposited[msg.sender] == true, "Error, no previous deposit");
        uint256 userBalance = etherBalanceOf[msg.sender];
        //assign msg.sender ether deposit balance to variable for event
        //check user's hodl time
        uint256 depositTime = block.timestamp - depositStart[msg.sender];
        //calc interest per second
        uint256 interesetPerSecond =
            31668017 * (etherBalanceOf[msg.sender] / 1e16);
        //calc accrued interest
        uint256 interest = interesetPerSecond * depositTime;
        //send eth to user
        msg.sender.transfer(userBalance);
        token.mint(msg.sender, interest);
        //send interest in tokens to user
        //reset depositer data
        depositStart[msg.sender] = 0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;
        //emit event
        emit Withdraw(msg.sender, userBalance, depositTime, interest);
    }

    function borrow() public payable {
        //check if collateral is >= than 0.01 ETH
        //check if user doesn't have active loan
        //add msg.value to ether collateral
        //calc tokens amount to mint, 50% of msg.value
        //mint&send tokens to user
        //activate borrower's loan status
        //emit event
    }

    function payOff() public {
        //check if loan is active
        //transfer tokens from user back to the contract
        //calc fee
        //send user's collateral minus fee
        //reset borrower's data
        //emit event
    }
}

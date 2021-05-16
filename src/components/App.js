import dBank from "../abis/dBank.json";
import React, { Component } from "react";
import Token from "../abis/Token.json";
import Web3 from "web3";
import "../subcomponents/scss/style.scss";


class App extends Component {
  
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], balance: balance, web3: web3 });
      } else {
        //window.alert("Please login with MetaMask");
        console.log("Please login with Metamask");
      }

      //load contracts
      try {
        const token = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        );
        const dbank = new web3.eth.Contract(
          dBank.abi,
          dBank.networks[netId].address
        );
        const dBankAddress = dBank.networks[netId].address;
        this.setState({
          token: token,
          dbank: dbank,
          dBankAddress: dBankAddress,
        });
      } catch (e) {
        console.log("Error", e);
        //window.alert("Contracts not deployed to the current network");
        console.log("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async deposit(amount) {
    if (this.state.dbank !== "undefined") {
      try {
        await this.state.dbank.methods
          .deposit()
          .send({ value: amount.toString(), from: this.state.account });
      } catch (e) {
        console.log("Error, deposit: ", e);
      }
    }
  }

  async withdraw(e) {
    e.preventDefault();
    if (this.state.dbank !== "undefined") {
      try {
        await this.state.dbank.methods
          .withdraw()
          .send({ from: this.state.account });
      } catch (e) {
        console.log("Error, withdraw: ", e);
      }
    }
  }

  async borrow(amount) {
    if (this.state.dbank !== "undefined") {
      try {
        await this.state.dbank.methods
          .borrow()
          .send({ value: amount.toString(), from: this.state.account });
      } catch (e) {
        console.log("Error, borrow: ", e);
      }
    }
  }

  async payOff(e) {
    e.preventDefault();
    if (this.state.dbank !== "undefined") {
      try {
        const collateralEther = await this.state.dbank.methods
          .collateralEther(this.state.account)
          .call({ from: this.state.account });
        const tokenBorrowed = collateralEther / 2;
        await this.state.token.methods
          .approve(this.state.dBankAddress, tokenBorrowed.toString())
          .send({ from: this.state.account });
        await this.state.dbank.methods
          .payOff()
          .send({ from: this.state.account });
      } catch (e) {
        console.log("Error, pay off: ", e);
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      web3: "undefined",
      account: "",
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
    };
  }



  render() {
    return (
      <div className="app-div">
        <div className="u-center-text heading-tertiary">
          Your Metamask Address:
          <h2>{this.state.account}</h2>
        </div>
        <div className="u-center-text">
          <div className="container">
            <div className="item item--1">
              Deposit ETHER
              <br></br>
              Get your ETHER back + MNM tokens!
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let amount = this.depositAmount.value;
                  amount = amount * 10 ** 18; //convert to wei
                  this.deposit(amount);
                }}
              >
                <div class="row">
                  <span>
                    <input
                      class="basic-slide"
                      id="borrowAmount"
                      type="number"
                      step="0.01"
                      placeholder="Min: 0,01"
                      required
                      ref={(input) => {
                        this.depositAmount = input;
                      }}
                    />
                    <label for="name">Amount</label>
                  </span>
                </div>
                <div className="frame">
                  <button
                    type="submit"
                    className="custom-btn btn-7 test1 variant-1 "
                    
                  >
                    <span>DEPOSIT</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="item item--2">
              Withdraw ETHER
              <br></br>+ MNM governance token!
              <br></br>
              <div class="frame">
                <button
                  type="submit"
                  className="custom-btn btn-7 test1 variant-1 "
                  onClick={(e) => this.withdraw(e)}
                >
                  <span>WITHDRAW</span>
                </button>
              </div>
            </div>
            <div className="item item--3">
              Borrow Tokens
              <br></br>
              You'll get up to 50% of collateral
              <br></br>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let amount = this.borrowAmount.value;
                  amount = amount * 10 ** 18; //convert to wei
                  this.borrow(amount);
                }}
              >
                <div class="row">
                  <span>
                    <input
                      class="basic-slide"
                      id="borrowAmount"
                      type="number"
                      step="0.01"
                      placeholder="Min: 0,01"
                      required
                      ref={(input) => {
                        this.borrowAmount = input;
                      }}
                    />
                    <label for="name">Amount</label>
                  </span>
                </div>
                <div className="frame">
                  <button
                    type="submit"
                    class="custom-btn btn-7 test1 variant-1 "
                  >
                    <span>BORROW</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="item item--4">
              <div>
                Lend ETHER
                <br></br>
                Receive collateral fees
                <br></br>
                <div className="frame">
                  <button
                    type="submit"
                    className="custom-btn btn-7 test1 variant-1 "
                    onClick={(e) => this.payOff(e)}
                  >
                    <span>PAY OFF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

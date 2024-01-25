import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

class App extends Component {
    state = { walletInfo: {} };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return ( 
            <div className="App">
                <img className="logo" src={logo}></img>
                <br />
                <div>Welcome to DaniChain!</div>
                <br />
                <div><Link to="/blocks">Blocks</Link></div>
                <br />
                <div className="WalletInfo">
                    <div>Address: {address}</div>
                    <div>Balance: {balance}</div>
                </div>
            </div>
        );
    }
}

export default App;
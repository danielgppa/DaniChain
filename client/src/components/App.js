import React, { Component } from "react";

class App extends Component {
    state = { walletInfo: {} };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return <div>
            <div>Welcome to DaniChain!</div>
            <br />
            <div className="WalletInfo">
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
            </div>
        </div>;
    }
}

export default App;
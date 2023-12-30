const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data));
    }

    createTransaction({recipient,amount}){

        if(amount > this.balance){
            throw new Error('Amount exceeds balance');
        }
        if(amount == 0){
            throw new Error('Amount can not be zero');
        }
        if(amount < 0){
            throw new Error('Amount can not be negative');
        }
 
        return new Transaction({senderWallet:this,recipient,amount});
    }
}

module.exports = Wallet;
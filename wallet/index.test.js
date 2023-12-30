const Wallet = require('./index');
const Transaction = require('./transaction');
const { verifySignature } = require('../util');

describe('Wallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('has a `balance`', () => {
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', () => {
        expect(wallet).toHaveProperty('publicKey');
    });

    describe('signing data', () => {
        const data = 'foobar';

        it('verifies a signature', () => {
            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: wallet.sign(data)
                })
            ).toBe(true);
        });

        it('does not verify an invalid signature', () => {
            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: new Wallet().sign(data)
                })
            ).toBe(false);
        });
    });

    describe('createTransaction()', () => {

        describe('and the amount exceeds the balance or zero or negative',()=>{

            it('throws an error',()=>{
                expect(()=>wallet.createTransaction({amount:999999,recipient:'any-recipient'}))
                 .toThrow('Amount exceeds balance');
            });

            it('throws an error',()=>{
                expect(()=>wallet.createTransaction({amount:0,recipient:'any-recipient'}))
                 .toThrow('Amount can not be zero');
            });

            it('throws an error',()=>{
                expect(()=>wallet.createTransaction({amount:-100,recipient:'any-recipient'}))
                 .toThrow('Amount can not be negative');
            });
        });

        describe('and the amount is valid', () => {
            let transaction, amount, recipient;

            beforeEach(() => {
                amount = 50;
                recipient = 'foo-recipient';
                transaction = wallet.createTransaction({ amount, recipient });
            });

            it('creates an instance of `Transaction`', () => {
                expect(transaction instanceof Transaction).toBe(true);
            });

            it('matches the transaction input with the wallet', () => {
                expect(transaction.input.address).toEqual(wallet.publicKey);
            });

            it('outputs the amount to the recipient', () => {
                expect(transaction.outputMap[recipient]).toEqual(amount);
            });
        });
    });
});
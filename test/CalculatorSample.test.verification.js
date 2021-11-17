const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const calculator_json = require('./../build/contracts/CalculatorSample.json');

let accounts;
let calculator;
let owner;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    calculator = await new web3.eth.Contract(calculator_json['abi'])
        .deploy({
            data: calculator_json['bytecode'],
            arguments: [/*deploy, args*/]
        })
        .send({
            from: owner,
            gas: '999999'
        });
});

describe('CalculatorSampleVerification', () => {
    it('Can multiply two numbers', async () => {
        assert.equal(await calculator.methods.mul(2, 3).call(), 6);
    });

    it('Can divide two numbers', async () => {
        assert.equal(await calculator.methods.div(9, 3).call(), 3);
    });
});

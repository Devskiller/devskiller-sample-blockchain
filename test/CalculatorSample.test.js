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

describe('CalculatorSample', () => {
    it('Can add two numbers', async () => {
        assert.equal(await calculator.methods.add(2, 3).call(), 5);
    });

    it('Can subtract two numbers', async () => {
        assert.equal(await calculator.methods.sub(2, 3).call(), -1);
    });
});

let Calculator = artifacts.require("./CalculatorSample.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator /*, deploy, args*/);
};

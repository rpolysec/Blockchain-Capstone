// migrating the appropriate contracts
var SquareVerifier = artifacts.require("verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var customerc721token = artifacts.require("CustomERC721Token");

module.exports = function(deployer) {
  deployer.deploy(customerc721token,'alphatoken1','at1');
  deployer.deploy(SquareVerifier)
  .then(() => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address,'betatoken1','bt1')
  });
};

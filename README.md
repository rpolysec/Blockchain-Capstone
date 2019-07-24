# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Handin Details

## Contracts
Contract: SolnSquareVerifier
Address: 0x2F6795051DA5f79eF4451D4A6526D6DFC3AFCb82
Name: betatoken1
Symbol: bt1

Contract: Verifier
Address: 0x3Aa4CaD32f4f8245d9Ee410AAcBEd1111A3c81B0

Contract: CustomERC721Token
Address: 0xe204F802d34CF7BC3c670a73DA80CC7095D0Bd83

## OpenSea

OpenSea MarketPlace Storefront links:
https://rinkeby.opensea.io/category/betatoken1
https://rinkeby.opensea.io/storefront/sunrise-housing-udacity-capstone

Contract Owner: 0x128fA10168790263921668a45E0f00e00361A533
Second Address: 0xDCf0a8aD36E9b40025A69A6B409f8ef67d5aF364

# Install

Clone this repository and run the following commands:

`npm install`

`truffle compile`

# Tests

There are three test files, one for each of the main contracts:
* TestERC721Mintable.js
* TestSolnSquareVerifier.js
* TestSquareVerifier.js

Start ganache-cli to provide a test network:

`ganache-cli`

You should be able to run each of the tests with the command:

`truffle test`

Double check your migrations file, 2_deploy_contracts.js, mathces up with your expectations.

# Dependencies

The following packages are required, npm install should take care of retrieving all the modules:

* "openzeppelin-solidity": "^2.2.0",
* "solc": "^0.5.2",
* "solc-js": "^0.5.2"
* "web3": "^1.0.0-beta.55"

For development and testing I used:

* Ganache CLI v6.4.3 (ganache-core: 2.5.5)
* Truffle v5.0.28 - a development framework for Ethereum

## Contributing

You don't need to contribute to me.  A passing grade will do.

## Versioning

This is the one and only version.

## Authors

* **Ryan Wegner**

## License

No license here.  Use this however you see fit.

## Acknowledgments

* Udacity for organizing this fine course.
* Alvaro P. Udacity Mentor for organizing so much reference material.

# Additional Guidance

This project is based on the boiler plate code found here:
https://github.com/udacity/Blockchain-Capstone

An FAQ on the project posted by Udacity Mentors is available here:
https://medium.com/@andresaaap/capstone-real-estate-marketplace-project-faq-udacity-blockchain-69fe13b4c14e

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

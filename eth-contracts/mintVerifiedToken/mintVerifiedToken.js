require('dotenv').config();
const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK
const NUM_CREATURES = 0

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
  return
}

const NFT_ABI = [{
  "constant": false,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "name": "a",
      "type": "uint256[2]"
    },
    {
      "name": "b",
      "type": "uint256[2][2]"
    },
    {
      "name": "c",
      "type": "uint256[2]"
    },
    {
      "name": "input",
      "type": "uint256[2]"
    }
  ],
  "name": "verifiedMint",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]

async function main() {
  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
  const web3Instance = new web3(provider)
  let tokenid = 12356;
  let rawdata = fs.readFileSync('proofs.json');
  let proofs = JSON.parse(rawdata);
  let proof = proofs['proof10'];
  let proof_a1 = proof['a'][0];
  let proof_a2 = proof['a'][1];
  let proof_b11 = proof['b'][0][0];
  let proof_b12 = proof['b'][0][1];
  let proof_b21 = proof['b'][1][0];
  let proof_b22 = proof['b'][1][1];
  let proof_c1 = proof['c'][0];
  let proof_c2 = proof['c'][1];
  let input_1 = "0x0000000000000000000000000000000000000000000000000000000000000009";
  let input_2 = "0x0000000000000000000000000000000000000000000000000000000000000001";
  
  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "10000000" });
    console.log(`Minting tokens as ${OWNER_ADDRESS}`);

    web3Instance.eth.getBalance(OWNER_ADDRESS, function (error, result) {
      if (!error) {
        console.log(`Available balance ${result}`);
      } else {
        console.log(error);
      }
    });

    nftContract.methods.verifiedMint(OWNER_ADDRESS,tokenid,
      [proof_a1,proof_a2],
      [[proof_b11,proof_b12],[proof_b21,proof_b22]],
      [proof_c1,proof_c2],
      [input_1,input_2]
    )
    .send({ from: OWNER_ADDRESS, gas: 900000 }, function(error, result) {
      if (!error) {
        console.log(`Token minted with transaction id ${result}`);
      } else {
        console.log(error);
      }
    });
  }
}

main();
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var verifier = artifacts.require('Verifier');

contract('Solution Square Verifier Token Tests', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    // - use the contents from proof.json generated from zokrates steps
    let proof_a1 = "0x163be171c906530f2287a80013937d5fc789d27ecf9ad47d050125c3150d9251";
    let proof_a2 = "0x208526de6fd155433e7f4d08836c253464822d75ff79264a8cec4141f12d5fa6";
    let proof_b11 = "0x1c9686b325d2d1fcd92fdabbd17cd4d9a2e9ff33c27e41dad0cb4926953a935b";
    let proof_b12 = "0x035cc9b4bfdbdbc422fa3d3e605e7d1866bac4ef3fd4dead017e5d29674987d9";
    let proof_b21 = "0x2841aa76069e3126f4471cc55e3c41415eb7d7bdc82f7d557198662e5192f54d";
    let proof_b22 = "0x1c8656b8c61b4e5e54d6469b8844aa85d568335b9ad2760c64a6e0332bafdb22";
    let proof_c1 = "0x1f9410986b83eea47300bc1f8b21a8fc5bac7cd1a8f865f9c710e835f30a69d3";
    let proof_c2 = "0x2f0aa81c925a64ad62cf9430527073b4efe2e0bb5aef39f4b1b91d7a1d92eab7";
    
    let input_1 = "0x0000000000000000000000000000000000000000000000000000000000000009";
    let input_2 = "0x0000000000000000000000000000000000000000000000000000000000000001";

    describe('SolnSquareVerifier - mint tokens with verifiers', function () {
        beforeEach(async function () {
            this.verifier = await verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifier.address,'betatoken1','bt1',{from: account_one});
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('mint a token requiring a proof', async function () { 
            try 
            {
                await this.contract.verifiedMint(
                    account_two,
                    111,
                    [proof_a1,proof_a2],
                    [[proof_b11,proof_b12],[proof_b21,proof_b22]],
                    [proof_c1,proof_c2],
                    [input_1,input_2]
                );
            }
            catch(e) {
                console.log(e.message);
            }
            //assert.equal(result, true, "token should have minted with proper proof");
            let owner = await this.contract.ownerOf(111);
            assert.equal(owner,account_two,'Owner should now be account one');
            let expectedURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/111'
            let actualURI = '';

            try 
            {
                actualURI = await this.contract.tokenURI(111);
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(expectedURI,actualURI,'returned token URI does not match the expected one');

            try 
            {
                balance = await this.contract.balanceOf(account_two);
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(balance, 1, "Account should have 1 token following verified mint");
        })

        // Test that a new solutino was added for the contract - SolnSquareVerifier
        it('check that the solution was added', async function () { 
            let result = false;
            try 
            {
                await this.contract.verifiedMint(
                    account_two,
                    222,
                    [proof_a1,proof_a2],
                    [[proof_b11,proof_b12],[proof_b21,proof_b22]],
                    [proof_c1,proof_c2],
                    [input_1,input_2]
                );
            }
            catch(e) {
                console.log(e.message);
            }

            try 
            {
                result = await this.contract.checkSolution.call(
                    [proof_a1,proof_a2],
                    [[proof_b11,proof_b12],[proof_b21,proof_b22]],
                    [proof_c1,proof_c2],
                    [input_1,input_2]
                );
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(result, true, "solution should have already existed");
        });

        // Tryig to mint again with the same proof should fail - SolnSquareVerifier
        it('try to mint a token with a duplicate solution', async function () { 
            try 
            {
                await this.contract.verifiedMint(
                    account_two,
                    111,
                    [proof_a1,proof_a2],
                    [[proof_b11,proof_b12],[proof_b21,proof_b22]],
                    [proof_c1,proof_c2],
                    [input_1,input_2]
                );
            }
            catch(e) {
                console.log(e.message);
            }

            let mintAgain = true;

            try 
            {
                await this.contract.verifiedMint(
                    account_two,
                    111,
                    [proof_a1,proof_a2],
                    [[proof_b11,proof_b12],[proof_b21,proof_b22]],
                    [proof_c1,proof_c2],
                    [input_1,input_2]
                );
            }
            catch(e) {
                //console.log(e.message);
                mintAgain = false;
            }
            assert.equal(mintAgain, false, "token should have minted with proper proof");
        });

    });
});
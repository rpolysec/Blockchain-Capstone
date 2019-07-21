var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('Custom ERC721 Token Tests', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new('betatoken1','bt1',{from: account_one});
            // TODO: mint multiple tokens
            await this.contract.mint(account_one,101);
            await this.contract.mint(account_two,202);
            await this.contract.mint(account_three,301);
            await this.contract.mint(account_three,302);
            await this.contract.mint(account_four,401);
            await this.contract.mint(account_four,402);
            await this.contract.mint(account_four,403);
            await this.contract.mint(account_four,404);
            await this.contract.mint(account_four,405);
        })

        it('should return total supply', async function () { 
            let actualSupply = 0;
            let expectedSupply = 9; 
            try 
            {
                actualSupply = await this.contract.totalSupply();
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(expectedSupply, actualSupply, "Minted 4 coins but got a different total supply");
        })

        it('should get token balance', async function () {
            let account_four_expectedBalance = 5;
            let account_three_expectedBalance = 2;
            let account_four_balance = 0;
            let account_three_balance = 0;

            try 
            {
                account_four_balance = await this.contract.balanceOf(account_four);
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(account_four_balance, account_four_expectedBalance, "Account four has an unexpected balance");

            try 
            {
                account_three_balance = await this.contract.balanceOf(account_three);
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(account_three_balance, account_three_expectedBalance, "Account three has an unexpected balance");

            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let expectedURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/202'
            let actualURI = '';

            try 
            {
                actualURI = await this.contract.tokenURI(202);
            }
            catch(e) {
                console.log(e.message);
            }
            assert.equal(expectedURI,actualURI,'returned token URI does not match the expected one');
        })

        it('should transfer token from one owner to another', async function () {
            let curowner = await this.contract.ownerOf(301);
            let error = false;
            assert.equal(curowner,account_three,'Owner should be account three');
            try
            {
                await this.contract.safeTransferFrom(account_three,account_one,301,{from: account_three});
            }
            catch(e) {
                console.log(e.message);
                error = true;
            }
            assert.equal(error, false, 'error while transfering ownership');
            let newowner = await this.contract.ownerOf(301);
            assert.equal(newowner,account_one,'Owner should now be account one');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new('gammatoken1','gt1',{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let allowed = true;
            try
            {
                await this.contract.mint(account_one,101,{from: account_two});
            }
            catch(e){
                allowed = false;
            }
            assert.equal(allowed,false,'token minted by address other then contract owner');
            
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner();
            assert.equal(owner,account_one,'Owner should be account one');
        })

    });
})
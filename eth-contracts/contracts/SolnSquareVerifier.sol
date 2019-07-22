pragma solidity >=0.4.21 <0.6.0;
import './ERC721Mintable.sol';
import './verifier.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// not sure why this is here, think it's all handled below

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    // need an instance of our verifier
    Verifier _verifier;
    
    // TODO define a mapping to store unique solutions submitted
    // Set the value to true when a solutions was tried and failed to verify
    // Might seem counterintuitive, but I want to fail fast if we know this is wrong
    // but I do NOT want to store the right answer
    mapping(bytes32 => bool) private _uniqueSolutions;
    
    // TODO Create an event to emit when a solution is added
    event solutionAdded(bytes32 key);
    
    /**
    * Create a new instance of the contract by setting the verifier and
    * calling the parent constructor with the name and symbol of the
    * new token type.
    */
    constructor (address verifierAddr, string memory name, string memory symbol)
    CustomERC721Token(name,symbol)
    public {
        _verifier = Verifier(verifierAddr);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    /**
    * To mint a new token the user has to provide proof of ownership in the form of a data structure with the
    * correct values.  If someone has already tried this solution and it was wrong we'll fail fast.  However,
    * we do not store any correct solutions in this contract, just in case.  The correct solution will always
    * have to be re-validated before a token is minted.  Any address that provides the correct proof can mint
    * new tokens, as the proof is enough to know they have ownership, so the contract does not track the address
    * that submitted the solution, rather the parent contract tracks supply of tokens as they are minted.
    */
    function verifiedMint(
        address to,
        uint tokenId,
        // proof
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        // input
        uint[2] memory input) public onlyOwner returns(bool){
            // take a hash of the solution
            bytes32 key = keccak256(abi.encodePacked(a,b,c));

            // check if this solution has been submitted already
            // if the solution has been submitted and we know it's false fail fast
            require(!_uniqueSolutions[key],'Failed proof');

            // probablhy not necessary but making sure we assume it fails
            bool valid = false;

            // attempt to verify the transaction with the provided proof
            valid = _verifier.verifyTx(
                [a[0],a[1]],
                [[b[0][0],b[0][1]],[b[1][0],b[1][1]]],
                [c[0],c[1]],
                [input[0],input[1]]
            );

            emit solutionAdded(key);

            // if it fails, record the failure so we can fail fast next time
            if(!valid){
                _uniqueSolutions[key] = true;
            } else{
                // if it's successful call the mint function the parent to mint the coin
                super.mint(to, tokenId);
            }
            // not sure if anyone will read this, but lets return
            // the result if we get here
            return valid;
        }
}
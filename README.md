# Custody Vault Project

This project consists of a contract that acts as an ERC20 token custody vault and a front-end to interact with the contract. With this contract, it is possible to transfer tokens between two addresses with prior arbitration (within the custody vault) facilitated by a trusted third party.

# Important Step

Before running this project, it's necessary to review the contracts addresses on the "constants" directory. 

Languages used: Solidity, JavaScript, React.


Obs: Please provide .env file in the root following this example
REACT_APP_HVC_TOKEN_CONTRACT_ADDRESS=0xC4d39Bc32D65Fe3a4b81343d0C4101Ee7DE4ca3a

REACT_APP_CUSTODY_VAULT_CONTRACT_ADDRESS=0xCF52f3AEcAfFB32d8952E3988f4a36357dC40E1E

REACT_APP_ALCHEMY_API_KEY=YOUR-API-KEY
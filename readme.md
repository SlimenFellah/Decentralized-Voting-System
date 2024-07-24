# Decentralized Voting System

This project implements a decentralized voting system using Ethereum blockchain technology. It allows for creating elections, adding candidates, and securely casting votes.

## Features

- Create new elections
- Add candidates to an election
- Cast votes securely
- View election results in real-time
- Ensures one vote per address
- Transparent and immutable voting records

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Truffle framework installed (`npm install -g truffle`)
- Ganache for local blockchain simulation [Download Ganache](https://archive.trufflesuite.com/ganache/)
- MetaMask browser extension for interacting with the dApp [Download MetaMask](https://metamask.io/)

## Installation

1. Clone the repository:
   `git clone https://github.com/SlimenFellah/Decentralized-Voting-System.git`
   `cd Decentralized-Voting-System`

2. Install dependencies:
   `npm install`

3. Start Ganache and ensure it's running on `http://127.0.0.1:7545`

4. Compile and migrate the smart contracts:
   `truffle compile`
   `truffle migrate --reset`

5. Start the development server:
   `npx webpack serve`

## Usage

1. Connect MetaMask to your local Ganache network (usually `http://127.0.0.1:7545`)

2. Import one of the Ganache accounts into MetaMask using the private key

3. Navigate to `http://localhost:8080` in your browser

4. Use the interface to add candidates and cast votes

5. View the election results in real-time

## Smart Contract

The main smart contract `Voting.sol` includes the following key functions:

- `addCandidate(string memory _name)`: Add a new candidate to the election
- `vote(uint _candidateId)`: Cast a vote for a specific candidate
- `getVoteCount(uint _candidateId)`: Get the number of votes for a specific candidate

## Development

To make changes to the smart contract:

1. Modify `contracts/Voting.sol`
2. Compile and migrate the contract: `truffle migrate --reset`
3. Update the ABI in the frontend if necessary

To modify the frontend:

1. Edit files in the `src` directory
2. The changes will be automatically reflected if you're running the webpack dev server

## Testing

Run the test suite:
`truffle test`

## Contributing

Contributions to the Decentralized Voting System are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

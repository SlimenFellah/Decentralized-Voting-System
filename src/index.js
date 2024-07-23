import Web3 from 'web3';
import votingArtifact from '../build/contracts/Voting.json';

let web3;
let voting;
let accounts;

const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};
const initContract = async () => {
    const networkId = await web3.eth.net.getId();
    console.log("Current network ID:", networkId);
    const deployedNetwork = votingArtifact.networks[networkId];
    console.log("Deployed network info:", deployedNetwork);
    
    if (!deployedNetwork) {
        throw new Error('Contract not deployed to detected network');
    }
    
    voting = new web3.eth.Contract(
        votingArtifact.abi,
        deployedNetwork.address
    );
    console.log("Contract initialized at address:", deployedNetwork.address);
};
const initApp = async () => {
    accounts = await web3.eth.getAccounts();
    updateElectionName();
    updateCandidatesList();
    updateResults();

    document.getElementById('add-candidate').addEventListener('click', addCandidate);
    document.getElementById('vote').addEventListener('click', vote);
};

const updateElectionName = async () => {
    const electionName = await voting.methods.electionName().call();
    document.getElementById('election-name').innerText = electionName;
};

const updateCandidatesList = async () => {
    const candidatesCount = await voting.methods.candidatesCount().call();
    const candidateList = document.getElementById('candidate-list');
    candidateList.innerHTML = '';
    for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await voting.methods.candidates(i).call();
        const li = document.createElement('li');
        li.innerText = `${candidate.id}: ${candidate.name}`;
        candidateList.appendChild(li);
    }
};

const updateResults = async () => {
    const candidatesCount = await voting.methods.candidatesCount().call();
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    for (let i = 1; i <= candidatesCount; i++) {
        const voteCount = await voting.methods.getVoteCount(i).call();
        const candidate = await voting.methods.candidates(i).call();
        const li = document.createElement('li');
        li.innerText = `${candidate.name}: ${voteCount} votes`;
        resultsList.appendChild(li);
    }
};

const addCandidate = async () => {
    const name = document.getElementById('candidate-name').value;
    await voting.methods.addCandidate(name).send({ from: accounts[0] });
    updateCandidatesList();
};

const vote = async () => {
    const candidateId = document.getElementById('candidate-id').value;
    await voting.methods.vote(candidateId).send({ from: accounts[0] });
    updateResults();
};

window.addEventListener('load', async () => {
    await initWeb3();
    await initContract();
    initApp();
});


console.log("Network ID:", networkId);
console.log("Deployed network:", deployedNetwork);
console.log("ABI:", votingArtifact.abi);
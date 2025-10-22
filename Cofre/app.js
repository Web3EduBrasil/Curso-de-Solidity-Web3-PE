// Configurações
const contractAddress = '0xd9F23b5E732cd05e4979c29E913CeAdd847F1fD4';
const contractABI = [
    {
        "inputs": [],
        "name": "depositar",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "destinatario",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "valor",
                "type": "uint256"
            }
        ],
        "name": "transferirPara",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "dono",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saldoDoContrato",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Variáveis
let web3, contract, userAccount;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connectBtn').onclick = conectar;
    document.getElementById('depositBtn').onclick = depositar;
    document.getElementById('transferBtn').onclick = transferir;
    document.getElementById('checkBalanceBtn').onclick = verificarSaldo;
});

// Conectar
async function conectar() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        // Verificar rede Arbitrum Sepolia
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x66eee') { // 421614 em hex
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x66eee' }],
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x66eee',
                            chainName: 'Arbitrum Sepolia',
                            rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
                            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                            blockExplorerUrls: ['https://sepolia.arbiscan.io/']
                        }]
                    });
                }
            }
        }
        
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        
        // Obter dono do contrato
        const owner = await contract.methods.dono().call();
        
        document.getElementById('connectionStatus').innerHTML = '<i class="fas fa-circle"></i><span>Conectado</span>';
        document.getElementById('connectionStatus').className = 'connection-status connected';
        document.getElementById('userAccount').textContent = formatAddress(userAccount);
        document.getElementById('ownerAddress').textContent = formatAddress(owner);
        document.getElementById('connectionInfo').style.display = 'block';
        
        // Verificar saldo automaticamente
        await verificarSaldo();
        
        alert('Conectado na Arbitrum Sepolia!');
    } catch (error) {
        alert('Erro ao conectar: ' + error.message);
    }
}

// Depositar
async function depositar() {
    const valor = document.getElementById('depositAmount').value;
    if (!valor || valor <= 0) {
        alert('Digite um valor válido!');
        return;
    }
    
    try {
        const valorWei = web3.utils.toWei(valor, 'ether');
        await contract.methods.depositar().send({ 
            from: userAccount, 
            value: valorWei 
        });
        alert('Depósito realizado com sucesso!');
        document.getElementById('depositAmount').value = '';
        await verificarSaldo();
    } catch (error) {
        alert('Erro ao depositar: ' + error.message);
    }
}

// Transferir
async function transferir() {
    const destinatario = document.getElementById('recipientAddress').value;
    const valor = document.getElementById('transferAmount').value;
    
    if (!destinatario || !valor || valor <= 0) {
        alert('Preencha todos os campos!');
        return;
    }
    
    try {
        const valorWei = web3.utils.toWei(valor, 'ether');
        await contract.methods.transferirPara(destinatario, valorWei).send({ 
            from: userAccount 
        });
        alert('Transferência realizada com sucesso!');
        document.getElementById('recipientAddress').value = '';
        document.getElementById('transferAmount').value = '';
        await verificarSaldo();
    } catch (error) {
        alert('Erro ao transferir: ' + error.message);
    }
}

// Verificar saldo
async function verificarSaldo() {
    try {
        const saldoWei = await contract.methods.saldoDoContrato().call({ from: userAccount });
        const saldoEth = web3.utils.fromWei(saldoWei, 'ether');
        document.getElementById('balanceAmount').textContent = parseFloat(saldoEth).toFixed(32);
    } catch (error) {
        alert('Erro ao verificar saldo: ' + error.message);
    }
}

// Formatar endereço
function formatAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
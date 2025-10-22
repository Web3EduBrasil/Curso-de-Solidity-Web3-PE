// Configurações
const contractAddress = '0x249d4630d022820181421B07259983C9d6Fd0a11';
const contractABI = [
    {
        "inputs": [],
        "name": "depositar",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sacarTudo",
        "outputs": [],
        "stateMutability": "nonpayable",
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
    document.getElementById('withdrawBtn').onclick = sacarTudo;
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
        
        // Verificar saldo automaticamente se for o dono
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
            await verificarSaldo();
        } else {
            document.getElementById('balanceAmount').textContent = "Apenas o dono";
        }
        
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
            from: userAccount,
            value: valorWei
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
    if (!web3 || !contract) {
        alert('Conecte sua carteira primeiro!');
        return;
    }
    
    try {
        // Verificar se o usuário é o dono
        const owner = await contract.methods.dono().call();
        
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
            // Se for o dono, pode ver o saldo
            const saldoWei = await contract.methods.saldoDoContrato().call({ from: userAccount });
            const saldoEth = web3.utils.fromWei(saldoWei, 'ether');
            document.getElementById('balanceAmount').textContent = parseFloat(saldoEth).toFixed(4);
        } else {
            // Se não for o dono, mostrar mensagem
            document.getElementById('balanceAmount').textContent = "Apenas o dono";
            alert('Apenas o dono do cofre pode verificar o saldo!');
        }
    } catch (error) {
        alert('Erro ao verificar saldo: ' + error.message);
    }
}

// Sacar tudo (deixando valor mínimo + taxa de rede)
async function sacarTudo() {
    if (!web3 || !contract) {
        alert('Conecte sua carteira primeiro!');
        return;
    }
    
    try {
        // Verificar se é o dono
        const owner = await contract.methods.dono().call();
        if (userAccount.toLowerCase() !== owner.toLowerCase()) {
            alert('Apenas o dono pode sacar!');
            return;
        }
        
        // Estimar gas para a transação
        const gasEstimate = await contract.methods.sacarTudo().estimateGas({ from: userAccount });
        const gasPrice = await web3.eth.getGasPrice();
        const networkFeeWei = gasEstimate * gasPrice;
        const networkFeeEth = web3.utils.fromWei(networkFeeWei.toString(), 'ether');
        
        // Obter saldo atual
        const saldoWei = await contract.methods.saldoDoContrato().call({ from: userAccount });
        const saldoEth = web3.utils.fromWei(saldoWei, 'ether');
        
        const valorMinimoEth = 0.0001;
        const totalReservadoEth = parseFloat(networkFeeEth) + valorMinimoEth;
        const valorSaqueEth = parseFloat(saldoEth) - totalReservadoEth;
        
        if (valorSaqueEth <= 0) {
            alert(`Saldo insuficiente!\nSaldo: ${parseFloat(saldoEth).toFixed(6)} ETH\nTaxa estimada: ${parseFloat(networkFeeEth).toFixed(6)} ETH\nValor mínimo: ${valorMinimoEth} ETH\nTotal necessário: ${totalReservadoEth.toFixed(6)} ETH`);
            return;
        }
        
        const mensagem = `Confirmar saque?\n\nSaldo atual: ${parseFloat(saldoEth).toFixed(6)} ETH\nTaxa estimada: ${parseFloat(networkFeeEth).toFixed(6)} ETH\nValor mínimo no cofre: ${valorMinimoEth} ETH\nValor a receber: ~${valorSaqueEth.toFixed(6)} ETH`;
        
        if (confirm(mensagem)) {
            await contract.methods.sacarTudo().send({ 
                from: userAccount,
                gas: Math.ceil(gasEstimate * 1.2), // 20% margem de segurança
                gasPrice: gasPrice
            });
            alert('Saque realizado com sucesso!');
            await verificarSaldo();
        }
    } catch (error) {
        alert('Erro ao sacar: ' + error.message);
    }
}

// Formatar endereço
function formatAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
// Configurações
const contractAddress = '0x6c85B88A168aa7aEE142f0E34dBa8679Ca9Fbc37';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nova",
                "type": "address"
            }
        ],
        "name": "atualizarImplementacao",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_implementation",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "admin",
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
        "name": "implementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
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
    document.getElementById('updateBtn').onclick = atualizarImplementacao;
    document.getElementById('loadAdminBtn').onclick = carregarAdmin;
    document.getElementById('loadImplBtn').onclick = carregarImplementacao;
    document.getElementById('checkAdminBtn').onclick = verificarAdmin;
    document.getElementById('checkImplBtn').onclick = verificarImplementacao;
    document.getElementById('clearLogBtn').onclick = limparLog;
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
        
        // Atualizar UI
        document.getElementById('connectionStatus').innerHTML = '<i class="fas fa-circle"></i><span>Conectado</span>';
        document.getElementById('connectionStatus').className = 'connection-status connected';
        document.getElementById('userAccount').textContent = formatAddress(userAccount);
        document.getElementById('connectionInfo').style.display = 'block';
        
        // Carregar informações do proxy
        await carregarAdmin();
        await carregarImplementacao();
        
        adicionarLog('Conectado à rede Arbitrum Sepolia', 'success');
        alert('Conectado na Arbitrum Sepolia!');
    } catch (error) {
        adicionarLog('Erro ao conectar: ' + error.message, 'error');
        alert('Erro ao conectar: ' + error.message);
    }
}

// Carregar admin atual
async function carregarAdmin() {
    if (!contract) {
        alert('Conecte sua carteira primeiro!');
        return;
    }
    
    try {
        const admin = await contract.methods.admin().call();
        document.getElementById('currentAdmin').textContent = formatAddress(admin);
        document.getElementById('adminAddress').textContent = formatAddress(admin);
        adicionarLog(`Admin carregado: ${formatAddress(admin)}`, 'info');
    } catch (error) {
        adicionarLog('Erro ao carregar admin: ' + error.message, 'error');
        alert('Erro ao carregar admin: ' + error.message);
    }
}

// Carregar implementação atual
async function carregarImplementacao() {
    if (!contract) {
        alert('Conecte sua carteira primeiro!');
        return;
    }
    
    try {
        const implementation = await contract.methods.implementation().call();
        document.getElementById('currentImplementation').textContent = formatAddress(implementation);
        adicionarLog(`Implementação carregada: ${formatAddress(implementation)}`, 'info');
    } catch (error) {
        adicionarLog('Erro ao carregar implementação: ' + error.message, 'error');
        alert('Erro ao carregar implementação: ' + error.message);
    }
}

// Atualizar implementação
async function atualizarImplementacao() {
    const novoEndereco = document.getElementById('newImplementation').value.trim();
    
    if (!novoEndereco) {
        showStatus('updateStatus', 'Digite um endereço válido!', 'error');
        return;
    }
    
    if (!web3.utils.isAddress(novoEndereco)) {
        showStatus('updateStatus', 'Endereço inválido!', 'error');
        return;
    }
    
    if (!contract) {
        showStatus('updateStatus', 'Conecte sua carteira primeiro!', 'error');
        return;
    }
    
    try {
        // Verificar se é o admin
        const admin = await contract.methods.admin().call();
        if (userAccount.toLowerCase() !== admin.toLowerCase()) {
            showStatus('updateStatus', 'Apenas o admin pode atualizar a implementação!', 'error');
            return;
        }
        
        showStatus('updateStatus', 'Processando transação...', 'info');
        
        const result = await contract.methods.atualizarImplementacao(novoEndereco).send({ 
            from: userAccount 
        });
        
        showStatus('updateStatus', 'Implementação atualizada com sucesso!', 'success');
        adicionarLog(`Implementação atualizada para: ${formatAddress(novoEndereco)}`, 'success');
        
        // Limpar campo e recarregar
        document.getElementById('newImplementation').value = '';
        await carregarImplementacao();
        
    } catch (error) {
        showStatus('updateStatus', 'Erro ao atualizar implementação: ' + error.message, 'error');
        adicionarLog('Erro ao atualizar implementação: ' + error.message, 'error');
    }
}

// Verificar se endereço é admin
async function verificarAdmin() {
    const endereco = document.getElementById('addressToCheck').value.trim();
    
    if (!endereco) {
        alert('Digite um endereço para verificar!');
        return;
    }
    
    if (!web3.utils.isAddress(endereco)) {
        alert('Endereço inválido!');
        return;
    }
    
    try {
        const admin = await contract.methods.admin().call();
        const isAdmin = endereco.toLowerCase() === admin.toLowerCase();
        
        const resultDiv = document.getElementById('checkResult');
        resultDiv.className = `check-result ${isAdmin ? 'positive' : 'negative'}`;
        resultDiv.innerHTML = `
            <i class="fas ${isAdmin ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <strong>${formatAddress(endereco)}</strong> 
            ${isAdmin ? 'É' : 'NÃO é'} o admin do contrato.
        `;
        
        adicionarLog(`Verificação admin: ${formatAddress(endereco)} - ${isAdmin ? 'É admin' : 'Não é admin'}`, 'info');
    } catch (error) {
        alert('Erro ao verificar admin: ' + error.message);
    }
}

// Verificar se endereço é implementação
async function verificarImplementacao() {
    const endereco = document.getElementById('addressToCheck').value.trim();
    
    if (!endereco) {
        alert('Digite um endereço para verificar!');
        return;
    }
    
    if (!web3.utils.isAddress(endereco)) {
        alert('Endereço inválido!');
        return;
    }
    
    try {
        const implementation = await contract.methods.implementation().call();
        const isImplementation = endereco.toLowerCase() === implementation.toLowerCase();
        
        const resultDiv = document.getElementById('checkResult');
        resultDiv.className = `check-result ${isImplementation ? 'positive' : 'negative'}`;
        resultDiv.innerHTML = `
            <i class="fas ${isImplementation ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <strong>${formatAddress(endereco)}</strong> 
            ${isImplementation ? 'É' : 'NÃO é'} a implementação atual.
        `;
        
        adicionarLog(`Verificação implementação: ${formatAddress(endereco)} - ${isImplementation ? 'É implementação' : 'Não é implementação'}`, 'info');
    } catch (error) {
        alert('Erro ao verificar implementação: ' + error.message);
    }
}

// Adicionar entrada no log
function adicionarLog(mensagem, tipo) {
    const logDiv = document.getElementById('operationLog');
    const timestamp = new Date().toLocaleTimeString();
    
    // Remover mensagem vazia se existir
    const emptyMsg = logDiv.querySelector('.log-empty');
    if (emptyMsg) {
        emptyMsg.remove();
    }
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <div class="log-timestamp">${timestamp}</div>
        <div class="log-message">${mensagem}</div>
    `;
    
    logDiv.insertBefore(logEntry, logDiv.firstChild);
    
    // Manter apenas as últimas 20 entradas
    const entries = logDiv.querySelectorAll('.log-entry');
    if (entries.length > 20) {
        entries[entries.length - 1].remove();
    }
}

// Limpar log
function limparLog() {
    const logDiv = document.getElementById('operationLog');
    logDiv.innerHTML = '<p class="log-empty">Nenhuma operação realizada ainda.</p>';
}

// Mostrar mensagem de status
function showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status-message ${type}`;
}

// Formatar endereço
function formatAddress(address) {
    if (!address) return '-';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
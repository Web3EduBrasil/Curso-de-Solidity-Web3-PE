// Configurações
const contractAddress = '0xc09ff412327DcF8a28fdfc2AFa823F75CE00ee79';
const contractABI = [
    {
        "inputs": [{"internalType": "string", "name": "_nome", "type": "string"}],
        "name": "cadastrarUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
        "name": "removerUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listarUsuarios",
        "outputs": [{"components": [{"internalType": "address", "name": "endereco", "type": "address"}, {"internalType": "string", "name": "nome", "type": "string"}], "internalType": "struct CadastroUusarios.Cadastro[]", "name": "", "type": "tuple[]"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Variáveis
let web3, contract, userAccount;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connectBtn').onclick = conectar;
    document.getElementById('registerBtn').onclick = cadastrar;
    document.getElementById('loadUsersBtn').onclick = listar;
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
        
        document.getElementById('connectionStatus').innerHTML = '<i class="fas fa-circle"></i><span>Conectado</span>';
        document.getElementById('connectionStatus').className = 'connection-status connected';
        document.getElementById('userAccount').textContent = formatAddress(userAccount);
        document.getElementById('contractAddress').textContent = formatAddress(contractAddress);
        document.getElementById('connectionInfo').style.display = 'block';
        
        alert('Conectado na Arbitrum Sepolia!');
    } catch (error) {
        alert('Erro ao conectar: ' + error.message);
    }
}

// Cadastrar
async function cadastrar() {
    const nome = document.getElementById('userName').value;
    if (!nome) {
        alert('Digite um nome!');
        return;
    }
    
    try {
        await contract.methods.cadastrarUsuario(nome).send({ from: userAccount });
        alert('Usuário cadastrado!');
        document.getElementById('userName').value = '';
        listar();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

// Listar usuários
async function listar() {
    try {
        const usuarios = await contract.methods.listarUsuarios().call();
        const lista = document.getElementById('usersList');
        lista.innerHTML = '';
        
        usuarios.forEach((user, i) => {
            lista.innerHTML += `
                <div class="user-item">
                    <div class="user-header">
                        <div class="user-name">${user.nome}</div>
                    </div>
                    <div class="user-details">
                        <div class="user-detail"><strong>ID:</strong> ${i}</div>
                        <div class="user-detail"><strong>Endereço:</strong> ${formatAddress(user.endereco)}</div>
                    </div>
                    <div class="user-actions">
                        <button onclick="remover(${i})" class="btn btn-danger">Remover</button>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('totalUsers').textContent = usuarios.length;
    } catch (error) {
        alert('Erro ao listar: ' + error.message);
    }
}

// Remover usuário
async function remover(id) {
    if (confirm('Remover usuário?')) {
        try {
            await contract.methods.removerUsuario(id).send({ from: userAccount });
            alert('Usuário removido!');
            listar();
        } catch (error) {
            alert('Erro ao remover: ' + error.message);
        }
    }
}

// Formatar endereço
function formatAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

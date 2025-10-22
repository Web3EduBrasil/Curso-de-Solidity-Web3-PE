// Variáveis globais
let web3;
let contract;
let userAccount;

// Configuração do contrato
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "a",
                "type": "address"
            }
        ],
        "name": "consultarNome",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nm",
                "type": "string"
            }
        ],
        "name": "registrarNome",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = "0x1c37009124E4ba59daF147E9b11A9aCC5A1530f1";

// Funções utilitárias para UI
function showStatus(elementId, message, type = 'info') {
    const statusElement = document.getElementById(elementId);
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    statusElement.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}

function setButtonLoading(buttonId, isLoading, originalText) {
    const button = document.getElementById(buttonId);
    if (isLoading) {
        button.innerHTML = `<div class="loading"></div> Processando...`;
        button.disabled = true;
    } else {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function formatAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function getNetworkName(chainId) {
    const networks = {
        '1': 'Ethereum Mainnet',
        '3': 'Ropsten Testnet',
        '4': 'Rinkeby Testnet',
        '5': 'Goerli Testnet',
        '42': 'Kovan Testnet',
        '137': 'Polygon Mainnet',
        '80001': 'Mumbai Testnet',
        '56': 'BSC Mainnet',
        '97': 'BSC Testnet',
        '11155111': 'Sepolia Testnet',
        '421614': 'Arbitrum Sepolia Testnet'
    };
    return networks[chainId] || `Rede ${chainId}`;
}

async function updateNetworkInfo() {
    try {
        const chainId = await web3.eth.getChainId();
        const networkName = await getNetworkName(chainId.toString());
        document.getElementById('networkName').textContent = networkName;
        document.getElementById('accountAddress').textContent = formatAddress(userAccount);
        document.getElementById('networkInfo').style.display = 'block';
    } catch (error) {
        console.error('Erro ao obter informações da rede:', error);
    }
}

// Event Listeners
async function connectWallet() {
    if (!window.ethereum) {
        showStatus('connectionStatus', 
            'MetaMask não encontrado! Por favor, instale a extensão MetaMask.', 
            'error'
        );
        return;
    }

    setButtonLoading('connectBtn', true, 
        '<i class="fas fa-plug"></i> Conectar MetaMask'
    );

    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        if (accounts.length === 0) {
            throw new Error('Nenhuma conta selecionada');
        }

        web3 = new Web3(window.ethereum);
        userAccount = accounts[0];
        contract = new web3.eth.Contract(abi, contractAddress);

        // Atualizar UI
        document.getElementById('walletSection').classList.add('wallet-connected');
        document.getElementById('walletStatus').textContent = 'Carteira conectada com sucesso!';
        document.getElementById('connectBtn').innerHTML = 
            '<i class="fas fa-check"></i> Conectado';
        document.getElementById('connectBtn').classList.add('btn-success');
        
        await updateNetworkInfo();
        
        showStatus('connectionStatus', 
            `Conectado com sucesso! Endereço: ${formatAddress(userAccount)}`, 
            'success'
        );

        // Listener para mudança de conta
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                location.reload();
            } else {
                userAccount = accounts[0];
                updateNetworkInfo();
            }
        });

        // Listener para mudança de rede
        window.ethereum.on('chainChanged', () => {
            location.reload();
        });

    } catch (error) {
        console.error('Erro de conexão:', error);
        let errorMessage = 'Falha ao conectar com a carteira. ';
        
        if (error.code === 4001) {
            errorMessage += 'Conexão rejeitada pelo usuário.';
        } else if (error.code === -32002) {
            errorMessage += 'Solicitação de conexão pendente. Verifique o MetaMask.';
        } else {
            errorMessage += error.message || 'Erro desconhecido.';
        }
        
        showStatus('connectionStatus', errorMessage, 'error');
    } finally {
        setButtonLoading('connectBtn', false, 
            '<i class="fas fa-plug"></i> Conectar MetaMask'
        );
    }
}

async function registerName() {
    if (!web3 || !contract || !userAccount) {
        showStatus('registerStatus', 
            'Conecte sua carteira primeiro!', 
            'error'
        );
        return;
    }

    const nome = document.getElementById('nomeInput').value.trim();
    
    if (!nome) {
        showStatus('registerStatus', 
            'Por favor, digite um nome válido.', 
            'error'
        );
        return;
    }

    if (nome.length > 50) {
        showStatus('registerStatus', 
            'O nome deve ter no máximo 50 caracteres.', 
            'error'
        );
        return;
    }

    setButtonLoading('registrarBtn', true, 
        '<i class="fas fa-save"></i> Registrar Nome'
    );

    try {
        showStatus('registerStatus', 
            'Enviando transação... Confirme no MetaMask.', 
            'info'
        );

        const gasEstimate = await contract.methods.registrarNome(nome)
            .estimateGas({ from: userAccount });

        const receipt = await contract.methods.registrarNome(nome)
            .send({ 
                from: userAccount,
                gas: Math.floor(gasEstimate * 1.2) // 20% buffer
            });

        showStatus('registerStatus', 
            `Nome "${nome}" registrado com sucesso! TX: ${receipt.transactionHash}`, 
            'success'
        );

        // Limpar campo de input
        document.getElementById('nomeInput').value = '';

    } catch (error) {
        console.error('Erro ao registrar nome:', error);
        let errorMessage = 'Erro ao registrar nome. ';
        
        if (error.code === 4001) {
            errorMessage += 'Transação rejeitada pelo usuário.';
        } else if (error.code === -32603) {
            errorMessage += 'Erro de execução do contrato.';
        } else if (error.message.includes('insufficient funds')) {
            errorMessage += 'Fundos insuficientes para a transação.';
        } else {
            errorMessage += error.message || 'Erro desconhecido.';
        }
        
        showStatus('registerStatus', errorMessage, 'error');
    } finally {
        setButtonLoading('registrarBtn', false, 
            '<i class="fas fa-save"></i> Registrar Nome'
        );
    }
}

async function consultName() {
    if (!web3 || !contract) {
        showStatus('consultStatus', 
            'Conecte sua carteira primeiro!', 
            'error'
        );
        return;
    }

    const address = document.getElementById('addressInput').value.trim();
    
    if (!address) {
        showStatus('consultStatus', 
            'Por favor, digite um endereço válido.', 
            'error'
        );
        return;
    }

    if (!isValidEthereumAddress(address)) {
        showStatus('consultStatus', 
            'Endereço Ethereum inválido. Use o formato: 0x...', 
            'error'
        );
        return;
    }

    setButtonLoading('consultarBtn', true, 
        '<i class="fas fa-search"></i> Consultar Nome'
    );

    // Esconder resultado anterior
    document.getElementById('consultResult').classList.remove('show');

    try {
        showStatus('consultStatus', 
            'Consultando blockchain...', 
            'info'
        );

        const nome = await contract.methods.consultarNome(address).call();
        
        if (nome && nome.trim() !== '') {
            document.getElementById('nomeResult').textContent = nome;
            document.getElementById('consultResult').classList.add('show');
            showStatus('consultStatus', 
                'Nome encontrado com sucesso!', 
                'success'
            );
        } else {
            showStatus('consultStatus', 
                'Nenhum nome registrado para este endereço.', 
                'info'
            );
        }

    } catch (error) {
        console.error('Erro ao consultar nome:', error);
        showStatus('consultStatus', 
            'Erro ao consultar nome: ' + (error.message || 'Erro desconhecido.'), 
            'error'
        );
    } finally {
        setButtonLoading('consultarBtn', false, 
            '<i class="fas fa-search"></i> Consultar Nome'
        );
    }
}

// Inicialização da aplicação
function initApp() {
    // Conectar event listeners
    document.getElementById('connectBtn').onclick = connectWallet;
    document.getElementById('registrarBtn').onclick = registerName;
    document.getElementById('consultarBtn').onclick = consultName;

    // Adicionar funcionalidade de Enter nos inputs
    document.getElementById('nomeInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            registerName();
        }
    });

    document.getElementById('addressInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            consultName();
        }
    });

    // Verificar se já está conectado ao carregar a página
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    // Auto conectar se já autorizado
                    connectWallet();
                }
            })
            .catch(error => {
                console.log('Não foi possível verificar contas:', error);
            });
    }
}

// Inicializar quando a página carregar
window.addEventListener('load', initApp);
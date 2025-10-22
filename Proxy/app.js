let web3;
let userAccount;

// Endereços dos contratos (substitua pelos endereços reais)
const PROXY_ADDRESS = '0x6c85B88A168aa7aEE142f0E34dBa8679Ca9Fbc37';
const LOGIC_V1_ADDRESS = '0xYourLogicV1Address'; // Cole o endereço do LogicV1 aqui
const LOGIC_V2_ADDRESS = '0xYourLogicV2Address'; // Cole o endereço do LogicV2 aqui

// ABIs simplificadas
const PROXY_ABI = [
    {
        "inputs": [{"name": "newImplementation", "type": "address"}],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "implementation",
        "outputs": [{"name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [{"name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }
];

const LOGIC_ABI = [
    {
        "inputs": [],
        "name": "incrementar",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "version",
        "outputs": [{"name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Configuração da rede Arbitrum Sepolia
const ARBITRUM_SEPOLIA = {
    chainId: '0x66eee', // 421614 em hexadecimal
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io/']
};

// Conectar à MetaMask
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            // Verificar/adicionar rede Arbitrum Sepolia
            await switchToArbitrumSepolia();
            
            web3 = new Web3(window.ethereum);
            userAccount = accounts[0];
            
            updateConnectionStatus();
            loadContractInfo();
            
        } else {
            alert('MetaMask não encontrada! Por favor, instale a MetaMask.');
        }
    } catch (error) {
        console.error('Erro ao conectar carteira:', error);
        alert('Erro ao conectar carteira: ' + error.message);
    }
}

// Trocar para rede Arbitrum Sepolia
async function switchToArbitrumSepolia() {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ARBITRUM_SEPOLIA.chainId }]
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [ARBITRUM_SEPOLIA]
                });
            } catch (addError) {
                console.error('Erro ao adicionar rede:', addError);
            }
        }
    }
}

// Atualizar status da conexão
function updateConnectionStatus() {
    const statusDiv = document.getElementById('connectionStatus');
    if (userAccount) {
        statusDiv.innerHTML = `
            <div class="status connected">
                ✅ Conectado: ${userAccount.slice(0,6)}...${userAccount.slice(-4)}
            </div>
        `;
        document.getElementById('connectBtn').style.display = 'none';
    } else {
        statusDiv.innerHTML = `
            <div class="status disconnected">
                ❌ Carteira não conectada
            </div>
        `;
        document.getElementById('connectBtn').style.display = 'block';
    }
}

// Carregar informações do contrato
async function loadContractInfo() {
    try {
        const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_ADDRESS);
        
        // Obter endereço da implementação atual
        const currentImplementation = await proxyContract.methods.implementation().call();
        document.getElementById('currentImplementation').textContent = currentImplementation;
        
        // Obter admin
        const admin = await proxyContract.methods.admin().call();
        document.getElementById('adminAddress').textContent = admin;
        
        // Carregar dados da implementação atual
        await loadImplementationData();
        
    } catch (error) {
        console.error('Erro ao carregar informações do contrato:', error);
    }
}

// Carregar dados da implementação
async function loadImplementationData() {
    try {
        // Usar o proxy address com a ABI da lógica
        const logicContract = new web3.eth.Contract(LOGIC_ABI, PROXY_ADDRESS);
        
        // Obter versão
        const version = await logicContract.methods.version().call();
        document.getElementById('currentVersion').textContent = version;
        
        // Obter contador
        const counter = await logicContract.methods.counter().call();
        document.getElementById('counterValue').textContent = counter;
        
    } catch (error) {
        console.error('Erro ao carregar dados da implementação:', error);
        document.getElementById('currentVersion').textContent = 'Erro ao carregar';
        document.getElementById('counterValue').textContent = '0';
    }
}

// Incrementar contador
async function incrementCounter() {
    try {
        if (!web3 || !userAccount) {
            alert('Conecte sua carteira primeiro!');
            return;
        }

        const logicContract = new web3.eth.Contract(LOGIC_ABI, PROXY_ADDRESS);
        
        document.getElementById('incrementBtn').textContent = 'Incrementando...';
        document.getElementById('incrementBtn').disabled = true;
        
        const tx = await logicContract.methods.incrementar().send({ from: userAccount });
        
        console.log('Transação enviada:', tx.transactionHash);
        
        // Atualizar contador após a transação
        setTimeout(() => {
            loadImplementationData();
        }, 3000);
        
        alert('Contador incrementado com sucesso!');
        
    } catch (error) {
        console.error('Erro ao incrementar:', error);
        alert('Erro ao incrementar: ' + error.message);
    } finally {
        document.getElementById('incrementBtn').textContent = '➕ Incrementar';
        document.getElementById('incrementBtn').disabled = false;
    }
}

// Trocar para LogicV1
async function switchToV1() {
    await upgradeImplementation(LOGIC_V1_ADDRESS, 'V1');
}

// Trocar para LogicV2
async function switchToV2() {
    await upgradeImplementation(LOGIC_V2_ADDRESS, 'V2');
}

// Fazer upgrade da implementação
async function upgradeImplementation(newImplementation, version) {
    try {
        if (!web3 || !userAccount) {
            alert('Conecte sua carteira primeiro!');
            return;
        }

        // Verificar se os endereços estão configurados
        if (newImplementation.startsWith('0xYour')) {
            alert(`Configure o endereço do Logic${version} no arquivo app.js primeiro!`);
            return;
        }

        const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_ADDRESS);
        
        const btnId = version === 'V1' ? 'switchV1Btn' : 'switchV2Btn';
        document.getElementById(btnId).textContent = `Trocando para ${version}...`;
        document.getElementById(btnId).disabled = true;
        
        const tx = await proxyContract.methods.upgradeTo(newImplementation).send({ from: userAccount });
        
        console.log('Upgrade realizado:', tx.transactionHash);
        
        // Atualizar informações após o upgrade
        setTimeout(() => {
            loadContractInfo();
        }, 3000);
        
        alert(`Implementação trocada para ${version} com sucesso!`);
        
    } catch (error) {
        console.error('Erro ao fazer upgrade:', error);
        alert('Erro ao fazer upgrade: ' + error.message);
    } finally {
        const btnId = version === 'V1' ? 'switchV1Btn' : 'switchV2Btn';
        document.getElementById(btnId).textContent = `🔄 Trocar para ${version}`;
        document.getElementById(btnId).disabled = false;
    }
}

// Inicializar quando a página carregar
window.addEventListener('load', async () => {
    // Verificar se já está conectado
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            web3 = new Web3(window.ethereum);
            userAccount = accounts[0];
            updateConnectionStatus();
            loadContractInfo();
        }
    }
    
    // Atualizar status inicial
    updateConnectionStatus();
});

// Detectar mudanças de conta/rede
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAccount = accounts[0];
            updateConnectionStatus();
            loadContractInfo();
        } else {
            userAccount = null;
            updateConnectionStatus();
        }
    });

    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}
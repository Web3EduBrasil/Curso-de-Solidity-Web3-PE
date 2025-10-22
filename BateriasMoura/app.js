let web3;
let contract;
let userAccount;

// Configurações do contrato
const CONTRACT_ADDRESS = '0x1c9a4a646cc22E895842B58c307271A21FC81303';
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_tipo",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_uso",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_nr_serie",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_dataprod",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_lote",
                "type": "string"
            }
        ],
        "name": "cadastrarBateria",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "removerBateria",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_dataprod",
                "type": "string"
            }
        ],
        "name": "setDataProd",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_lote",
                "type": "string"
            }
        ],
        "name": "setLote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_nr_serie",
                "type": "string"
            }
        ],
        "name": "setNrSerie",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_tipo",
                "type": "string"
            }
        ],
        "name": "setTipo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_uso",
                "type": "string"
            }
        ],
        "name": "setUso",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_novoDono",
                "type": "address"
            }
        ],
        "name": "transferirDono",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getDataProd",
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
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getLote",
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
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getNrSerie",
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
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getTipo",
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
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getUso",
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
        "inputs": [],
        "name": "listarBaterias",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "tipo",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "uso",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "nr_serie",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "dataprod",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "lote",
                        "type": "string"
                    }
                ],
                "internalType": "struct RastrearBateria.Bateria[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Configuração da rede Arbitrum Sepolia
const ARBITRUM_SEPOLIA = {
    chainId: '0x66eee',
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
            
            await switchToArbitrumSepolia();
            
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
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
                <br>Rede: Arbitrum Sepolia
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
        const dono = await contract.methods.dono().call();
        document.getElementById('donoAddress').textContent = dono;
        
        // Carregar lista inicial
        listarBaterias();
        
    } catch (error) {
        console.error('Erro ao carregar informações:', error);
    }
}

// Cadastrar nova bateria
document.getElementById('cadastrarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!contract || !userAccount) {
        alert('Conecte sua carteira primeiro!');
        return;
    }

    const tipo = document.getElementById('tipo').value;
    const uso = document.getElementById('uso').value;
    const nrSerie = document.getElementById('nrSerie').value;
    const dataProd = document.getElementById('dataProd').value;
    const lote = document.getElementById('lote').value;

    try {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.textContent = '⏳ Cadastrando...';
        submitBtn.disabled = true;

        await contract.methods.cadastrarBateria(tipo, uso, nrSerie, dataProd, lote)
            .send({ from: userAccount });

        alert('✅ Bateria cadastrada com sucesso!');
        e.target.reset();
        listarBaterias();

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('❌ Erro ao cadastrar bateria: ' + error.message);
    } finally {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.textContent = '📝 Cadastrar Bateria';
        submitBtn.disabled = false;
    }
});

// Listar todas as baterias
async function listarBaterias() {
    try {
        if (!contract) return;

        const listaDiv = document.getElementById('listaDiv');
        listaDiv.innerHTML = '<div class="loading">Carregando baterias...</div>';

        const baterias = await contract.methods.listarBaterias().call();
        
        if (baterias.length === 0) {
            listaDiv.innerHTML = `
                <div class="empty-state">
                    <p>Nenhuma bateria cadastrada ainda.</p>
                </div>
            `;
            document.getElementById('totalBaterias').textContent = '0';
            return;
        }

        let html = '<div class="battery-list">';
        let totalAtivas = 0;

        for (let i = 0; i < baterias.length; i++) {
            const bateria = baterias[i];
            
            // Verificar se a bateria foi removida (campos vazios)
            const isRemoved = !bateria.tipo && !bateria.uso && !bateria.nr_serie;
            
            if (!isRemoved) totalAtivas++;

            html += `
                <div class="battery-item ${isRemoved ? 'removed' : ''}">
                    <div class="battery-header">
                        <div class="battery-id">ID: ${i}</div>
                        <div class="battery-actions">
                            ${!isRemoved ? `
                                <button class="btn btn-info" onclick="editarBateria(${i})">
                                    ✏️ Editar
                                </button>
                                <button class="btn btn-danger" onclick="removerBateria(${i})">
                                    🗑️ Remover
                                </button>
                            ` : '<span style="color: #dc3545; font-weight: bold;">REMOVIDA</span>'}
                        </div>
                    </div>
                    <div class="battery-details">
                        <div class="detail-item">
                            <div class="detail-label">Tipo</div>
                            <div class="detail-value">${bateria.tipo || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Uso</div>
                            <div class="detail-value">${bateria.uso || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Número de Série</div>
                            <div class="detail-value">${bateria.nr_serie || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Data de Produção</div>
                            <div class="detail-value">${bateria.dataprod || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Lote</div>
                            <div class="detail-value">${bateria.lote || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        html += '</div>';
        listaDiv.innerHTML = html;
        document.getElementById('totalBaterias').textContent = `${totalAtivas} ativas de ${baterias.length} total`;

    } catch (error) {
        console.error('Erro ao listar baterias:', error);
        document.getElementById('listaDiv').innerHTML = `
            <div style="color: red; text-align: center; padding: 20px;">
                ❌ Erro ao carregar baterias: ${error.message}
            </div>
        `;
    }
}

// Buscar bateria específica
async function buscarBateria() {
    const id = document.getElementById('searchId').value;
    const resultDiv = document.getElementById('searchResult');
    
    if (!contract || !id) {
        resultDiv.innerHTML = '';
        return;
    }

    try {
        resultDiv.innerHTML = '<div class="loading">Buscando...</div>';

        const tipo = await contract.methods.getTipo(id).call();
        const uso = await contract.methods.getUso(id).call();
        const nrSerie = await contract.methods.getNrSerie(id).call();
        const dataProd = await contract.methods.getDataProd(id).call();
        const lote = await contract.methods.getLote(id).call();

        const isRemoved = !tipo && !uso && !nrSerie;

        resultDiv.innerHTML = `
            <div class="search-result-item">
                <h3>🔍 Bateria ID: ${id} ${isRemoved ? '(REMOVIDA)' : ''}</h3>
                <div class="battery-details">
                    <div class="detail-item">
                        <div class="detail-label">Tipo</div>
                        <div class="detail-value">${tipo || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Uso</div>
                        <div class="detail-value">${uso || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Número de Série</div>
                        <div class="detail-value">${nrSerie || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Data de Produção</div>
                        <div class="detail-value">${dataProd || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Lote</div>
                        <div class="detail-value">${lote || 'N/A'}</div>
                    </div>
                </div>
                ${!isRemoved ? `
                    <div style="margin-top: 15px;">
                        <button class="btn btn-info" onclick="editarBateria(${id})">
                            ✏️ Editar Esta Bateria
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

    } catch (error) {
        resultDiv.innerHTML = `
            <div style="color: red; padding: 15px; background: #f8d7da; border-radius: 6px;">
                ❌ Erro: ${error.message}
            </div>
        `;
    }
}

// Editar bateria
async function editarBateria(id) {
    try {
        const tipo = await contract.methods.getTipo(id).call();
        const uso = await contract.methods.getUso(id).call();
        const nrSerie = await contract.methods.getNrSerie(id).call();
        const dataProd = await contract.methods.getDataProd(id).call();
        const lote = await contract.methods.getLote(id).call();

        document.getElementById('editId').value = id;
        document.getElementById('editTipo').value = tipo;
        document.getElementById('editUso').value = uso;
        document.getElementById('editNrSerie').value = nrSerie;
        document.getElementById('editDataProd').value = dataProd;
        document.getElementById('editLote').value = lote;

        document.getElementById('editModal').style.display = 'block';

    } catch (error) {
        alert('Erro ao carregar dados da bateria: ' + error.message);
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Salvar edições
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!contract || !userAccount) {
        alert('Conecte sua carteira primeiro!');
        return;
    }

    const id = document.getElementById('editId').value;
    const tipo = document.getElementById('editTipo').value;
    const uso = document.getElementById('editUso').value;
    const nrSerie = document.getElementById('editNrSerie').value;
    const dataProd = document.getElementById('editDataProd').value;
    const lote = document.getElementById('editLote').value;

    try {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.textContent = '⏳ Salvando...';
        submitBtn.disabled = true;

        // Atualizar cada campo separadamente
        await contract.methods.setTipo(id, tipo).send({ from: userAccount });
        await contract.methods.setUso(id, uso).send({ from: userAccount });
        await contract.methods.setNrSerie(id, nrSerie).send({ from: userAccount });
        await contract.methods.setDataProd(id, dataProd).send({ from: userAccount });
        await contract.methods.setLote(id, lote).send({ from: userAccount });

        alert('✅ Bateria atualizada com sucesso!');
        fecharModal();
        listarBaterias();

    } catch (error) {
        console.error('Erro ao atualizar:', error);
        alert('❌ Erro ao atualizar bateria: ' + error.message);
    } finally {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.textContent = '💾 Salvar Alterações';
        submitBtn.disabled = false;
    }
});

// Remover bateria
async function removerBateria(id) {
    if (!contract || !userAccount) {
        alert('Conecte sua carteira primeiro!');
        return;
    }

    if (!confirm(`Tem certeza que deseja remover a bateria ID ${id}?`)) {
        return;
    }

    try {
        await contract.methods.removerBateria(id).send({ from: userAccount });
        alert('✅ Bateria removida com sucesso!');
        listarBaterias();
    } catch (error) {
        console.error('Erro ao remover:', error);
        alert('❌ Erro ao remover bateria: ' + error.message);
    }
}

// Transferir propriedade
async function transferirDono() {
    const novoEndereco = document.getElementById('novoDonoAddress').value;
    
    if (!contract || !userAccount) {
        alert('Conecte sua carteira primeiro!');
        return;
    }

    if (!novoEndereco || !web3.utils.isAddress(novoEndereco)) {
        alert('Por favor, insira um endereço válido!');
        return;
    }

    if (!confirm(`Tem certeza que deseja transferir a propriedade para ${novoEndereco}?`)) {
        return;
    }

    try {
        await contract.methods.transferirDono(novoEndereco).send({ from: userAccount });
        alert('✅ Propriedade transferida com sucesso!');
        loadContractInfo();
        document.getElementById('novoDonoAddress').value = '';
    } catch (error) {
        console.error('Erro ao transferir:', error);
        alert('❌ Erro ao transferir propriedade: ' + error.message);
    }
}

// Inicialização
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            userAccount = accounts[0];
            updateConnectionStatus();
            loadContractInfo();
        }
    }
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

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        fecharModal();
    }
}
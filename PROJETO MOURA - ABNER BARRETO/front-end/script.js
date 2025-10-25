const CONTRACT_ADDRESS = "0x9C30bc400177dd2bC8869D1B8497004A02d5Af1f"; 
// Certifique-se de que este é o endereço correto para o deploy na Arbitrum Sepolia

const ABI = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "inputs": [ { "internalType": "string", "name": "_tipo", "type": "string" }, { "internalType": "string", name: "_uso", "type": "string" }, { "internalType": "string", name: "_nr_serie", "type": "string" }, { "internalType": "string", name: "_dataprod", "type": "string" }, { "internalType": "string", "name": "_lote", "type": "string" } ], "name": "cadastrarDefeituosa", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [ { "internalType": "uint256", name: "index", "type": "uint256" }, { "internalType": "string", name: "_tipo", "type": "string" }, { "internalType": "string", name: "_uso", "type": "string" }, { "internalType": "string", name: "_nr_serie", "type": "string" }, { "internalType": "string", name: "_dataprod", "type": "string" }, { "internalType": "string", "name": "_lote", "type": "string" } ], "name": "atualizarDefeituosa", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "getBaterias", "outputs": [ { "internalType": "uint256", name: "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "listarBaterias", "outputs": [ { "components": [ { "internalType": "string", name: "tipo", "type": "string" }, { "internalType": "string", name: "uso", "type": "string" }, { "internalType": "string", name: "nr_serie", "type": "string" }, { "internalType": "string", name: "_dataprod", "type": "string" }, { "internalType": "string", name: "lote", "type": "string" } ], "internalType": "struct MouraBateria.Bateria[]", name: "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "uint256", name: "index", "type": "uint256" } ], "name": "removerBaterias", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

let provider, signer, contract;
let currentAccount = null; 
let listaAtual = [];
const removeErrorMsg = document.getElementById("removeErrorMsg");
const modalOverlay = document.getElementById("modal-overlay");
const modalIndexDisplay = document.getElementById("modal-index-display");

const walletStatusBox = document.getElementById("wallet-status-box");
const walletDot = document.getElementById("wallet-dot");
const walletText = document.getElementById("wallet-text");

// =========================================================================
// TOAST NOTIFICATION FUNCTION
// =========================================================================
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 4000);
}

// =========================================================================
// WALLET STATUS & CONNECTION/DISCONNECTION LOGIC
// =========================================================================
const updateWalletStatus = (isConnected, account = null) => {
    if (isConnected && account) {
        currentAccount = account;
        walletStatusBox.classList.remove('disconnected');
        walletStatusBox.classList.add('connected');
        const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        walletText.textContent = shortAddress;
        walletStatusBox.setAttribute('aria-label', 'Desconectar Carteira MetaMask');
    } else {
        currentAccount = null;
        walletStatusBox.classList.remove('connected');
        walletStatusBox.classList.add('disconnected');
        walletText.textContent = "Conectar Carteira";
        walletStatusBox.setAttribute('aria-label', 'Conectar Carteira MetaMask');
    }
};

const connectWallet = async () => {
    if (!window.ethereum) {
        console.error("MetaMask não encontrado.");
        showToast("Por favor, instale o MetaMask para continuar.", "error");
        updateWalletStatus(false);
        return;
    }
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];

        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        
        updateWalletStatus(true, account);
        
        await listarBateriasNaTela(); 

        window.ethereum.on('accountsChanged', handleAccountsChanged);

    } catch (error) {
        console.error("Erro ao conectar:", error);
        updateWalletStatus(false);
    }
};


const disconnectWallet = async () => {
    if (!window.ethereum || !currentAccount) {
        console.log("Já desconectado ou MetaMask não disponível.");
        return;
    }
    try {
        await window.ethereum.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
        });
        handleAccountsChanged([]); 
    } catch (error) {
        if (error.code === 4001) {
             console.log("Desconexão rejeitada pelo usuário.");
        } else {
             console.error("Erro ao desconectar:", error);
        }
    }
};

const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
        console.log("Carteira desconectada.");
        updateWalletStatus(false);
        provider = new ethers.providers.Web3Provider(window.ethereum);
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider); 
        currentAccount = null;
        
        listarBateriasNaTela(); 
        
    } else {
        connectWallet(); 
    }
};

walletStatusBox.addEventListener('click', () => {
    if (currentAccount) {
        disconnectWallet();
    } else {
        connectWallet();
    }
});

window.addEventListener("load", async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            await connectWallet();
        } else {
            updateWalletStatus(false);
            provider = new ethers.providers.Web3Provider(window.ethereum);
            contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider); 
            await carregarDadosSilenciosamente(); 
        }
        window.ethereum.on('accountsChanged', handleAccountsChanged);
    } else {
        updateWalletStatus(false);
    }
});

// =========================================================================
// FUNÇÕES DE CONTRATO
// =========================================================================

const inputTipo = document.getElementById("tipo");
const inputUso = document.getElementById("uso");
const inputNrSerie = document.getElementById("nr_serie");
const inputDataProd = document.getElementById("dataprod");
const inputLote = document.getElementById("lote");
const inputEditIndex = document.getElementById("editIndex");
const btnCadastrar = document.getElementById("cadastrarBtn");
const inputRemover = document.getElementById("indexRemover");

const showModal = (index) => {
    modalIndexDisplay.textContent = `#${index}`;
    modalOverlay.style.display = 'flex';
    modalOverlay.classList.add('active');
    document.getElementById("confirmRemovalBtn").onclick = () => confirmRemoval(index);
};

const hideModal = () => {
    modalOverlay.style.display = 'none';
    modalOverlay.classList.remove('active');
    document.getElementById("confirmRemovalBtn").onclick = null;
};

const confirmRemoval = async (index) => {
    hideModal(); 
    if(!contract || !currentAccount) {
        showToast("Carteira não conectada. Conecte-se para remover.", "error");
        document.getElementById("removerBtn").disabled = false;
        return;
    }

    const originalButtonText = document.getElementById("removerBtn").innerHTML;
    document.getElementById("removerBtn").innerHTML = '<i class="fas fa-spinner fa-spin"></i> Removendo...';
    document.getElementById("removerBtn").disabled = true;
    const listItemToRemove = document.getElementById(`bateria-${index}`);

    try {
        const tx = await contract.removerBaterias(index);
        await tx.wait();
        
        if (listItemToRemove) {
            listItemToRemove.style.opacity = '0';
            listItemToRemove.style.transform = 'translateY(-20px)';
            setTimeout(() => { listItemToRemove.remove(); }, 300); 
        }
        showToast(`Registro #${index} removido com sucesso.`, 'success');
        document.getElementById("removerBtn").innerHTML = 'Sincronizando...';
        await listarBateriasNaTela(); 
        
    } catch(err) {
        console.error("Erro ao remover:", err);
        const reason = err.reason || (err.data && err.data.message) || "Transação falhou.";
        displayRemoveError(`Erro na Blockchain: ${reason}`);
    } finally {
        document.getElementById("removerBtn").innerHTML = originalButtonText;
        document.getElementById("removerBtn").disabled = false;
    }
};

async function carregarDadosSilenciosamente() {
    if(!contract) return;
    try {
        listaAtual = await contract.listarBaterias();
        atualizarMetricas(); 
    } catch (err) {
        console.error("Erro ao carregar dados silenciosamente:", err);
    }
}

window.carregarParaEdicao = (index) => {
    if (!currentAccount) {
        showToast("Conecte sua carteira para editar registros.", "error");
        return;
    }

    const bateria = listaAtual[index];
    if (!bateria) {
        console.error("Erro: Bateria não encontrada no índice " + index);
        return;
    }

    inputTipo.value = bateria.tipo;
    inputUso.value = bateria.uso;
    inputNrSerie.value = bateria.nr_serie;
    inputDataProd.value = bateria._dataprod; 
    inputLote.value = bateria.lote;
    inputEditIndex.value = index; 

    btnCadastrar.innerHTML = '<i class="fas fa-edit"></i> Atualizar Bateria #' + index;
    btnCadastrar.style.background = '#0056b3';
    btnCadastrar.style.color = 'white';

    document.getElementById("cardCadastrar").scrollIntoView({ behavior: "smooth", block: "start" });
};

const resetFormulario = () => {
    // CORRIGIDO: Garante que o botão volte ao estado padrão
    inputEditIndex.value = "-1"; 
    btnCadastrar.innerHTML = '<i class="fas fa-save"></i> Registrar Defeito';
    btnCadastrar.style.background = 'var(--moura-yellow)';
    btnCadastrar.style.color = 'var(--moura-blue)';
    
    // Limpeza de campos
    inputTipo.value = ''; inputUso.value = ''; inputNrSerie.value = '';
    inputDataProd.value = ''; inputLote.value = '';
    
    document.querySelectorAll('#cardCadastrar .error-message').forEach(span => {
        span.style.display = 'none';
        span.textContent = '';
    });
};

const displayRemoveError = (message) => {
    removeErrorMsg.textContent = message;
    removeErrorMsg.style.display = 'block';
};

const clearRemoveError = () => {
    removeErrorMsg.style.display = 'none';
    removeErrorMsg.textContent = '';
};

// =========================================================================
// FUNÇÃO listarBateriasNaTela reestruturada para robustez
// =========================================================================
async function listarBateriasNaTela() {
    
    if (!contract && window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider); 
    } else if (!window.ethereum) {
        showToast("Não foi possível conectar ao Metamask/Ethers.", "error");
        return;
    }
    
    const ul = document.getElementById("listaBaterias");
    const listarBtn = document.getElementById("listarBtn");
    listarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    listarBtn.disabled = true;

    try {
        listaAtual = await contract.listarBaterias();
        ul.innerHTML = ""; 
        
        if (listaAtual.length === 0) {
            ul.innerHTML = '<li>Nenhuma bateria defeituosa registrada ainda.</li>';
        } else {
            listaAtual.forEach((b, i) => {
            const li = document.createElement("li");
            li.id = `bateria-${i}`; 
            
            const editIconHTML = currentAccount ? `<i class="fas fa-edit edit-icon" onclick="carregarParaEdicao(${i})"></i>` : '';
            
            li.innerHTML = `
                <div class="data-content">
                    <span><strong>Índice:</strong> #${i}</span>
                    <span><strong>Tipo:</strong> ${b.tipo}</span>
                    <span><strong>Uso:</strong> ${b.uso}</span>
                    <span><strong>Série:</strong> ${b.nr_serie}</span>
                    <span><strong>Data Prod.:</strong> ${b._dataprod}</span>
                    <span><strong>Lote:</strong> ${b.lote}</span>
                </div>
                ${editIconHTML}
            `;
            ul.appendChild(li);
            });
        }
        
        atualizarMetricas();
        ul.style.display = 'block'; 

    } catch (err) {
        console.error("Erro ao listar:", err);
        ul.innerHTML = '<li>Erro ao carregar os dados. Verifique a rede.</li>';
        ul.style.display = 'block';
    } finally {
        listarBtn.innerHTML = ul.style.display === 'block' ? '<i class="fas fa-eye-slash"></i> Ocultar Registros' : '<i class="fas fa-eye"></i> Mostrar Registros';
        listarBtn.disabled = false;
    }
}
// =========================================================================

document.getElementById("scrollCadastrar").onclick = () => {
    document.getElementById("cardCadastrar").scrollIntoView({ behavior: "smooth", block: "start" });
};
document.getElementById("scrollListar").onclick = () => {
    document.getElementById("cardListar").scrollIntoView({ behavior: "smooth", block: "center" });
};

document.getElementById("cadastrarBtn").onclick = async () => {
    if(!contract || !currentAccount) {
        showToast("Conecte sua carteira para registrar ou atualizar.", "error");
        return;
    }
    
    // --- VALIDAÇÃO ---
    const fieldsToValidate = ['tipo', 'uso', 'nr_serie', 'dataprod', 'lote'];
    let isFormValid = true;

    fieldsToValidate.forEach(id => {
        const input = document.getElementById(id);
        const errorSpan = document.getElementById(`${id}Error`);
        if (!input.value) {
            errorSpan.textContent = 'Este campo é obrigatório.';
            errorSpan.style.display = 'block';
            isFormValid = false;
        } else {
            errorSpan.style.display = 'none';
        }
    });

    if (!isFormValid) {
        showToast("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
    }
    // --- FIM DA VALIDAÇÃO ---

    const tipo = inputTipo.value;
    const uso = inputUso.value;
    const nr = inputNrSerie.value;
    const data = inputDataProd.value;
    const lote = inputLote.value;
    const index = parseInt(inputEditIndex.value);
    
    const originalButtonText = btnCadastrar.innerHTML;
    btnCadastrar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    btnCadastrar.disabled = true;

    try {
        let tx;
        if (index > -1) {
            tx = await contract.atualizarDefeituosa(index, tipo, uso, nr, data, lote);
        } else {
            tx = await contract.cadastrarDefeituosa(tipo, uso, nr, data, lote);
        }
        await tx.wait();
        
        resetFormulario();
        await listarBateriasNaTela();
        const successMsg = `Bateria #${index > -1 ? index : 'nova'} ${index > -1 ? 'atualizada' : 'registrada'} com sucesso!`;
        showToast(successMsg, "success");

    } catch (err) {
        console.error("Erro na transação:", err);
        const reason = err.reason || (err.data && err.data.message) || "Verifique o console.";
        showToast(`Erro na transação: ${reason}`, "error");
        
        // Reverte o texto do botão para o estado anterior SE a transação falhar
        btnCadastrar.innerHTML = originalButtonText; 
        
    } finally {
        btnCadastrar.disabled = false;
    }
};

document.getElementById("listarBtn").onclick = async () => {
    const ul = document.getElementById("listaBaterias");
    const btn = document.getElementById("listarBtn");

    if (ul.style.display === 'block') {
        ul.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Registros';
    } else {
        await listarBateriasNaTela();
    }
};

document.getElementById("removerBtn").onclick = async () => {
    clearRemoveError();
    // Bloqueia a ação de remoção se a carteira não estiver conectada
    if (!currentAccount) {
        displayRemoveError("Você precisa estar conectado para remover registros.");
        return;
    }

    const index = parseInt(document.getElementById("indexRemover").value);
    
    if(isNaN(index) || index < 0) {
        displayRemoveError("Índice inválido. Insira um número não negativo.");
        return;
    }
    if (index >= listaAtual.length || listaAtual.length === 0) {
        displayRemoveError(`Índice inválido! Último índice é #${listaAtual.length > 0 ? listaAtual.length - 1 : 'nenhum'}.`);
        return;
    }
    showModal(index);
};

// =========================================================================
// MÉTODOS DE CÁLCULO E ATUALIZAÇÃO DE MÉTRICAS
// =========================================================================
function atualizarMetricas() {
    // 1. Contagem Total
    const total = listaAtual.length;
    let automotivas = 0;
    let outros = 0;
    
    // 2. Iterar e Contar por Tipo
    listaAtual.forEach(bateria => {
        // Usa o valor do <select> (Automotiva) para classificação
        if (bateria.tipo === "Automotiva") {
            automotivas++;
        } else {
            outros++;
        }
    });

    // 3. Atualizar o DOM
    document.getElementById("totalRegistros").textContent = total;
    document.getElementById("totalAutomotivas").textContent = automotivas;
    document.getElementById("totalOutros").textContent = outros;
}
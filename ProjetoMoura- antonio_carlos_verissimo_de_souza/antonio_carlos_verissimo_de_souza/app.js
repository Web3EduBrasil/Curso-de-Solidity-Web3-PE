
const contractAddress = "0x409647206c4494A9e03106cA21C6e853D66023eb"; 

const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "serialNumber",
                "type": "string"
            }
        ],
        "name": "BatteryCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "serialNumber",
                "type": "string"
            }
        ],
        "name": "BatteryDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "serialNumber",
                "type": "string"
            }
        ],
        "name": "BatteryUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_batteryType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_use",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_lote",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_serialNumber",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_productionDate",
                "type": "uint256"
            }
        ],
        "name": "createBattery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_serialNumber",
                "type": "string"
            }
        ],
        "name": "deleteBattery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_serialNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_batteryType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_use",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_lote",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_productionDate",
                "type": "uint256"
            }
        ],
        "name": "updateBattery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_serialNumber",
                "type": "string"
            }
        ],
        "name": "getBattery",
        "outputs": [
            {
                "internalType": "string",
                "name": "batteryType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "use",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "lote",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "serialNumber",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "productionDate",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listBatteries",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "batteryType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "use",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "lote",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "serialNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "productionDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Baterias.Battery[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
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
        "name": "totalBatteries",
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


let web3;
let contract;
let currentAccount;

// Referência aos elementos de UI
const connectBtn = document.getElementById("connectBtn");
const statusText = document.getElementById("connectionStatus");

// =========================================================================
// 1. CONEXÃO COM METAMASK
// =========================================================================
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            statusText.textContent = "Conectando...";
            statusText.style.color = '#FFD100'; // Amarelo Moura

            web3 = new Web3(window.ethereum);

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            currentAccount = accounts[0];

            // Inicializa o objeto do contrato
            contract = new web3.eth.Contract(abi, contractAddress);

            connectBtn.style.display = 'none';
            statusText.textContent = `Conectado: ${currentAccount.substring(0, 6)}...${currentAccount.slice(-4)}`;
            statusText.style.color = '#4CAF50'; // Verde

            loadBatteries();

            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            });

        } catch (error) {
            statusText.textContent = "Erro ao conectar.";
            statusText.style.color = '#F44336'; // Vermelho
            console.error("Erro ao conectar:", error);
        }
    } else {
        statusText.textContent = "MetaMask não instalada.";
        statusText.style.color = '#F44336';
        alert("MetaMask não detectada! Por favor, instale a MetaMask para continuar.");
    }
}

document.getElementById("connectBtn").addEventListener("click", connectMetaMask);

// =========================================================================
// 2. FUNÇÕES DE LISTAGEM E REMOÇÃO (5 campos + Ações)
// =========================================================================
async function loadBatteries() {
    const tbody = document.getElementById("batteryList");
    tbody.innerHTML = "";

    try {
        if (!contract) {
            // Colspan 6 (5 colunas de dados + 1 coluna de Ações)
            tbody.insertAdjacentHTML("beforeend", '<tr><td colspan="6">Conecte sua MetaMask para carregar a lista.</td></tr>');
            return;
        }

        // Chamada de função view (read-only)
        const batteries = await contract.methods.listBatteries().call();

        if (batteries.length === 0) {
            tbody.insertAdjacentHTML("beforeend", '<tr><td colspan="6">Nenhuma bateria cadastrada.</td></tr>');
            return;
        }

        batteries.forEach(b => {
            if (b.exists) {
                const row = `
            <tr>
              <td>${b.batteryType}</td>
              <td>${b.use}</td> 
              <td>${b.lote}</td>
              <td>${b.serialNumber}</td>
              <td>${new Date(Number(b.productionDate) * 1000).toLocaleDateString()}</td>
              <td class="actions">
                <button onclick="removeBattery('${b.serialNumber}')">Remover</button>
              </td>
            </tr>`;
                tbody.insertAdjacentHTML("beforeend", row);
            }
        });

    } catch (error) {
        console.error("Erro ao carregar baterias:", error);
        tbody.insertAdjacentHTML("beforeend", '<tr><td colspan="6" style="color: #F44336;">Erro ao carregar lista. (Verifique o console)</td></tr>');
    }
}

async function removeBattery(serialNumber) {
    if (!currentAccount) {
        alert("Conecte sua carteira primeiro.");
        return;
    }
    if (!confirm(`Tem certeza que deseja remover a bateria ${serialNumber}?`)) {
        return;
    }
    try {
        // SOLUÇÃO DE GÁS MANTIDA: Limite de gás para transação de escrita
        await contract.methods.deleteBattery(serialNumber).send({
            from: currentAccount,
            gas: 3000000
        });

        alert("✅ Bateria removida com sucesso!");
        loadBatteries();
    } catch (error) {
        console.error("Erro ao remover bateria:", error);
        alert(`❌ Erro ao remover: Transação rejeitada ou falhou.`);
    }
}

// =========================================================================
// 3. LÓGICA DO FORMULÁRIO DE CADASTRO (5 ARGUMENTOS)
// =========================================================================
document.getElementById("batteryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentAccount) {
        alert("Conecte sua carteira primeiro.");
        return;
    }

    const submitBtn = e.target.querySelector('#submitBtn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando... ⏳";
    submitBtn.disabled = true;

    try {
        const type = document.getElementById("batteryType").value;
        const use = document.getElementById("batteryUse").value;
        const lote = document.getElementById("lote").value;
        const serial = document.getElementById("serialNumber").value;
        // Converte data para timestamp Unix (segundos)
        const date = Math.floor(new Date(document.getElementById("productionDate").value).getTime() / 1000);

        // SOLUÇÃO DE GÁS MANTIDA: Limite de gás para transação de escrita
        await contract.methods.createBattery(type, use, lote, serial, date).send({
            from: currentAccount,
            gas: 3000000
        });

        alert("✅ Bateria cadastrada com sucesso!");

        e.target.reset();
        loadBatteries();

    } catch (error) {
        console.error("Erro ao cadastrar bateria:", error);
        alert(`❌ Erro ao cadastrar: Transação rejeitada ou falhou.`);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
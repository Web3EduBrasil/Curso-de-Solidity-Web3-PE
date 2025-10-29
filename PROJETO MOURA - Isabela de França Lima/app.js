const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tipoUso",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_numeroSerie",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dataProducao",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lote",
				"type": "string"
			}
		],
		"name": "registrarBateria",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listar",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "tipoUso",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "numeroSerie",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataProducao",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lote",
						"type": "string"
					}
				],
				"internalType": "struct BateriasMouraDefeituosas.Bateria[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indice",
				"type": "uint256"
			}
		],
		"name": "obterBateria",
		"outputs": [
			{
				"internalType": "string",
				"name": "tipoUso",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "numeroSerie",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataProducao",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lote",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalBaterias",
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
const CONTRACT_ADDRESS = "0x1CFECf80AC503fd469a0CAdE09091df0f3a1d8a8"; // endereço do contrato

let web3;
let contract;

async function conectar() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    atualizarTotal();
  } else {
    alert("⚠️ Instale o MetaMask para usar o sistema!");
  }
}

document.addEventListener("DOMContentLoaded", conectar);

// Registrar bateria
document.getElementById("formRegistrar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();
  const tipoUso = document.getElementById("tipoUso").value;
  const numeroSerie = document.getElementById("numeroSerie").value;
  const dataProducao = document.getElementById("dataProducao").value;
  const lote = document.getElementById("lote").value;

  try {
    await contract.methods
      .registrarBateria(tipoUso, numeroSerie, dataProducao, lote)
      .send({ from: accounts[0] });

    alert("✅ Bateria registrada com sucesso!");
    e.target.reset();
    atualizarTotal();
  } catch (err) {
    console.error(err);
    alert("❌ Erro ao registrar bateria.");
  }
});

// Atualizar total
async function atualizarTotal() {
  try {
    const total = await contract.methods.totalBaterias().call();
    document.getElementById("totalBaterias").textContent = total;
  } catch (err) {
    console.error(err);
  }
}

// Consultar bateria por índice
document.getElementById("formConsultar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const indice = document.getElementById("indice").value;
  try {
    const b = await contract.methods.obterBateria(indice).call();
    document.getElementById("resultadoConsulta").innerHTML = `
      <div class="mt-2 bg-gray-800 p-3 rounded">
        <p><strong class="accent-text">Tipo de Uso:</strong> ${b.tipoUso}</p>
        <p><strong class="accent-text">Número de Série:</strong> ${b.numeroSerie}</p>
        <p><strong class="accent-text">Data de Produção:</strong> ${b.dataProducao}</p>
        <p><strong class="accent-text">Lote:</strong> ${b.lote}</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
    alert("❌ Erro ao buscar bateria.");
  }
});

// Listar todas
document.getElementById("btnListar").addEventListener("click", async () => {
  try {
    const lista = await contract.methods.listar().call();
    const tbody = document.getElementById("tabelaBaterias");
    tbody.innerHTML = "";
    lista.forEach((b, i) => {
      const row = `
        <tr class="hover:bg-gray-800 transition">
          <td class="border border-gray-700 p-2">${i}</td>
          <td class="border border-gray-700 p-2">${b.tipoUso}</td>
          <td class="border border-gray-700 p-2">${b.numeroSerie}</td>
          <td class="border border-gray-700 p-2">${b.dataProducao}</td>
          <td class="border border-gray-700 p-2">${b.lote}</td>
        </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error(err);
    alert("❌ Erro ao listar baterias.");
  }
});

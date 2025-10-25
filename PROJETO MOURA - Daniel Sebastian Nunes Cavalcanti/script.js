document.addEventListener('DOMContentLoaded', () => {
  const contratoAddress = "0x3a60e0732355934AeAfc835714f50EABD25c7ee2"; // seu endereço
  const abi = [
    {
      "inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],
      "name": "getter",
      "outputs": [{"components": [
        {"internalType": "string","name": "tipo","type": "string"},
        {"internalType": "string","name": "uso","type": "string"},
        {"internalType": "uint256","name": "nr_serie","type": "uint256"},
        {"internalType": "string","name": "dataprod","type": "string"},
        {"internalType": "string","name": "lote","type": "string"}
      ],"internalType": "struct BateriasDefeitos.Bateria","name":"","type": "tuple"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "list",
      "outputs": [{"components": [
        {"internalType": "string","name": "tipo","type": "string"},
        {"internalType": "string","name": "uso","type": "string"},
        {"internalType": "uint256","name": "nr_serie","type": "uint256"},
        {"internalType": "string","name": "dataprod","type": "string"},
        {"internalType": "string","name": "lote","type": "string"}
      ],"internalType": "struct BateriasDefeitos.Bateria[]","name":"","type": "tuple[]"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string","name": "_tipo","type": "string"},
        {"internalType": "string","name": "_uso","type": "string"},
        {"internalType": "uint256","name": "_nr_serie","type": "uint256"},
        {"internalType": "string","name": "_dataprod","type": "string"},
        {"internalType": "string","name": "_lote","type": "string"}
      ],
      "name": "setter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  let signer, contrato;

  async function conectar() {
    if (!window.ethereum) {
      alert('MetaMask não detectada. Por favor, instale a MetaMask.');
      return false;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();

      // Chain ID para Arbitrum Sepolia é 421614, mas o seu código usava 5310. Vou manter o seu.
      // O nome da rede pode variar. Verificando pelo chainId é mais robusto.
      if (network.chainId !== 421614n) { // Chain ID correto para Arbitrum Sepolia
        alert("Por favor, troque para a rede Arbitrum Sepolia na MetaMask.");
        return false;
      }

      signer = await provider.getSigner();
      contrato = new ethers.Contract(contratoAddress, abi, signer);
      return true;
    } catch (error) {
      console.error("Falha ao conectar com a carteira:", error);
      alert("Não foi possível conectar à carteira.");
      return false;
    }
  }

  async function consultar() {
    const id = document.getElementById("inputId").value;
    if (!id || !contrato) return;
    try {
      const resultado = await contrato.getter(id);
      document.getElementById("resultado").innerHTML = `
        Tipo: ${resultado.tipo}<br/>
        Uso: ${resultado.uso}<br/>
        Nº Série: ${resultado.nr_serie.toString()}<br/>
        Data Produção: ${resultado.dataprod}<br/>
        Lote: ${resultado.lote}
      `;
    } catch (err) {
      console.error("Erro na consulta", err);
      alert("Erro na consulta. Verifique o ID e se a transação foi bem-sucedida.");
    }
  }

  function renderizarLista(listaDeBaterias) {
    const listaDiv = document.getElementById("lista");
    if (!listaDeBaterias || listaDeBaterias.length === 0) {
      listaDiv.innerHTML = "Nenhuma bateria encontrada com os critérios fornecidos.";
      return;
    }

    let html = "";
    listaDeBaterias.forEach((bateria, index) => {
      html += `
        <b>Bateria ${index + 1}:</b><br/>
        Tipo: ${bateria.tipo}<br/>
        Uso: ${bateria.uso}<br/>
        Nº Série: ${bateria.nr_serie.toString()}<br/>
        Data produção: ${bateria.dataprod}<br/>
        Lote: ${bateria.lote}<hr/>
      `;
    });
    listaDiv.innerHTML = html;
  }

  async function listar() {
    if (!contrato) return;
    try {
      const lista = await contrato.list();
      renderizarLista(lista);
    } catch (err) {
      console.error("Erro na listagem", err);
      alert("Erro ao listar as baterias.");
    }
  }

  async function filtrar() {
    if (!contrato) return;
    // A função de pegar valores agora é mais dinâmica
    const getVal = id => document.getElementById(id)?.value.trim().toLowerCase() || "";
    const filtroTipo = getVal('filtroTipo');
    const filtroUso = getVal('filtroUso');
    const filtroNrSerie = getVal('filtroNrSerie');
    const filtroDataProd = getVal('filtroDataProd');
    const filtroLote = getVal('filtroLote');

    try {
      const listaCompleta = await contrato.list(); // Idealmente, isso seria cacheado
      const listaFiltrada = listaCompleta.filter(bateria => {
        const tipoMatch = !filtroTipo || bateria.tipo.toLowerCase().includes(filtroTipo);
        const usoMatch = !filtroUso || bateria.uso.toLowerCase().includes(filtroUso);
        const nrSerieMatch = !filtroNrSerie || bateria.nr_serie.toString() === filtroNrSerie;
        const dataProdMatch = !filtroDataProd || bateria.dataprod.toLowerCase().includes(filtroDataProd);
        const loteMatch = !filtroLote || bateria.lote.toLowerCase().includes(filtroLote);
        return tipoMatch && usoMatch && nrSerieMatch && dataProdMatch && loteMatch;
      });
      renderizarLista(listaFiltrada);
    } catch (err) {
      console.error("Erro ao filtrar", err);
      alert("Ocorreu um erro ao tentar filtrar as baterias.");
    }
  }

  async function adicionar() {
    if (!contrato) return;
    const tipo = document.getElementById("tipo").value;
    const uso = document.getElementById("uso").value;
    const nr_serie = document.getElementById("nr_serie").value;
    const dataprod = document.getElementById("dataprod").value;
    const lote = document.getElementById("lote").value;

    if (!tipo || !uso || !nr_serie || !dataprod || !lote) {
      alert("Preencha todos os campos para adicionar uma bateria.");
      return;
    }

    try {
      const tx = await contrato.setter(tipo, uso, nr_serie, dataprod, lote);
      await tx.wait();
      alert("Bateria adicionada com sucesso!");
      listar(); // Atualiza a lista automaticamente
    } catch (err) {
      console.error("Erro ao adicionar", err);
      alert("Erro ao adicionar a bateria.");
    }
  }

  function atualizarFiltrosVisiveis() {
    const container = document.getElementById('filtro-inputs');
    container.innerHTML = ''; // Limpa os inputs existentes
    const checkboxes = document.querySelectorAll('#filtro-selecao input[type="checkbox"]:checked');

    checkboxes.forEach(cb => {
      const valor = cb.value;
      let input;
      switch (valor) {
        case 'Tipo':
          input = document.createElement('input');
          input.type = 'text';
          input.id = 'filtroTipo';
          input.placeholder = 'Filtrar por Tipo';
          break;
        case 'Uso':
          input = document.createElement('input');
          input.type = 'text';
          input.id = 'filtroUso';
          input.placeholder = 'Filtrar por Uso';
          break;
        case 'NrSerie':
          input = document.createElement('input');
          input.type = 'number';
          input.id = 'filtroNrSerie';
          input.placeholder = 'Filtrar por Nº Série';
          break;
        case 'DataProd':
          input = document.createElement('input');
          input.type = 'text';
          input.id = 'filtroDataProd';
          input.placeholder = 'Filtrar por Data Produção';
          break;
        case 'Lote':
          input = document.createElement('input');
          input.type = 'text';
          input.id = 'filtroLote';
          input.placeholder = 'Filtrar por Lote';
          break;
      }
      if (input) {
        container.appendChild(input);
      }
    });
  }

  // Conecta e adiciona os event listeners
  async function init() {
    if (await conectar()) {
      document.getElementById('consultarBtn').addEventListener('click', consultar);
      document.getElementById('listarBtn').addEventListener('click', listar);
      document.getElementById('adicionarBtn').addEventListener('click', adicionar);
      document.getElementById('filtrarBtn').addEventListener('click', filtrar);

      document.querySelectorAll('#filtro-selecao input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', atualizarFiltrosVisiveis);
      });

      document.getElementById('limparFiltroBtn').addEventListener('click', () => {
        document.querySelectorAll('#filtro-selecao input[type="checkbox"]').forEach(cb => {
          cb.checked = false;
        });
        atualizarFiltrosVisiveis();
        listar(); // Recarrega a lista completa
      });
    }
  }

  init();
});
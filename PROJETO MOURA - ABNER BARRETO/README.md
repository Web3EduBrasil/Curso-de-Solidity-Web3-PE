# <h1 align="center">MouraBateria Smart Contract (Solidity)</h1>

![Badge em Desenvolvimento](https://img.shields.io/static/v1?label=STATUS&message=EM+DESENVOLVIMENTO&color=FFD700&style=for-the-badge)

## 🧾 Resumo do projeto
Este projeto consiste no desenvolvimento e implantação de um **Smart Contract (Contrato Inteligente)** escrito em **Solidity**.  
A aplicação, chamada `MouraBateria`, atua como um **registro descentralizado de baterias defeituosas** em uma **Blockchain de Camada 2 (L2)** compatível com a **EVM (Ethereum Virtual Machine)**, utilizando a **rede de teste Arbitrum Sepolia**.  

O objetivo principal é demonstrar o **ciclo completo de desenvolvimento Web3** — desde a criação do contrato em Solidity (com lógica de manipulação de arrays via padrão *Swap and Pop*) até a interação com o contrato por meio de uma **interface HTML/JavaScript**, utilizando **Ethers.js** e **MetaMask**.

---

## 🎨 Demonstração de Uso

<p align="center">
  <img src="https://raw.githubusercontent.com/AbnerBarretto/MouraDesafio/main/assets/VideoDemonstracaoMoura.gif" alt="Demonstração do Fluxo de Uso" width="850">
</p>

<p align="center"><em>Vídeo demonstrando o fluxo de Cadastro, Listagem e interação com o Smart Contract.</em></p>

---

## 🔨 Funcionalidades do projeto

- **Registro** descentralizado de baterias defeituosas (tipo, uso, número de série e lote).  
- **Listagem** completa de todos os registros armazenados no contrato.  
- **Remoção** otimizada de registros usando o padrão *Swap and Pop* para reduzir custo de gás.  
- **Atualização** de dados de registros existentes.  
- **Interação** com o contrato via frontend (HTML/JS) e carteira MetaMask.  
- **Transparência** e imutabilidade dos dados garantidas pela Blockchain.

---

## 📁 Acesso ao projeto

Você pode interagir com a aplicação diretamente pelo **deploy online** ou acessar o código-fonte:

- **🔗 Aplicação Online (Vercel):** [Moura Bateria - Controle de Defeito](https://desafiomouraweb3.vercel.app/)  
- **💻 Código Fonte (GitHub):** [Repositório MouraBateria](https://github.com/AbnerBarretto/MouraBateria)  
- **⬇️ Baixar ZIP:** [Download do Projeto](https://github.com/AbnerBarretto/MouraBateria/archive/refs/heads/main.zip)

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone ou baixe** o repositório.  
2. **Abra o arquivo** `index.html` em seu navegador.  
3. **Configure o MetaMask:** conecte sua carteira à **Rede de Teste Arbitrum Sepolia**.  
4. **Interaja:** clique em “Conectar Carteira” e comece a registrar, atualizar e remover baterias defeituosas.  

> 💡 **Nota:** O endereço do contrato já está configurado no `index.html`, apontando para a versão mais recente na Arbitrum Sepolia.  
> Se desejar implantar uma nova versão, utilize o Remix IDE.

---

## ⚙️ Detalhes da Rede (Arbitrum Sepolia)

Se precisar adicionar manualmente a rede no MetaMask:

| Parâmetro | Valor |
| :--- | :--- |
| **Network Name** | Arbitrum Sepolia |
| **New RPC URL** | `https://sepolia-rollup.arbitrum.io/rpc` |
| **Chain ID** | `421614` |
| **Currency Symbol** | ETH |
| **Block Explorer URL** | [https://sepolia.arbiscan.io/](https://sepolia.arbiscan.io/) |

---

## ✔️ Técnicas e Tecnologias Utilizadas

- **Solidity** – Linguagem do Smart Contract  
- **Ethereum / EVM** – Execução do contrato  
- **Rede de Teste Arbitrum Sepolia**  
- **Remix IDE** – Desenvolvimento e deploy  
- **HTML / CSS / JavaScript** – Interface Web  
- **Ethers.js** – Comunicação entre Frontend e Blockchain  
- **MetaMask** – Carteira e gerenciamento de transações  
- Padrão **“Swap and Pop”** – Otimização de remoção de elementos em arrays  

---

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

---

## 🚀 Próximos Passos e Otimizações Futuras (Roadmap)

Este projeto é um MVP funcional. Os seguintes recursos e otimizações estão planejados para a próxima fase de desenvolvimento:

### Smart Contract (Segurança e Eficiência)

- [ ] **Otimizar Armazenamento:** Migrar o array (`Bateria[]`) para um `mapping` com IDs permanentes para eliminar a fragilidade de índices causada pela função `removerBaterias`.
- [ ] **Melhorar Rastreabilidade:** Adicionar `Events` em todas as funções de alteração de estado (`cadastrar`, `atualizar`, `remover`) para melhorar a auditoria e a comunicação com o Front-end.

### Front-end e Usabilidade (UX)

- [x] **Adicionar Filtros:** Implementar um campo de busca/filtro na seção de listagem por Número de Série, Lote ou Tipo de Bateria.
- [ ] **Reforçar Validação:** Adicionar validações de formato (RegEx) para campos de entrada como "Número de Série" e "Lote de Fabricação", além de impedir o cadastro de datas futuras.
- [ ] **Aviso de Rede:** Implementar uma verificação no JavaScript para notificar o usuário caso ele esteja conectado a uma rede diferente da Arbitrum Sepolia.

### Design e Estética
- [ ] Otimizar o design responsivo para tablets (telas entre 768px e 1024px).

---

## 👨‍💻 Desenvolvedores

Projeto desenvolvido por **Abner Barreto** e **João Henrique**.

| [<img loading="lazy" src="https://github.com/AbnerBarretto.png" width=115><br><sub>Abner Barreto</sub>](https://github.com/AbnerBarretto) | [<img loading="lazy" src="https://github.com/lordpipoca.png" width=115><br><sub>João Henrique</sub>](https://github.com/lordpipoca) |
| :---: | :---: |

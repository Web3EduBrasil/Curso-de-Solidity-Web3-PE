# Sistema de Cadastro de Usuários - Blockchain DApp

Um sistema descentralizado para cadastro e gerenciamento de usuários na blockchain Arbitrum Sepolia.

## 📋 Funcionalidades

- **Conectar MetaMask**: Conexão automática com a carteira MetaMask
- **Cadastrar Usuários**: Registro de novos usuários na blockchain
- **Listar Usuários**: Visualização de todos os usuários cadastrados
- **Remover Usuários**: Exclusão de usuários do sistema
- **Interface Responsiva**: Design moderno e adaptável para dispositivos móveis

## 🛠 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Blockchain**: Solidity ^0.8.0
- **Web3**: Web3.js 1.8.0
- **Rede**: Arbitrum Sepolia Testnet
- **Carteira**: MetaMask

## 📡 Informações do Contrato

- **Endereço**: `0xc09ff412327DcF8a28fdfc2AFa823F75CE00ee79`
- **Rede**: Arbitrum Sepolia (Chain ID: 421614)
- **ABI**: Disponível no arquivo `app.js`

## 🚀 Como Usar

### 1. Pré-requisitos

- MetaMask instalado no navegador
- Conta com ETH na Arbitrum Sepolia (para gas fees)

### 2. Configuração da Rede

O sistema automaticamente:
- Detecta se você está na rede correta
- Adiciona a Arbitrum Sepolia se necessário
- Solicita troca de rede

**Configuração manual (se necessário):**
- Nome da Rede: Arbitrum Sepolia
- RPC URL: `https://sepolia-rollup.arbitrum.io/rpc`
- Chain ID: 421614
- Symbol: ETH
- Block Explorer: `https://sepolia.arbiscan.io/`

### 3. Executar a Aplicação

1. Abra o arquivo `index.html` no navegador
2. Clique em "Conectar MetaMask"
3. Autorize a conexão na MetaMask
4. Comece a usar o sistema!

## 📁 Estrutura do Projeto

```
CadastroUsuarios/
├── src/
│   ├── index.html      # Interface principal
│   ├── style.css       # Estilos da aplicação
│   └── app.js          # Lógica da aplicação
├── contracts/          # Contratos Solidity
├── test/              # Testes automatizados
├── migrations/        # Scripts de deploy
└── README.md          # Documentação
```

## 🔧 Funcionalidades do Contrato

### `cadastrarUsuario(string _nome)`
Cadastra um novo usuário no sistema com o nome fornecido.

### `removerUsuario(uint256 _id)`
Remove um usuário do sistema pelo seu ID.

### `listarUsuarios()`
Retorna todos os usuários cadastrados no sistema.

## 🎨 Interface

- **Design Moderno**: Gradientes e animações suaves
- **Responsivo**: Funciona em desktop e mobile
- **Feedback Visual**: Mensagens de status e loading
- **Badges**: Identificação visual de diferentes tipos de usuário

## 🛡 Segurança

- Validação de entrada do usuário
- Tratamento de erros de transação
- Verificação de rede
- Estimativa de gas automática

## 📱 Responsividade

A interface se adapta automaticamente para:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (até 767px)

## 🚨 Solução de Problemas

### MetaMask não detectado
- Instale a extensão MetaMask
- Recarregue a página

### Erro de rede
- Verifique se está na Arbitrum Sepolia
- O sistema tentará trocar automaticamente

### Transação falhou
- Verifique se tem ETH suficiente para gas
- Tente aumentar o limite de gas

### Não consegue carregar usuários
- Verifique a conexão com MetaMask
- Verifique se o contrato está ativo

## 🔄 Atualizações Futuras

- [ ] Busca e filtros de usuários
- [ ] Histórico de transações
- [ ] Perfis de usuário expandidos
- [ ] Sistema de permissões
- [ ] Notificações em tempo real

## 📞 Suporte

Para problemas ou sugestões:
1. Verifique a documentação
2. Consulte o console do navegador para logs
3. Verifique a conexão com MetaMask

---

**Desenvolvido para Arbitrum Sepolia Testnet - 2025**
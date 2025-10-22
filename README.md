# 📱 DApp Registro de Nomes

Um aplicativo descentralizado (DApp) moderno para registrar e consultar nomes na blockchain usando Web3.js e MetaMask.

## 🚀 Funcionalidades

- 🔗 **Conexão com MetaMask**: Interface intuitiva para conectar carteiras
- 📝 **Registro de Nomes**: Permite registrar nomes associados a endereços
- 🔍 **Consulta de Nomes**: Busca nomes registrados por endereço
- 🌐 **Multi-rede**: Suporte para diferentes redes Ethereum
- 📱 **Responsivo**: Interface adaptável para desktop e mobile
- ⚡ **Feedback Visual**: Status em tempo real das operações

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript ES6+**: Lógica da aplicação
- **Web3.js**: Integração com blockchain Ethereum
- **FontAwesome**: Ícones modernos

## 📁 Estrutura do Projeto

```
ContractMapping/
├── index.html      # Estrutura HTML da aplicação
├── style.css       # Estilos e design responsivo
├── app.js          # Lógica JavaScript e Web3
└── README.md       # Documentação do projeto
```

## 🔧 Configuração

### Pré-requisitos

1. **MetaMask**: Instale a extensão do MetaMask no seu navegador
2. **Rede Ethereum**: Configure uma rede (testnet recomendada para testes)
3. **Fundos**: Tenha ETH suficiente para transações de gas

### Configuração do Contrato

No arquivo `app.js`, configure:

```javascript
const contractAddress = "0x1c37009124E4ba59daF147E9b11A9aCC5A1530f1";
```

Substitua pelo endereço do seu contrato inteligente.

## 🚀 Como Executar

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd ContractMapping
   ```

2. **Abra o projeto**:
   - Abra o arquivo `index.html` no navegador
   - Ou use um servidor local (recomendado):
   ```bash
   # Usando Python
   python -m http.server 8000
   
   # Usando Node.js
   npx serve .
   ```

3. **Conecte sua carteira**:
   - Clique em "Conectar MetaMask"
   - Autorize a conexão na extensão

4. **Interaja com o DApp**:
   - Registre nomes associados ao seu endereço
   - Consulte nomes de outros endereços

## 📋 Funcionalidades Detalhadas

### 🔗 Conexão da Carteira

- **Auto-detecção**: Verifica se o MetaMask está instalado
- **Reconexão**: Lembra conexões autorizadas
- **Status Visual**: Feedback claro do status da conexão
- **Info da Rede**: Mostra rede atual e endereço conectado

### 📝 Registro de Nomes

- **Validação**: Verifica se o nome é válido (máx. 50 caracteres)
- **Estimativa de Gas**: Calcula automaticamente o gas necessário
- **Feedback**: Status em tempo real da transação
- **Hash da Transação**: Exibe o hash após confirmação

### 🔍 Consulta de Nomes

- **Validação de Endereço**: Verifica formato Ethereum válido
- **Busca em Tempo Real**: Consulta direta na blockchain
- **Resultado Visual**: Animação suave para mostrar resultados
- **Tratamento de Erros**: Mensagens claras para diferentes cenários

## 🎨 Interface

### Design Moderno

- **Gradientes**: Cores vibrantes e harmoniosas
- **Animações**: Transições suaves e efeitos hover
- **Cards**: Layout organizado em seções
- **Responsivo**: Adaptável a diferentes tamanhos de tela

### Estados Visuais

- **Loading**: Indicadores de carregamento
- **Success**: Mensagens de sucesso em verde
- **Error**: Alertas de erro em vermelho
- **Info**: Informações em azul

## 🔐 Segurança

- **Validação de Entrada**: Verifica todos os inputs do usuário
- **Tratamento de Erros**: Captura específica de erros do MetaMask
- **Gas Safety**: Buffer de 20% nas estimativas de gas
- **Formato de Endereços**: Validação regex para endereços Ethereum

## 🌐 Redes Suportadas

- Ethereum Mainnet
- Testnets: Goerli, Sepolia, Ropsten, Rinkeby, Kovan
- Polygon: Mainnet e Mumbai
- BSC: Mainnet e Testnet

## 🐛 Resolução de Problemas

### MetaMask não conecta

1. Verifique se a extensão está instalada
2. Desbloqueie sua carteira
3. Verifique se o site tem permissão

### Transação falhando

1. Verifique se tem fundos suficientes
2. Confirme se está na rede correta
3. Verifique se o contrato está ativo

### Nome não aparece na consulta

1. Aguarde a confirmação da transação
2. Verifique se usou o endereço correto
3. Confirme se está na mesma rede


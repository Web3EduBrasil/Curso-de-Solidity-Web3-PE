# 🔋 Sistema de Rastreamento Baterias Moura

## Descrição
Sistema completo de gestão e rastreamento de baterias Moura desenvolvido em blockchain. Permite o cadastro, edição, remoção e monitoramento completo do ciclo de vida das baterias com total transparência e segurança.

## 🎯 Características do Sistema
- **Gestão Completa de Baterias**: CRUD completo (Create, Read, Update, Delete)
- **Interface Profissional**: Design inspirado na marca Moura
- **Blockchain Arbitrum Sepolia**: Baixo custo e alta performance
- **Segurança**: Apenas o proprietário pode gerenciar o sistema
- **Rastreabilidade Completa**: Histórico imutável de todas as operações

## 🏗️ Estrutura do Projeto
```
BateriasMoura/
├── index.html          # Interface principal do usuário
├── style.css           # Estilos com tema Moura
├── app.js              # Lógica JavaScript completa
└── README.md           # Esta documentação
```

## 📋 Informações do Contrato
- **Endereço**: `0x1c9a4a646cc22E895842B58c307271A21FC81303`
- **Rede**: Arbitrum Sepolia (Chain ID: 421614)
- **Solidity**: ^0.8.26
- **ABI**: Completa incluída no projeto

## 🔧 Funcionalidades Implementadas

### 1. 🔗 Conexão Blockchain
- Conexão automática com MetaMask
- Configuração automática da rede Arbitrum Sepolia
- Detecção de mudanças de conta/rede
- Status visual da conexão

### 2. ➕ Cadastro de Baterias
Campos disponíveis:
- **Tipo**: Automotiva, Estacionária, Tracionária, Solar, NoBreak
- **Uso/Aplicação**: Descrição do uso específico
- **Número de Série**: Identificação única
- **Data de Produção**: Data de fabricação
- **Lote de Produção**: Identificação do lote

### 3. 📋 Listagem e Visualização
- Lista completa de todas as baterias
- Busca por ID específico
- Identificação visual de baterias removidas
- Contador de baterias ativas vs total

### 4. ✏️ Edição de Baterias
- Modal intuitivo para edição
- Atualização individual de cada campo:
  - `setTipo()` - Alterar tipo
  - `setUso()` - Alterar uso
  - `setNrSerie()` - Alterar número de série
  - `setDataProd()` - Alterar data de produção
  - `setLote()` - Alterar lote

### 5. 🗑️ Remoção de Baterias
- Remoção lógica (campos zerados)
- Confirmação antes da remoção
- Manutenção do histórico (ID preservado)

### 6. 🔄 Gestão de Propriedade
- Transferência de propriedade do sistema
- Validação de endereços
- Apenas owner atual pode transferir

## 🎨 Design e UX

### Paleta de Cores Moura
- **Azul Principal**: `#1e3c72` e `#2a5298`
- **Laranja Moura**: `#ff6b00`
- **Fundos**: Gradientes azuis com cards brancos
- **Estados**: Verde para sucesso, vermelho para erros

### Características do Design
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Cards Interativos**: Hover effects e transições suaves
- **Modal de Edição**: Interface limpa para edições
- **Feedback Visual**: Loading states e confirmações
- **Identificação Clara**: IDs destacados e status visual

## 🚀 Como Usar

### 1. Primeira Conexão
1. Abra o `index.html` no navegador
2. Clique em "Conectar MetaMask"
3. Aprove a conexão e mudança de rede
4. O sistema carregará automaticamente as informações

### 2. Cadastrar Nova Bateria
1. Preencha todos os campos obrigatórios
2. Selecione o tipo de bateria
3. Clique em "📝 Cadastrar Bateria"
4. Confirme a transação no MetaMask

### 3. Buscar Bateria Específica
1. Digite o ID da bateria (0, 1, 2...)
2. Clique em "🔍 Buscar"
3. Visualize os detalhes completos

### 4. Editar Bateria Existente
1. Na lista ou busca, clique em "✏️ Editar"
2. Modifique os campos desejados no modal
3. Clique em "💾 Salvar Alterações"
4. Confirme as transações (uma para cada campo alterado)

### 5. Remover Bateria
1. Clique em "🗑️ Remover" na bateria desejada
2. Confirme a remoção
3. A bateria será marcada como removida

## 🔐 Controle de Acesso

### Owner (Proprietário)
- Cadastrar novas baterias
- Editar baterias existentes
- Remover baterias
- Transferir propriedade do sistema

### Usuários Gerais
- Visualizar lista de baterias
- Buscar baterias por ID
- Acessar informações públicas do contrato

## ⛓️ Configuração da Rede

### Arbitrum Sepolia
- **Chain ID**: 421614 (0x66eee)
- **RPC URL**: https://sepolia-rollup.arbitrum.io/rpc
- **Explorer**: https://sepolia.arbiscan.io/
- **Moeda**: ETH (para taxas de gas)

### Adicionar Rede Manualmente
Se a rede não for adicionada automaticamente:
1. Abra MetaMask → Configurações → Redes
2. Clique "Adicionar Rede"
3. Use as informações acima

## 📊 Estrutura de Dados

### Struct Bateria
```solidity
struct Bateria {
    string tipo;      // Tipo da bateria
    string uso;       // Uso/aplicação
    string nr_serie;  // Número de série
    string dataprod;  // Data de produção
    string lote;      // Lote de produção
}
```

### Funções do Contrato

**Escrita (Apenas Owner):**
- `cadastrarBateria()` - Cadastrar nova bateria
- `removerBateria()` - Remover bateria
- `setTipo()`, `setUso()`, `setNrSerie()`, `setDataProd()`, `setLote()` - Editar campos
- `transferirDono()` - Transferir propriedade

**Leitura (Público):**
- `listarBaterias()` - Listar todas as baterias
- `getTipo()`, `getUso()`, `getNrSerie()`, `getDataProd()`, `getLote()` - Obter campos
- `dono()` - Obter endereço do proprietário

## 🛠️ Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Blockchain**: Web3.js 1.8.0, MetaMask
- **Design**: CSS Grid, Flexbox, Responsive Design
- **UX**: Modal dialogs, Loading states, Form validation

## 📱 Compatibilidade
- ✅ Chrome/Edge/Firefox (Desktop)
- ✅ Chrome/Safari (Mobile)
- ✅ MetaMask Browser Extension
- ✅ MetaMask Mobile App

## 🔧 Manutenção e Suporte

### Logs e Debug
O console do navegador mostra informações detalhadas:
- Conexões e transações
- Erros e respostas do contrato
- Estados da aplicação

### Troubleshooting Comum
1. **Erro de Rede**: Verifique se está na Arbitrum Sepolia
2. **Transação Falhou**: Verifique se é o owner do contrato
3. **MetaMask não Conecta**: Atualize a extensão
4. **Gas Insuficiente**: Obtenha ETH Sepolia de faucets

### Faucets para Arbitrum Sepolia
- [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy Faucet](https://sepoliafaucet.com/)
- [QuickNode Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

## 🎯 Casos de Uso

### Fabricante de Baterias
- Registro completo da produção
- Rastreabilidade por lote
- Controle de qualidade
- Histórico imutável

### Distribuidores
- Verificação de autenticidade
- Consulta de especificações
- Rastreamento da cadeia

### Consumidores Finais
- Verificação de produto genuíno
- Informações de fabricação
- Histórico do produto

## 🔮 Próximas Funcionalidades
- [ ] Sistema de notificações
- [ ] Relatórios de produção
- [ ] QR Code para cada bateria
- [ ] API para integração com sistemas externos
- [ ] Multi-signature para operações críticas

---

**Sistema desenvolvido para Baterias Moura**  
*Blockchain • Transparência • Confiabilidade*
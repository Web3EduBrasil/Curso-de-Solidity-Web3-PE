# Sistema Proxy Simplificado

## Descrição
Interface simples para interagir com contratos proxy upgradeable que implementam o padrão de proxy com LogicV1 e LogicV2.

## Características
- **Design Simples**: Interface minimalista com foco na funcionalidade
- **Proxy Pattern**: Suporte completo ao padrão de proxy upgradeable
- **Arbitrum Sepolia**: Configurado para a testnet Arbitrum Sepolia
- **Contratos Logic**: Integração com LogicV1 e LogicV2 que possuem função `incrementar()`

## Estrutura do Projeto
```
Proxy/
├── index.html          # Interface principal
├── style.css           # Estilos simplificados
├── app.js             # Lógica JavaScript
├── app_backup.js      # Backup do arquivo anterior
└── README.md          # Este arquivo
```

## Funcionalidades

### 1. Conexão com Carteira
- Conecta automaticamente com MetaMask
- Configura a rede Arbitrum Sepolia
- Exibe status da conexão

### 2. Função Incrementar
- Chama a função `incrementar()` no contrato através do proxy
- Exibe o valor atual do contador
- Mostra a versão da implementação atual

### 3. Troca de Implementação
- Botão para trocar para LogicV1
- Botão para trocar para LogicV2
- Atualização automática das informações após a troca

### 4. Endereços Úteis
- Mostra o endereço do proxy
- Exibe a implementação atual
- Mostra o admin do proxy

## Configuração

### Endereços dos Contratos
No arquivo `app.js`, atualize os endereços:

```javascript
const PROXY_ADDRESS = '0x6c85B88A168aa7aEE142f0E34dBa8679Ca9Fbc37';
const LOGIC_V1_ADDRESS = '0xYourLogicV1Address'; // Substitua pelo endereço real
const LOGIC_V2_ADDRESS = '0xYourLogicV2Address'; // Substitua pelo endereço real
```

### ABIs dos Contratos
O sistema usa ABIs simplificadas focando apenas nas funções necessárias:

**Proxy ABI:**
- `upgradeTo(address)`: Fazer upgrade da implementação
- `implementation()`: Obter endereço da implementação atual
- `admin()`: Obter endereço do admin

**Logic ABI:**
- `incrementar()`: Incrementar o contador
- `version()`: Obter versão da implementação
- `counter()`: Obter valor do contador

## Como Usar

1. **Conectar Carteira**
   - Clique em "Conectar Carteira"
   - Aprove a conexão no MetaMask
   - A rede será automaticamente trocada para Arbitrum Sepolia

2. **Incrementar Contador**
   - Clique em "➕ Incrementar"
   - Confirme a transação no MetaMask
   - O valor será atualizado automaticamente

3. **Trocar Implementação**
   - Clique em "🔄 Trocar para V1" ou "🔄 Trocar para V2"
   - Confirme a transação no MetaMask (apenas admin pode fazer isso)
   - As informações serão atualizadas

## Rede Arbitrum Sepolia
- **Chain ID**: 421614
- **RPC**: https://sepolia-rollup.arbitrum.io/rpc
- **Explorer**: https://sepolia.arbiscan.io/

## Características do Design
- **Cores**: Paleta simples com azul (#007bff) e cinza
- **Layout**: Cards brancos sobre fundo cinza claro
- **Responsivo**: Funciona em dispositivos móveis e desktop
- **Feedback Visual**: Estados de loading e conexão claramente identificados

## Contratos Esperados

### LogicV1
Deve ter as funções:
- `incrementar()`: Incrementa em 1
- `version()`: Retorna "1.0"
- `counter()`: Retorna valor atual

### LogicV2  
Deve ter as funções:
- `incrementar()`: Incrementa em 2 (ou valor diferente)
- `version()`: Retorna "2.0"
- `counter()`: Retorna valor atual

## Melhorias Implementadas
✅ Interface completamente simplificada  
✅ CSS minimalista sem gradientes complexos  
✅ JavaScript focado na funcionalidade essencial  
✅ ABIs reduzidas apenas ao necessário  
✅ Feedback visual claro para o usuário  
✅ Configuração automática da rede  
✅ Detecção de mudanças de conta/rede  

Este projeto agora tem foco total na simplicidade e usabilidade, mantendo todas as funcionalidades necessárias para testar o padrão proxy com contratos Logic upgradeable.
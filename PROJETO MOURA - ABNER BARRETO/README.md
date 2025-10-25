# 🔋 Rastreabilidade Moura na Arbitrum: Segurança e UX de Próxima Geração

![Badge Status: MVP Estratégico](https://img.shields.io/static/v1?label=Status&message=MVP+Estratégico&color=FFD700&style=for-the-badge)

## 💡 Proposta de Valor: Por Que Este Projeto?

Este sistema demonstra como a **Blockchain Arbitrum (Layer 2)** pode revolucionar a rastreabilidade de ativos para a **Moura**, oferecendo **segurança imutável, transparência auditável** e uma **experiência de usuário (UX) superior**.

Desenvolvido como um **Produto Mínimo Viável (MVP) robusto**, nosso foco foi entregar **valor imediato** (segurança e usabilidade) com uma **visão clara para a arquitetura V2 ideal**.

### Nossa Abordagem Estratégica (MVP -> V2 Otimizada)

| Pilar Estratégico | Solução Atual (MVP) | **Próxima Evolução (V2)** | Benefício Direto (Moura & Arbitrum) |
| :---------------- | :------------------ | :------------------------ | :---------------------------------- |
| **Integridade & Auditoria** | Array com índice mutável (`Swap-and-Pop`) | **`Mapping` + ID Permanente** | **Garante 100% de rastreabilidade imutável**, essencial para conformidade e controle de qualidade a longo prazo. |
| **Segurança de Acesso** | **Controle `onlyOwner` implementado** | Gestão de Acesso Baseada em Papéis (`RBAC`) | **Protege os dados imediatamente**, superando soluções sem controle de acesso. |
| **Usabilidade (UX)** | **Filtro Minimalista & Design Coeso** | Validações Avançadas & Notificações | **Facilita a adoção** pelos auditores e gestores da Moura, demonstrando o poder da Web3 de forma amigável. |

---

## ✨ Destaques do Projeto: Design & UX Focados no Usuário

Acreditamos que a tecnologia blockchain deve simplificar, não complicar. Nossa interface foi desenhada para ser intuitiva e alinhada à excelência da marca Moura.

-   **Filtro Inteligente e Discreto:** Diferente de interfaces poluídas, nosso filtro é acionado por um ícone minimalista, expandindo-se suavemente apenas quando necessário. Isso **maximiza a área útil** e **reduz a carga cognitiva** do usuário.
-   **Feedback Claro e Imediato:** Utilizamos **Toast Notifications** modernas para confirmar ações ou alertar sobre erros, e **Modais de Confirmação** para operações críticas (como remoção), garantindo segurança e clareza.
-   **Identidade Visual Moura:** Respeitamos a paleta de cores, tipografia e o profissionalismo associados à marca Moura.

---

## 🎬 Demonstração em Ação

<p align="center">
 <img src="https://raw.githubusercontent.com/AbnerBarretto/MouraDesafio/main/assets/VideoDemonstracaoMoura.gif" alt="Demonstração do Fluxo de Uso" width="850">
</p>
<p align="center"><em>Demonstração do fluxo de conexão, cadastro, listagem e filtro interativo.</em></p>

---

## ✅ Funcionalidades Essenciais Entregues (MVP)

-   **Registro Seguro:** Cadastro de baterias defeituosas na Arbitrum Sepolia, restrito ao proprietário (`onlyOwner`).
-   **Auditoria Visual:** Listagem completa com métricas e **filtro dinâmico** por Número de Série e Tipo.
-   **Gestão de Dados:** Funções para Atualizar e Remover registros (com otimização de Gas via *Swap-and-Pop*).
-   **Integração Moderna:** Conexão fluida com MetaMask via **Ethers.js**.

---

## 🛠️ Detalhes Técnicos & Plataforma

-   **Smart Contract:** `MouraBateria` em **Solidity (^0.8.19)**.
-   **Blockchain:** **Arbitrum Sepolia** (Layer 2 - Eficiência e Baixo Custo).
-   **Frontend:** HTML5, CSS3, JavaScript ES6+.
-   **Web3 Library:** **Ethers.js** (v5.7.2).

### Configuração da Rede Alvo

| Parâmetro           | Valor                                       |
| :------------------ | :------------------------------------------ |
| **Network Name** | Arbitrum Sepolia                            |
| **New RPC URL** | `https://sepolia-rollup.arbitrum.io/rpc`    |
| **Chain ID** | `421614`                                    |
| **Currency Symbol** | ETH                                         |
| **Block Explorer** | [https://sepolia.arbiscan.io/](https://sepolia.arbiscan.io/) |

---

## 🌍 Acesso e Teste

-   **🔗 Aplicação Online (Vercel):** [**Acesse a Demonstração Aqui**](https://desafiomouraweb3.vercel.app/)
-   **💻 Código Fonte (GitHub):** [**Explore o Repositório**](https://github.com/AbnerBarretto/MouraDesafio)

---

## 📈 Roadmap: Evolução para a Solução Definitiva

Reconhecemos que a arquitetura ideal requer otimizações. Nossos próximos passos planejados:

### Smart Contract V2 (Foco em Imutabilidade e Auditoria Avançada)

-   [ ] **Migrar para `Mapping`:** Substituir o `array` por um `mapping` com IDs únicos e permanentes, **eliminando a mutabilidade do índice** e garantindo 100% de integridade para auditoria.
-   [ ] **Implementar `Events`:** Adicionar eventos Solidity para todas as operações de escrita, permitindo monitoramento off-chain e integração com sistemas de BI da Moura.

### Melhorias de Front-end e Qualidade de Dados

-   [ ] **Validação Robusta:** Implementar validações de formato (RegEx) nos campos de Série/Lote e checagem de datas para garantir a qualidade dos dados na origem.

---

## 👨‍💻 Equipe de Desenvolvimento

Projeto desenvolvido por **Abner Barreto** e **João Henrique**.

| [<img loading="lazy" src="https://github.com/AbnerBarretto.png" width=115><br><sub>Abner Barreto</sub>](https://github.com/AbnerBarretto) | [<img loading="lazy" src="https://github.com/lordpipoca.png" width=115><br><sub>João Henrique</sub>](https://github.com/lordpipoca) |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |

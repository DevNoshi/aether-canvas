---

### 📄 2. Atualização do `CHANGELOG.md`

```markdown
# Changelog

Todas as mudanças notáveis do projeto **AetherCanvas** serão documentadas neste arquivo.



---

## [1.2.0-POW] - 2026-11-06

### 🚀 Adicionado
- **Prova de Trabalho (*Proof of Work*):** Implementação de mineração de blocos baseada em dificuldade por prefixo de zeros (`targetPrefix`).
- **Cálculo de Nonce e Métrica de CPU:** Cada bloco gerado agora computa o número de tentativas (*nonce*) e o tempo exato de processamento em milissegundos (`miningTimeMs`).
- **HUD Aprimorada:** O painel lateral da Merkle Tree agora exibe as informações de mineração de cada bloco em tempo real.

---

## [1.1.0-REPLAY] - 2026-11-06

### 🚀 Adicionado
- **Modo Time Travel (Replay):** Adição de barra deslizante (*slider*) e controle de tempo para viajar pelo histórico de blocos e redesenhar o canvas de forma retroativa.
- **Auditoria de Integridade e Simulação de Fraude:** Funções para validar hashes em cadeia e injetar corrupção de dados para testes de segurança.

---

## [1.0.0] - 2026-11-06

### 🚀 Adicionado
- **Arquitetura Full-Stack Base:** Configuração inicial com Node.js, Express e Socket.io.
- **Motor Criptográfico (`merkleTree.js`):** Implementação de encadeamento de blocos via SHA-256 (`crypto`).
- **Módulo de Desenho (`canvasEngine.js`):** Criação de engine isolada no cliente para manipulação do contexto 2D.
- **Interface Gráfica de Alta Imersão (HUD):** Layout moderno com Tailwind CSS dividindo o quadro e a Merkle Chain Stream.
- **Sincronização em Tempo Real:** Propagação de eventos de traços e limpeza de tela entre clientes.
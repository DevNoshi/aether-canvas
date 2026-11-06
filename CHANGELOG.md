# Changelog

Todas as mudanças notáveis do projeto **AetherCanvas** serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao versionamento semântico.

---

## [1.0.0] - 2026-11-06

### 🚀 Adicionado
- **Arquitetura Full-Stack Base:** Configuração inicial com Node.js, Express e Socket.io.
- **Motor Criptográfico (`merkleTree.js`):** Implementação de encadeamento de blocos via SHA-256 (`crypto`) gerando hashes imutáveis para cada traço ou modificação.
- **Módulo de Desenho (`canvasEngine.js`):** Criação de uma engine de manipulação de contexto 2D isolada no cliente, oferecendo suporte a redimensionamento fluido e desenho responsivo.
- **Interface Gráfica de Alta Imersão (HUD):** Layout moderno com Tailwind CSS dividindo a tela entre o quadro branco colaborativo e o *Merkle Chain Stream* lateral.
- **Sincronização em Tempo Real:** Propagação de eventos de traços (`DRAW_LINE`) e limpeza de tela (`CLEAR_CANVAS`) entre múltiplos clientes conectados.
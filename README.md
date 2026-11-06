# aether-canvas
AetherCanvas: Um Whiteboard Colaborativo P2P com Persistência em Blockchain Local / Merkle Tree


aether-canvas/
├── public/
│   └── index.html         # O front-end do Whiteboard e HUD da Merkle Tree
├── src/
│   ├── canvasEngine.js    # Gerenciamento de estados e traços do canvas
│   ├── merkleTree.js      # Motor criptográfico de hashing e encadeamento
│   └── server.js          # Servidor Express e WebSockets (Socket.io)
├── package.json
└── README.md

# AetherCanvas | Collaborative Whiteboard & Merkle Chain Stream

**AetherCanvas** é um quadro branco colaborativo de alta performance em tempo real, desenvolvido com **Node.js, Express, Socket.io, HTML5 Canvas e Tailwind CSS**. A grande inovação arquitetural deste projeto é o encadeamento criptográfico: **cada traço, desenho ou ação realizada no quadro gera um hash SHA-256**, criando uma árvore de Merkle imutável exibida em tempo real em um painel lateral estilo blockchain.

---

## 🚀 Principais Funcionalidades (v1.0.0)

- **Whiteboard Colaborativo P2P:** Sincronização bidirecional instantânea via WebSockets para múltiplos usuários desenharem simultaneamente.
- **Motor de Canvas Otimizado (`CanvasEngine`):** Módulo dedicado para gerenciamento de traços fluidos, interpolação e redimensionamento responsivo.
- **Merkle Tree Engine (Criptografia Local):** Validação e encadeamento de blocos baseados no histórico de ações utilizando blocos Gênesis e hashes SHA-256.
- **Stream de Blocos em Tempo Real:** Painel lateral HUD modernizado que exibe o hash atual, o hash anterior e o carimbo de data/hora de cada modificação no quadro.
- **Controles de Customização:** Seletor de cores, ajuste dinâmico do tamanho do pincel e ferramenta de limpeza global sincronizada.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express, Socket.io, módulo nativo `crypto`.
- **Frontend:** HTML5 Canvas, Tailwind CSS, JavaScript ES6+ Modular (`CanvasEngine`).
- **Comunicação:** WebSockets assíncronos para baixa latência.

---

## ⚙️ Como Executar o Projeto Localmente

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
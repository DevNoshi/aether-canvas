# AetherCanvas | Collaborative Whiteboard & Merkle Chain Stream

**AetherCanvas** é um quadro branco colaborativo de alta performance em tempo real, desenvolvido com **Node.js, Express, Socket.io, HTML5 Canvas e Tailwind CSS**. A grande inovação arquitetural deste projeto é o encadeamento criptográfico avançado: **cada traço, desenho ou ação realizada no quadro passa por um processo de Prova de Trabalho (*Proof of Work*)**, gerando blocos imutáveis com hashes validados por nonce e exibidos em tempo real em um painel lateral estilo blockchain.

---

## 🚀 Principais Funcionalidades (v1.2.0-POW)

- **Whiteboard Colaborativo P2P:** Sincronização bidirecional instantânea via WebSockets para múltiplos usuários desenharem simultaneamente.
- **Motor de Canvas Otimizado (`CanvasEngine`):** Módulo dedicado para gerenciamento de traços fluidos, interpolação e redimensionamento responsivo.
- **Merkle Tree & Proof of Work (PoW):** Cada bloco de ação exige mineração por força bruta (busca de hash com prefixo de zeros baseado na dificuldade ajustada), calculando o `nonce` e o tempo de processamento da CPU (`ms`).
- **Modo Time Travel (Replay de Histórico):** Barra deslizante (*slider*) interativa que reconstrói e redesenha o estado do quadro passo a passo a partir de qualquer bloco do ledger.
- **Auditoria Criptográfica e Simulação de Fraude:** Ferramentas integradas para validar a integridade de toda a cadeia de hashes e simular ataques de corrupção (*tampering*).
- **Stream de Blocos em Tempo Real:** Painel lateral HUD modernizado que exibe o hash atual, o hash anterior, o nonce, o tempo de mineração e o carimbo de data/hora de cada modificação.

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


   Inicie o servidor em modo de desenvolvimento:

Bash
npm run dev
Acesse no navegador:
Abra uma ou mais abas no navegador e acesse:

Plaintext
http://localhost:3000
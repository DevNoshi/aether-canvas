const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const MerkleTreeEngine = require('./merkleTree');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const merkleEngine = new MerkleTreeEngine();

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log(`[+] Novo colaborador conectado: ${socket.id}`);

  // Envia o histórico atual do canvas e da Merkle Tree para quem acabou de entrar
  socket.emit('init_state', {
    merkleTree: merkleEngine.getTreeState()
  });

  // Quando um usuário desenha ou adiciona um elemento
  socket.on('canvas_action', (actionData) => {
    // Adiciona o evento à Merkle Tree local do servidor
    const newBlock = merkleEngine.addBlock(actionData);

    // Propaga o traço e o novo bloco gerado para todos os outros usuários conectados
    io.emit('sync_action', {
      action: actionData,
      block: newBlock
    });
  });

  socket.on('disconnect', () => {
    console.log(`[-] Colaborador desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🌌 AetherCanvas rodando na porta ${PORT}`);
  console.log(`🌐 Acesse em: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
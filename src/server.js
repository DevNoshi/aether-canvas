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

  // Solicitação de replay/estado completo do Ledger
  socket.on('request_ledger', () => {
    socket.emit('ledger_state', merkleEngine.getTreeState());
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

  // --- NOVAS FUNÇÕES DE AUDITORIA E SEGURANÇA (DENTRO DO ESCOPO DO SOCKET) ---
  
  // Auditoria de Integridade da Merkle Tree
  socket.on('audit_chain', () => {
    const auditResult = merkleEngine.validateChain();
    socket.emit('audit_result', auditResult);
  });

  // Simulação de Adulteração (Para testar o SOC / Auditoria Real)
  socket.on('simulate_tamper', () => {
    if (merkleEngine.historyNodes.length > 1) {
      // Adultera o bloco 2 para simular uma quebra de hash
      merkleEngine.tamperBlock(2, "DADOS_INJETADOS_MALICIOSAMENTE");
      io.emit('chain_compromised', {
        message: '⚠️ ALERTA CRÍTICO: Inconsistência na Merkle Tree detectada na rede!'
      });
    }
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
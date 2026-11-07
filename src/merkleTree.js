const crypto = require('crypto');

class MerkleTreeEngine {
  constructor(difficulty = 2) {
    this.historyNodes = [];
    this.difficulty = difficulty; // Quantidade de zeros iniciais exigidos no hash (ex: '00...')
    
    // Bloco Gênesis minerado
    this.addBlock({ type: 'INIT', author: 'System', data: 'Genesis Block Created' });
  }

  // Gera um hash SHA-256 para o dado combinando o conteúdo, timestamp, previousHash e nonce
  hashData(dataString) {
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  // Adiciona e MINERA um bloco usando Proof of Work
  addBlock(actionData) {
    const previousHash = this.historyNodes.length > 0 
      ? this.historyNodes[this.historyNodes.length - 1].hash 
      : '0000000000000000000000000000000000000000000000000000000000000000';

    const timestamp = Date.now();
    let nonce = 0;
    let currentHash = '';
    const targetPrefix = '0'.repeat(this.difficulty);

    const startTime = Date.now();

    // Loop de Mineração (Proof of Work): Tenta encontrar um hash que comece com os zeros da dificuldade
    while (true) {
      const rawContent = JSON.stringify(actionData) + timestamp + previousHash + nonce;
      currentHash = this.hashData(rawContent);

      if (currentHash.startsWith(targetPrefix)) {
        break; // Hash encontrado! Bloco minerado com sucesso.
      }
      nonce++;
    }

    const miningDuration = Date.now() - startTime;

    const block = {
      id: this.historyNodes.length + 1,
      timestamp,
      data: actionData,
      previousHash,
      nonce,
      hash: currentHash,
      miningTimeMs: miningDuration
    };

    this.historyNodes.push(block);
    console.log(`[⛏️ MINERAÇÃO] Bloco #${block.id} minerado com nonce ${nonce} em ${miningDuration}ms | Hash: ${currentHash.substring(0, 16)}...`);
    
    return block;
  }

  getTreeState() {
    return this.historyNodes;
  }

  validateChain() {
    const targetPrefix = '0'.repeat(this.difficulty);
    for (let i = 1; i < this.historyNodes.length; i++) {
      const currentBlock = this.historyNodes[i];
      const previousBlock = this.historyNodes[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return { isValid: false, message: `Violação no Bloco #${currentBlock.id}: Hash anterior inválido!` };
      }

      const rawContent = JSON.stringify(currentBlock.data) + currentBlock.timestamp + currentBlock.previousHash + currentBlock.nonce;
      const recalculatedHash = this.hashData(rawContent);

      if (currentBlock.hash !== recalculatedHash || !currentBlock.hash.startsWith(targetPrefix)) {
        return { isValid: false, message: `Corrupção ou falha de PoW no Bloco #${currentBlock.id}!` };
      }
    }
    return { isValid: true, message: 'Cadeia de Merkle com Prova de Trabalho 100% íntegra.' };
  }

  tamperBlock(blockId, fakeData) {
    const block = this.historyNodes.find(b => b.id === blockId);
    if (block) {
      block.data = { type: 'TAMPERED_DATA', info: fakeData };
      return true;
    }
    return false;
  }
}

module.exports = MerkleTreeEngine;
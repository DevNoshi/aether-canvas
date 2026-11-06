const crypto = require('crypto');

class MerkleTreeEngine {
  constructor() {
    this.historyNodes = [];
    // Bloco Gênesis (Raiz da árvore)
    this.addBlock({ type: 'INIT', author: 'System', data: 'Genesis Block Created' });
  }

  // Gera um hash SHA-256 para o dado
  hashData(dataString) {
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  addBlock(actionData) {
    const previousHash = this.historyNodes.length > 0 
      ? this.historyNodes[this.historyNodes.length - 1].hash 
      : '0000000000000000000000000000000000000000000000000000000000000000';

    const timestamp = Date.now();
    const rawContent = JSON.stringify(actionData) + timestamp + previousHash;
    const currentHash = this.hashData(rawContent);

    const block = {
      id: this.historyNodes.length + 1,
      timestamp,
      data: actionData,
      previousHash,
      hash: currentHash
    };

    this.historyNodes.push(block);
    return block;
  }

  getTreeState() {
    return this.historyNodes;
  }
}

module.exports = MerkleTreeEngine;
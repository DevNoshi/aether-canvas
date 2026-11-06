class CanvasEngine {
    constructor(canvasElement, onDrawCallback) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.onDrawCallback = onDrawCallback;

        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.initCanvasSize();
        this.initEventListeners();
    }

    // Ajusta a resolução e o tamanho real do canvas para ocupar o container sem distorções
    initCanvasSize() {
        const resize = () => {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            // Salva o conteúdo atual antes de redimensionar (opcional, ou limpa)
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        };
        window.addEventListener('resize', resize);
        resize();
    }

    // Configura os ouvintes de eventos do Mouse e Touch
    initEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;

            const drawData = {
                type: 'DRAW_LINE',
                x0: this.lastX,
                y0: this.lastY,
                x1: e.offsetX,
                y1: e.offsetY,
                color: document.getElementById('colorPicker').value,
                size: document.getElementById('brushSize').value
            };

            // Desenha localmente de imediato (zero latência visual)
            this.drawLine(drawData);

            // Dispara o callback para enviar os dados ao servidor via WebSocket
            if (this.onDrawCallback) {
                this.onDrawCallback(drawData);
            }

            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });

        window.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }

    // Método centralizado para renderizar linhas no contexto 2D
    drawLine(data) {
        this.ctx.beginPath();
        this.ctx.moveTo(data.x0, data.y0);
        this.ctx.lineTo(data.x1, data.y1);
        this.ctx.strokeStyle = data.color;
        this.ctx.lineWidth = data.size;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // Limpa completamente o quadro
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Exporta para uso global no navegador
window.CanvasEngine = CanvasEngine;
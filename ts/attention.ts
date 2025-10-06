// Attention Dot Visualization Module for Eye-Tracking

export async function initializeAttention(): Promise<void> {
    const contentDiv = document.getElementById('attention-content');
    if (!contentDiv) return;

    // Load labels
    const response = await fetch('assets/context/attention.json');
    const attentionLabels = await response.json();

    contentDiv.innerHTML = `
        <div style="padding: 20px;">
            <h2>${attentionLabels.subtitle}</h2>
            <p style="margin: 20px 0; line-height: 1.6;">
                ${attentionLabels.description}
            </p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <canvas id="attention-canvas" width="700" height="500" style="border: 2px solid #ccc; border-radius: 10px; cursor: crosshair; display: block; max-width: 100%; background: white;"></canvas>

                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="clear-btn" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        ${attentionLabels.controls.clearButton}
                    </button>
                    <button id="heatmap-btn" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        ${attentionLabels.controls.heatmapButton}
                    </button>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        ${attentionLabels.controls.dotSizeLabel}
                        <input type="range" id="size-slider" min="5" max="30" value="15" style="width: 150px;">
                        <span id="size-value">15</span>
                    </label>
                </div>

                <div style="margin-top: 20px;">
                    <h3>${attentionLabels.statistics.heading}</h3>
                    <p>${attentionLabels.statistics.pointCount} <span id="point-count">0</span></p>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>${attentionLabels.about.heading}</h3>
                <p style="line-height: 1.6;">
                    ${attentionLabels.about.description}
                </p>
            </div>
        </div>
    `;

    initializeCanvas();
}

interface GazePoint {
    x: number;
    y: number;
    timestamp: number;
}

let gazePoints: GazePoint[] = [];
let dotSize = 15;
let showHeatmap = false;

function initializeCanvas(): void {
    const canvas = document.getElementById('attention-canvas') as HTMLCanvasElement;
    const clearBtn = document.getElementById('clear-btn');
    const heatmapBtn = document.getElementById('heatmap-btn');
    const sizeSlider = document.getElementById('size-slider') as HTMLInputElement;
    const sizeValue = document.getElementById('size-value');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle canvas clicks
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        gazePoints.push({ x, y, timestamp: Date.now() });
        updatePointCount();
        drawCanvas(ctx, canvas);
    });

    // Clear button
    clearBtn?.addEventListener('click', () => {
        gazePoints = [];
        updatePointCount();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Heatmap toggle
    heatmapBtn?.addEventListener('click', () => {
        showHeatmap = !showHeatmap;
        drawCanvas(ctx, canvas);
    });

    // Size slider
    sizeSlider?.addEventListener('input', (e) => {
        dotSize = parseInt((e.target as HTMLInputElement).value);
        if (sizeValue) sizeValue.textContent = dotSize.toString();
        drawCanvas(ctx, canvas);
    });
}

function drawCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showHeatmap) {
        drawHeatmap(ctx);
    } else {
        drawDots(ctx);
    }
}

function drawDots(ctx: CanvasRenderingContext2D): void {
    gazePoints.forEach((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0.3, 1 - age / 10000); // Fade over 10 seconds

        ctx.beginPath();
        ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`;
        ctx.fill();

        // Add a white border
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawHeatmap(ctx: CanvasRenderingContext2D): void {
    if (gazePoints.length === 0) return;

    gazePoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, dotSize * 3);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(point.x - dotSize * 3, point.y - dotSize * 3, dotSize * 6, dotSize * 6);
    });
}

function updatePointCount(): void {
    const countSpan = document.getElementById('point-count');
    if (countSpan) {
        countSpan.textContent = gazePoints.length.toString();
    }
}

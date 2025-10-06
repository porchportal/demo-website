// LVEF (Left Ventricular Ejection Fraction) Visualization Module

export async function initializeLVEF(): Promise<void> {
    const contentDiv = document.getElementById('lvef-content');
    if (!contentDiv) return;

    // Load labels
    const response = await fetch('assets/context/lvef.json');
    const lvefLabels = await response.json();

    contentDiv.innerHTML = `
        <div style="padding: 20px;">
            <h2>${lvefLabels.subtitle}</h2>
            <p style="margin: 20px 0; line-height: 1.6;">
                ${lvefLabels.description}
            </p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>${lvefLabels.form.heading}</h3>
                <div style="margin: 15px 0;">
                    <label style="display: block; margin-bottom: 5px;">${lvefLabels.form.edvLabel}</label>
                    <input type="number" id="edv" placeholder="${lvefLabels.form.edvPlaceholder}" style="padding: 8px; width: 200px; border: 1px solid #ccc; border-radius: 5px;">
                </div>
                <div style="margin: 15px 0;">
                    <label style="display: block; margin-bottom: 5px;">${lvefLabels.form.esvLabel}</label>
                    <input type="number" id="esv" placeholder="${lvefLabels.form.esvPlaceholder}" style="padding: 8px; width: 200px; border: 1px solid #ccc; border-radius: 5px;">
                </div>
                <button id="calculate-btn" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                    ${lvefLabels.form.calculateButton}
                </button>
                <div id="result" style="margin-top: 20px; font-size: 18px; font-weight: bold;"></div>
            </div>

            <div style="margin-top: 30px;">
                <h3>${lvefLabels.ranges.heading}</h3>
                <ul style="line-height: 2;">
                    <li>${lvefLabels.ranges.normal}</li>
                    <li>${lvefLabels.ranges.borderline}</li>
                    <li>${lvefLabels.ranges.reduced}</li>
                </ul>
            </div>
        </div>
    `;

    // Add event listener for calculation
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn?.addEventListener('click', calculateLVEF);
}

function calculateLVEF(): void {
    const edvInput = document.getElementById('edv') as HTMLInputElement;
    const esvInput = document.getElementById('esv') as HTMLInputElement;
    const resultDiv = document.getElementById('result');

    if (!edvInput || !esvInput || !resultDiv) return;

    const edv = parseFloat(edvInput.value);
    const esv = parseFloat(esvInput.value);

    if (isNaN(edv) || isNaN(esv) || edv <= 0 || esv < 0) {
        resultDiv.innerHTML = '<span style="color: red;">Please enter valid values</span>';
        return;
    }

    if (esv >= edv) {
        resultDiv.innerHTML = '<span style="color: red;">ESV must be less than EDV</span>';
        return;
    }

    const lvef = ((edv - esv) / edv) * 100;
    const category = getLVEFCategory(lvef);
    const color = getCategoryColor(category);

    resultDiv.innerHTML = `
        <div style="padding: 15px; background: ${color}15; border-left: 4px solid ${color}; border-radius: 5px;">
            LVEF: <span style="color: ${color};">${lvef.toFixed(1)}%</span> - ${category}
        </div>
    `;
}

function getLVEFCategory(lvef: number): string {
    if (lvef >= 50) return 'Normal';
    if (lvef >= 40) return 'Borderline';
    return 'Reduced';
}

function getCategoryColor(category: string): string {
    switch (category) {
        case 'Normal': return '#22c55e';
        case 'Borderline': return '#f59e0b';
        case 'Reduced': return '#ef4444';
        default: return '#666';
    }
}

// LVEF (Left Ventricular Ejection Fraction) Visualization Module
export function initializeLVEF() {
    const contentDiv = document.getElementById('lvef-content');
    if (!contentDiv)
        return;
    contentDiv.innerHTML = `
        <div style="padding: 20px;">
            <h2>LVEF Calculator & Visualization</h2>
            <p style="margin: 20px 0; line-height: 1.6;">
                Left Ventricular Ejection Fraction (LVEF) is a measurement of the percentage of blood
                leaving your heart each time it contracts.
            </p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>Calculate LVEF</h3>
                <div style="margin: 15px 0;">
                    <label style="display: block; margin-bottom: 5px;">End-Diastolic Volume (mL):</label>
                    <input type="number" id="edv" placeholder="Enter EDV" style="padding: 8px; width: 200px; border: 1px solid #ccc; border-radius: 5px;">
                </div>
                <div style="margin: 15px 0;">
                    <label style="display: block; margin-bottom: 5px;">End-Systolic Volume (mL):</label>
                    <input type="number" id="esv" placeholder="Enter ESV" style="padding: 8px; width: 200px; border: 1px solid #ccc; border-radius: 5px;">
                </div>
                <button id="calculate-btn" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                    Calculate LVEF
                </button>
                <div id="result" style="margin-top: 20px; font-size: 18px; font-weight: bold;"></div>
            </div>

            <div style="margin-top: 30px;">
                <h3>LVEF Ranges</h3>
                <ul style="line-height: 2;">
                    <li><strong>Normal:</strong> 50-70%</li>
                    <li><strong>Borderline:</strong> 40-49%</li>
                    <li><strong>Reduced:</strong> <40%</li>
                </ul>
            </div>
        </div>
    `;
    // Add event listener for calculation
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn === null || calculateBtn === void 0 ? void 0 : calculateBtn.addEventListener('click', calculateLVEF);
}
function calculateLVEF() {
    const edvInput = document.getElementById('edv');
    const esvInput = document.getElementById('esv');
    const resultDiv = document.getElementById('result');
    if (!edvInput || !esvInput || !resultDiv)
        return;
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
function getLVEFCategory(lvef) {
    if (lvef >= 50)
        return 'Normal';
    if (lvef >= 40)
        return 'Borderline';
    return 'Reduced';
}
function getCategoryColor(category) {
    switch (category) {
        case 'Normal': return '#22c55e';
        case 'Borderline': return '#f59e0b';
        case 'Reduced': return '#ef4444';
        default: return '#666';
    }
}
//# sourceMappingURL=lvef.js.map
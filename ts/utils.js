// Shared utility functions for the Medical Visualization Hub
/**
 * Format a number to a specified number of decimal places
 */
export function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals);
}
/**
 * Validate if a value is a positive number
 */
export function isPositiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
}
/**
 * Get a color based on a value and range
 */
export function getColorForValue(value, min, max) {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.33) {
        return '#ef4444'; // Red
    }
    else if (normalized < 0.67) {
        return '#f59e0b'; // Orange
    }
    else {
        return '#22c55e'; // Green
    }
}
/**
 * Debounce function to limit how often a function can fire
 */
export function debounce(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
/**
 * Create a timestamp string
 */
export function getTimestamp() {
    return new Date().toISOString();
}
/**
 * Download data as a JSON file
 */
export function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
/**
 * Calculate distance between two points
 */
export function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
/**
 * Generate a random color in hex format
 */
export function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
/**
 * Check if browser supports required features
 */
export function checkBrowserSupport() {
    return {
        canvas: !!document.createElement('canvas').getContext,
        localStorage: typeof Storage !== 'undefined',
        es6Modules: 'noModule' in HTMLScriptElement.prototype
    };
}
//# sourceMappingURL=utils.js.map
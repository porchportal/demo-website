/**
 * Format a number to a specified number of decimal places
 */
export declare function formatNumber(num: number, decimals?: number): string;
/**
 * Validate if a value is a positive number
 */
export declare function isPositiveNumber(value: any): boolean;
/**
 * Get a color based on a value and range
 */
export declare function getColorForValue(value: number, min: number, max: number): string;
/**
 * Debounce function to limit how often a function can fire
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Create a timestamp string
 */
export declare function getTimestamp(): string;
/**
 * Download data as a JSON file
 */
export declare function downloadJSON(data: any, filename: string): void;
/**
 * Calculate distance between two points
 */
export declare function calculateDistance(x1: number, y1: number, x2: number, y2: number): number;
/**
 * Generate a random color in hex format
 */
export declare function randomColor(): string;
/**
 * Check if browser supports required features
 */
export declare function checkBrowserSupport(): {
    canvas: boolean;
    localStorage: boolean;
    es6Modules: boolean;
};
//# sourceMappingURL=utils.d.ts.map
export const basePath = process.env.NODE_ENV === 'production' ? '/demo-website' : ''

export function getAssetPath(path: string): string {
  return `${basePath}${path}`
}

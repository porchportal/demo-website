export const basePath = '/demo-website'

export function getAssetPath(path: string): string {
  return `${basePath}${path}`
}

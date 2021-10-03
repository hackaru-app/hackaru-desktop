export function createPrefixer(namespace: string): (key: string) => string {
  return (key: string) => [namespace, key].join(':')
}

export function getSlug(path: string) {
  return path.split('/').pop()?.split('.')[0];
}

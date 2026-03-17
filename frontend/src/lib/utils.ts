export function clsx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Hyperlink(text: string, url: string): string {
  return `\u001b]8;;${url}\u0007${text}\u001b]8;;\u0007`;
}

export function Bold(text: string): string {
  return `\u001b[1m${text}\u001b[22m`;
}

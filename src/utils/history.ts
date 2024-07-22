export function replaceHistoryState(newUrl: string): void {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    '',
    newUrl,
  )
}

export function removeAllFocus() {
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select')
  focusableElements.forEach((element: any) => {
    element.blur()
  })
}

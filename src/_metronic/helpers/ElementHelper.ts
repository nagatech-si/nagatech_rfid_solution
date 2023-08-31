export default function scrollToElement(id: string, behavior: 'auto' | 'smooth') {
  setTimeout(() => {
    const element = document.getElementById(id)
    if (element != null) {
      element.scrollIntoView({
        behavior: behavior,
        block: 'center',
      })
    }
  }, 100)
}

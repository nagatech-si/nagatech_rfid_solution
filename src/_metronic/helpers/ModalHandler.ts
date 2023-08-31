export default function hideModal(name?: string) {
  const closeButton: HTMLElement | null = document.querySelector('.modal.fade.show #close-modal')
  closeButton?.click()
}

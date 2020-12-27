export const modalListener = event => {
  event.preventDefault()
  const link = event.target.parentElement
  if (link.classList.contains('js-video-link')) {
    //lazy loading
    import(/*webpackChunkName: 'open-modal' */ './open-modal').then(
      ({ openModal }) => {
        openModal(link.dataset.videoid)
      }
    )
  }
}

import h from 'hyperscript'
import { fetchPopular, fetchHighestRated, fetchTrending } from './api'
import CarouselItem from './CarouselItem'

const SectionTitle = title => h('h3.carousel__title', title)

const image = imageUrl =>
  h('img.carousel-item__img', { 'data-img': imageUrl, alt: '' })

const callback = (entires, observer) => {
  entires.forEach(entry => {
    const { target } = entry
    if (entry.isIntersecting) target.src = target.getAttribute('data-img')
  })
}
const option = {
  root: document.querySelector('carousel__container'),
  threshold: 0.2,
}

const intersectionOberver = new IntersectionObserver(callback, option)

const Carousel = ({ itemsList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemsList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) => {
          const elementImage = image(posterImage.medium)
          intersectionOberver.observe(elementImage)
          return CarouselItem({
            elementImage,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          })
        }
      )
    )
  )

!(async function(document) {
  const mountReference = document.querySelector('.main').lastElementChild

  if (!mountReference) {
    return 0
  }

  const trending = await fetchTrending()
  const popular = await fetchPopular()
  const highestRated = await fetchHighestRated()

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      })
    )
})(document, window)

import './sass/main.scss';
const axios = require('axios');
import fetchImages from './fetchImages';
// const InfiniteScroll = require('infinite-scroll');

const formEl = document.querySelector('form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const orientation = 'horizontal';
let page = 1;
const perPage = 40;
const q = formEl.elements.searchQuery.value;
// loadMoreBtn

const renderMarkup = data => {
  console.log(data)
      const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
  </div>`)
        .join();
        galleryEl.insertAdjacentHTML('beforeend', markup);
}

const onLoad = async (e) => {
  e.preventDefault();
  page = 1;
  const data = await fetchImages(q, page, perPage, orientation);
  // console.log(data)
  renderMarkup(data)
}

const onLoadMore = async () => {
  const data = await fetchImages(q, ++page, perPage, orientation);
    renderMarkup(data);
  ;
}

formEl.addEventListener('submit', onLoad);
loadMoreBtn.addEventListener('click', onLoadMore)

window.addEventListener('scroll', function (e) {
  console.log(window.pageYOffset); //текущее положение скрола
  console.log(galleryEl.offsetHeight); //высота гэлЭл
  if (window.pageYOffset - 300 <= galleryEl.offsetHeight ) onLoadMore();

});

function onScroll(q, orientation, page = 1, perPage) {}

// let infScroll = new InfiniteScroll(galleryEl, {
//   // options
//   path: '.load-more',
//   append: ".photo-card",
//   history: false,
// });

// element argument can be a selector string
//   for an individual element

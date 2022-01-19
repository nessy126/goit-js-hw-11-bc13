import './sass/main.scss';
import fetchImages from './fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// const InfiniteScroll = require('infinite-scroll');

const formEl = document.querySelector('form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const orientation = 'horizontal';
let page = 1;
const perPage = 40;
let q;

const renderMarkup = data => {
  console.log(data);
  const markup = data.hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
  <a href="${webformatURL}">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
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
  </a>
  </div>`,
    )
    .join();
  galleryEl.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};


const onLoad = async e => {
  e.preventDefault();
  page = 1;
  galleryEl.innerHTML = '';
  q = formEl.elements.searchQuery.value;
  const data = await fetchImages(q, page, perPage, orientation);
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images` );
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
        loadMoreBtn.style.display = 'none';
    return;
  }
  loadMoreBtn.style.display = 'flex';
  console.log(data);
  renderMarkup(data);
};

const onLoadMore = async () => {
  q = formEl.elements.searchQuery.value;
  const data = await fetchImages(q, ++page, perPage, orientation);
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
          loadMoreBtn.style.display = 'none';
    return;
  }

  if (data.hits.length < 40) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
    renderMarkup(data);
};

formEl.addEventListener('submit', onLoad);
loadMoreBtn.addEventListener('click', onLoadMore);

// window.addEventListener('scroll', function (e) {
//   // console.log(window.pageYOffset); //текущее положение скрола
//   // console.log(galleryEl.offsetHeight); //высота гэлЭл

//   const contentHeight = block.offsetHeight; // 1) высота блока контента вместе с границами
//   const yOffset = window.pageYOffset; // 2) текущее положение скролбара
//   const window_height = window.innerHeight; // 3) высота внутренней области окна документа
//   const y = yOffset + window_height;

//   if (y >= contentHeight) onLoadMore();
//   // если пользователь достиг конца

//   // if (window.pageYOffset - 300 <= galleryEl.offsetHeight)
// });

// function onScroll(q, orientation, page = 1, perPage) {}

// let infScroll = new InfiniteScroll(galleryEl, {
//   // options
//   path: '.load-more',
//   append: ".photo-card",
//   history: false,
// });

// element argument can be a selector string
//   for an individual element

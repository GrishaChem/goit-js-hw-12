// import { searchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import ButtonService from './js/LoadMoreService.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import * as ImagesApiService from './js/pixabay-api.js';

const gallery = document.querySelector('.gallery');
const submit = document.querySelector('#button');
const input = document.querySelector('#input');
const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.btn');

console.log(ImagesApiService);
function showLoader() {
  loader.classList.add('is-visible');
}

function hideLoader() {
  loader.classList.remove('is-visible');
}

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

//* --- Load more btn

const loadMoreBtn = new ButtonService(loadBtn, 'is-hidden');

loadMoreBtn.hide();

const params = {
  page: 1,
  per_page: 15,
  q: '',
  maxPage: 0,
};

searchForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  clearGallery(gallery);
  params.q = input.value;
  console.log(params.q);
  showLoader();

  loadMoreBtn.show();
  loadMoreBtn.disable();

  params.page = 1;

  try {
    const { hits, total } = await ImagesApiService.getImages(params);
    params.maxPage = Math.ceil(total / params.per_page);
    renderGallery(gallery, hits);
    console.log(total);
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    smoothScroll(cardHeight);
    hideLoader();
    if (params.maxPage > 1) {
      loadMoreBtn.enable();
      loadBtn.addEventListener('click', handleClick);
    } else {
      loadMoreBtn.hide();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Error',
    });
  } finally {
    searchForm.reset();
  }
}

async function handleClick() {
  loadMoreBtn.disable();
  params.page += 1;

  try {
    const { hits } = await ImagesApiService.getImages(params);
    renderGallery(gallery, hits);
    hideLoader();
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    smoothScroll(cardHeight);
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Error',
    });
  } finally {
    if (params.page == params.maxPage) {
      loadMoreBtn.hide();
      loadBtn.removeEventListener('click', handleClick);
      iziToast.info({
        title: 'End',
        message:
          'We are sorry, but you have reached the end of search results.',
      });
    } else {
      loadMoreBtn.enable();
    }
  }
}

function smoothScroll(cardHeight) {
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

//   searchImages(params.q)
//     .then(data => {
//       console.log(data);
//       if (data.hits.length === 0) {
//         iziToast.error({
//           title: 'Error',
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//         clearGallery(gallery);
//         hideLoader();
//         return;
//       }
//       const images = data.hits;

//       renderGallery(gallery, images);
//       console.log(images);

//       hideLoader();

//       lightbox.refresh();
//     })
//     .catch(error => {
//       console.log(error);
//       hideLoader(); // Скрываем лоадер при ошибке
//     });
// }

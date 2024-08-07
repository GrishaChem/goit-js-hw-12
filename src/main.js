import { searchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const submit = document.querySelector('#button');
const input = document.querySelector('#input');
const searchForm = document.querySelector('#search-form');

const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.add('is-visible');
}

function hideLoader() {
  loader.classList.remove('is-visible');
}

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  clearGallery(gallery);
  const value = input.value;

  showLoader();

  searchImages(value)
    .then(data => {
      console.log(data);
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        clearGallery(gallery);
        hideLoader();
        return;
      }
      const images = data.hits;

      renderGallery(gallery, images);
      console.log(images);

      hideLoader();

      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
      hideLoader(); // Скрываем лоадер при ошибке
    });
}

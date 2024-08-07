export function renderGallery(gallery, images) {
  const markUp = images
    .map(
      image =>
        `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </a>
    `
    )
    .join('');

  return gallery.insertAdjacentHTML('beforeend', markUp);
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

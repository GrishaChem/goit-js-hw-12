export function searchImages(query) {
  const URL = 'https://pixabay.com/api/';
  const API = '45254861-458f9554e62e34626fe81458f';

  return fetch(
    `${URL}?key=${API}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

// export function searchImages(query) {
import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const API = '45254861-458f9554e62e34626fe81458f';

// axios.defaults.baseURL = URL;

function getImages({ page = 1, per_page = 15, q = '' } = {}) {
  return axios
    .get(URL, {
      params: {
        page,
        per_page,
        q,
        key: API,
      },
    })
    .then(({ data }) => data);
}

export { getImages };

//   return fetch(
//     `${URL}?key=${API}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   });
// }

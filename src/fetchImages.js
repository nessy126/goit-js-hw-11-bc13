const axios = require('axios').default;

export default function fetchImages(q, page = 1, perPage = 40, orientation = 'horizontal') {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '25273711-e95d23ce228d19c821de1faa8';

  return axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${q}&image_type=photo&orientation=${orientation}&safesearch=true&page=${page}&per_page=${perPage}`,
  )
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
  //axios#get(url[, config])
}

const axios = require('axios');

export default async function fetchImages(q, page = 1, perPage = 40, orientation = 'horizontal') {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '25273711-e95d23ce228d19c821de1faa8';
  const generalURL =  `${BASE_URL}?key=${KEY_API}&q=${q}&image_type=photo&orientation=${orientation}&safesearch=true&page=${page}&per_page=${perPage}`

  // const requestParams = {
  //   key: KEY_API,
  //   q: q,
  //   image_type: 'photo',
  //   orientation: orientation,
  //   safesearch: true,
  //   page,
  //   per_page: perPage,
  //       }
  const data = await axios.get(generalURL);
  // console.log(data)
  return data.data;
    // .then(response => console.log(response.data))
    // .catch(err => console.log(err));
  //axios#get(url[, config])
}

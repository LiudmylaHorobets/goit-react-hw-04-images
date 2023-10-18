import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38912022-909e19910279754e6bef7369e';

export async function getImage(q, page = 1) {
  try {
    const searchParams = await axios.get(BASE_URL, {
      params: {
        q: q,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
   return searchParams.data;
  } catch (error) {
    throw error;
  }
}

import axios from 'axios';

export async function isAuthenticated() {
  let API_URL = process.env.REACT_APP_API_URL;
  try {
    const res = await axios.get(API_URL + 'authenticate', {
      withCredentials: true,
    });

    if (res.status === 200) return res.data;

    return false;
  } catch (error) {
    return false;
  }
}

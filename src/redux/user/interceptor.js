import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/users`,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use((config) => {
  return config;
},
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.secondTime
    ) {
      originalRequest.secondTime = true;

      try {
        const response = await axios.get(
          `${BASE_URL}/users`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
      }
    }
    throw error;
  }
);

export default api;

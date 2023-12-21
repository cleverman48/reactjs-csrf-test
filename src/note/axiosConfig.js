import axios from 'axios';

axios.interceptors.request.use((config) => {
  const csrfToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)csrfToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  config.headers['X-CSRF-Token'] = csrfToken;
  return config;
});

export default axios;
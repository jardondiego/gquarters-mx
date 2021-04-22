const envToUrl = {
  local: process.env.REACT_APP_API_URL_LOCAL,
  staging: process.env.REACT_APP_API_URL_STAGING,
  production: process.env.REACT_APP_API_URL_PRODUCTION,
};

const apiUrl = envToUrl[process.env.REACT_APP_ENVIRONMENT];

export { apiUrl };
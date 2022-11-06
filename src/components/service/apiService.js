const API_KEY = 'MFBpb4o3W47ysMYj2P1F8FkZNmHx8ygb';

const fetchCurrency = API_KEY => {
  return fetch(`https://api.exchangeratesapi.io/v1/latest
    ? access_key = API_KEY`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
};

export default fetchCurrency;

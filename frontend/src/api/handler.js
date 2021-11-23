import axios from 'axios';

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:5000' + options.url,
      method: options.method,
      params: options.params,
      data: options.body,
    }).then((response) => {
      resolve(response.data)
    }).catch((e) => {
      if (e.status === 401) {
        window.location.href = "/";
      }
      reject(e);
    })
  })
}
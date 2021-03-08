/**
 *
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method
 */
const apiFactory = (method) => (url, data) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-undef
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin', window.location.origin);

  // eslint-disable-next-line no-undef
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers,
    mode: 'cors'
  })
    .then((response) => response.text())
    .then((response) => {
      resolve(
        response
          ? JSON.parse(response)
          : {}
      );
    }).catch((error) => {
      reject(error);
    });
});

const get = apiFactory('GET');
const post = apiFactory('POST');
const put = apiFactory('PUT');
const deleteApi = apiFactory('DELETE');

export {
  get,
  post,
  put,
  deleteApi
};

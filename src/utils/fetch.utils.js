export const shortFetch = ({
  url,
  body,
  method,
  onSuccess = () => {},
  onError = () => {},
}) => {
  fetch(url, {
    method: `${method}`,
    headers: new Headers({
      Accept: "application/json",
      "Content-type": "application/json",
    }),
    mode: "cors",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

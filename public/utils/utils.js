export async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const error = new Error(errorResponse.message);
    // @ts-ignore
    error.fullResponse = errorResponse;
    throw error;
  }
  return res.json();
};

export async function fetchGetJson(URL, token = null) {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  const data = await fetch(URL, options).then(handleHttpErrors);
  return data;
};

export async function fetchPostJsonFormData(URL, form, token = null) {
  let formElement = /** @type {HTMLFormElement} */ (form);
  const formData = new FormData(formElement);
  const dataFromForm = {};
  formData.forEach((value, key) => (dataFromForm[key] = value));

  let options = {
    method: "POST",
    body: JSON.stringify(dataFromForm),
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  const addedData = await fetch(URL, options).then(handleHttpErrors);
  return addedData;
};
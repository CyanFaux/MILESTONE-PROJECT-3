const API_KEY = "bce9ad6e";
const API_URL = "http://www.omdbapi.com/";
const url = `${API_URL}?t=`;

const fetchSearch = async (searchTerm) => {
  const response = await fetch(url + searchTerm + `&apikey=${API_KEY}`);
  const resData = await response.json();
  console.log(resData);
  return resData;
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result = "";

  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }

      return result;
    },
  };
};

export const createResource = (searchTerm) => {
  return {
    result: wrapPromise(fetchSearch(searchTerm)),
  };
};

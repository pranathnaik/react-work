const axios = require("axios").default;
const HttpRequests = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default HttpRequests;

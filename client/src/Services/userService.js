import axios from "axios";

async function registerAsync(payload) {
  const config = {
    url: "http://localhost:53453/api/user",
    method: "post",
    data: payload
  };
  const response = await axios(config);
  return response.data;
}

export { registerAsync };

import axios from "axios";
let root = "ttp://localhost:53453/api/user";
async function registerAsync(payload) {
  const config = {
    url: `${root}/register`,
    method: "post",
    data: payload
  };
  const response = await axios(config);
  return response.data;
}

async function getCurrent() {
  const config = {
    url: `${root}/current`,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };
  const response = await axios(config);
  return response.data;
}

async function logOut() {
  const config = {
    url: `${root}/logout`,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };
  const response = await axios(config);
  return response.data;
}

export { registerAsync, getCurrent, logOut };

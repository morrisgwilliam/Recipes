import axios from "axios";
let root = "http://localhost:53453/api/users";
async function registerAsync(payload) {
  const config = {
    url: `${root}/register`,
    method: "post",
    data: payload
  };
  const response = await axios(config);
  return response.data;
}

const getCurrent = () => {
  const config = {
    url: `${root}/current`,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

async function logOut() {
  const config = {
    url: `${root}/logout`,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };
  const response = await axios(config);
  return response.data;
}

const logIn = payload => {
  const config = {
    url: `${root}/login`,
    method: "post",
    data: payload,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { registerAsync, getCurrent, logOut, logIn };

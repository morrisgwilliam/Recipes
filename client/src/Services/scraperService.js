import axios from "axios";

const getTips = () => {
  const config = {
    url: "/api/scraper",
    method: "get"
  };
  return axios(config);
};
export { getTips };

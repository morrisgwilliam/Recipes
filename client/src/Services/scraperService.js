import axios from 'axios'

const getTrivia = () => {
    const config = {
        url: "/api/scraper",
        method: "get"
    }
    return axios(config);
}
export {getTrivia}
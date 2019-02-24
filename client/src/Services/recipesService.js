import axios from "axios";
import queryString from "query-string";

const getByIngredients = payload => {
  let qParams = queryString.stringify(payload.queryParams);
  const config = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?${qParams}`,
    method: "get",
    headers: {
      "X-RapidAPI-Key": "318beb6049msh5803db5708a17eep12d2efjsndfb787b62976"
    }
  };
  return axios(config);
};
const getRecipe = payload => {
  const config = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${payload}/information`,
    method: "get",
    headers: {
      "X-RapidAPI-Key": "318beb6049msh5803db5708a17eep12d2efjsndfb787b62976"
    }
  };
  return axios(config);
};

export { getByIngredients, getRecipe };

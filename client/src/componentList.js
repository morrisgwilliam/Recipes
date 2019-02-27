import MyRecipes from "./Components/MyRecipes";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

var mainList = [
  {
    path: "/myrecipes",
    nav: true,
    component: MyRecipes,
    icon: ShoppingCartIcon,
    name: "My Recipes"
  }
];

export default mainList;

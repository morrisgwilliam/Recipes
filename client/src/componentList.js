import MyRecipes from "./Components/MyRecipes/MyRecipes";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FindRecipes from './Components/SearchRecipes/FindRecipes'
import Chart from './Components/Chart'
import SearchIcon from '@material-ui/icons/Search'
import InfoIcon from "@material-ui/icons/Info"
import Tips from './Components/Trivia/Tips'

var mainList = [
  {
    path: "/myrecipes",
    nav: true,
    component: MyRecipes,
    icon: ShoppingCartIcon,
    name: "My Recipes"
  },
  {
    path: "/findrecipes",
    nav: true,
    component: FindRecipes,
    icon: SearchIcon,
    name: "Find Recipes"
  },
  {
    path:"/tips",
    nav: true,
    component: Tips,
    icon: InfoIcon,
    name: "Cooking Tips"
  },
  {
    path:"/",
    nav: false,
    component: Chart
  }
];

export default mainList;

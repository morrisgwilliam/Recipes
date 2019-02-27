using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models.Domain
{
    public class Recipe
    {
        public string Title { get; set; }
        public int RecipeId { get; set; }
        public int Calories { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
        public int Fat { get; set; }
        public int ApiId { get; set; }
        public List<Instruction> Instructions { get; set; }
    }
}
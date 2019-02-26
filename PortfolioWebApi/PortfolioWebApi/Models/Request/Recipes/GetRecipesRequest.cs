using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models.Request.Recipes
{
    public class GetRecipesRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int PageIndex { get; set; }
        [Required]
        public int PageSize { get; set; }

        public string Query { get; set; }
    }
}
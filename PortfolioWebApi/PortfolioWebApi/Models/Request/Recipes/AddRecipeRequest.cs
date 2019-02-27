using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models.Request
{
    public class AddRecipeRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int Carbs { get; set; }
        [Required]
        public int Protein { get; set; }
        [Required]
        public int Fat { get; set; }
        [Required]
        public int Calories { get; set; }
        [Required]
        public List<string> Steps { get; set; }
        [Required]
        public int ApiId { get; set; }
    }
}
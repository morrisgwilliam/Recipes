using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models.Request
{
    public class AddRecipeRequest
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public List<string> Steps { get; set; }
    }
}
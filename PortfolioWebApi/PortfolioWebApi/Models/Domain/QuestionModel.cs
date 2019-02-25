using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models
{
    public class QuestionModel
    {
        public string Question { get; set; }
        public string  Answer { get; set; }
        public string DetailedAnswer { get; set; }
    }
}
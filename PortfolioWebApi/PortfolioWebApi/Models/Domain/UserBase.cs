using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Models.Domain
{
    public class UserBase
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
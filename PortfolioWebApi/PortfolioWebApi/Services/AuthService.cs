using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PortfolioWebApi.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PortfolioWebApi.Services
{
    public class AuthService : IDisposable
    {
        private AuthContext _ctx;
        private UserManager<IdentityUser> _userManager;
        public AuthService()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(AddUserRequest model)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
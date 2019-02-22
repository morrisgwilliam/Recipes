using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using PortfolioWebApi.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace PortfolioWebApi.Services
{
    public class JwtAuthService : IJwtAuthService
    {
        private static string _title = null;
        private const string _extProviders = "ExtProviders";

        static JwtAuthService()
        {
            _title = GetApplicationName();
        }

        public JwtAuthService()
        {

        }

        public void LogIn(UserBase user, params Claim[] extraCalims)
        {
            ClaimsIdentity identity = new ClaimsIdentity(DefaultAuthenticationTypes.ApplicationCookie, ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            identity.AddClaim(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", _title, ClaimValueTypes.String));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString(), ClaimValueTypes.String));
            identity.AddClaim(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email, ClaimValueTypes.String));
            if (user.Roles != null && user.Roles.Any())
            {
                foreach (string singleRole in user.Roles)
                {
                    identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, singleRole, ClaimValueTypes.String));
                };
            }
        }

        public void LogOut()
        {
            Microsoft.Owin.IOwinContext owinContext = HttpContext.Current.Request.GetOwinContext();
            IEnumerable<AuthenticationDescription> authenticationTypes = owinContext.Authentication.GetAuthenticationTypes();
            owinContext.Authentication.SignOut(authenticationTypes.Select(o => o.AuthenticationType).ToArray());
        }

        public bool IsLoggedIn()
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }

        public int GetCurrentUserid()
        {
            return GetId(HttpContext.Current.User.Identity).Value;
        }

        public UserBase GetCurrentUser()
        {
            UserBase baseUser = null;
            if (IsLoggedIn())
            {
                ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                if (claimsIdentity != null)
                {
                    baseUser = ExtractUser(claimsIdentity);
                }
            }
            return baseUser;
        }

        private static UserBase ExtractUser(ClaimsIdentity identity)
        {
            UserBase baseUser = new UserBase();

            List<string> roles = null;

            foreach (var claim in identity.Claims)
            {
                switch (claim.Type)
                {
                    case ClaimTypes.NameIdentifier:
                        int Id = 0;
                        if (Int32.TryParse(claim.Value, out Id))
                        {
                            baseUser.Id = Id;
                        }
                        break;
                    case ClaimTypes.Name:
                        baseUser.Email = claim.Value;
                        break;
                    case ClaimTypes.Role:
                        if (roles == null)
                        {
                            roles = new List<string>();
                        }
                        roles.Add(claim.Value);
                        break;
                }
            }
            baseUser.Roles = roles;
            return baseUser;
        }

        private static int? GetId(IIdentity identity)
        {
            if (identity == null) { throw new ArgumentNullException("identity"); }
            if (!identity.IsAuthenticated) { throw new InvalidOperationException("The current IIdentity is not Authenticated"); }
            ClaimsIdentity ci = identity as ClaimsIdentity;
            int idParsed = 0;

            if (ci != null)
            {
                Claim claim = ci.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (claim != null && Int32.TryParse(claim.Value, out idParsed))
                {
                    return idParsed;
                }
            }
            return null;
        }

        private static string GetApplicationName()
        {
            var entryAssemble = Assembly.GetExecutingAssembly();

            var titleAttribute = entryAssemble.GetCustomAttributes(typeof(AssemblyTitleAttribute), false).FirstOrDefault() as AssemblyTitleAttribute;
            return titleAttribute == null ? entryAssemble.GetName().Name : titleAttribute.Title;
        }


    }
}
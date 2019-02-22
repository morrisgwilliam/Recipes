using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using PortfolioWebApi.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace PortfolioWebApi
{
    public class AppJwtFormat : JwtFormat, ISecureDataFormat<AuthenticationTicket>
    {
        private string _jwtSecret = null;
        private int _expDays;
        private TokenValidationParameters _tokenValidationParams;
        private static readonly string[] _specialTypes = new[]
        {
            ClaimTypes.Role,
            ClaimTypes.Name,
            ClaimTypes.NameIdentifier,
            "http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider"
        };
        public AppJwtFormat(TokenValidationParameters tokenParams, string jwtSecret, int expDays) : base(tokenParams)
        {
            this._tokenValidationParams = tokenParams;
            this._jwtSecret = jwtSecret;
            this._expDays = expDays;
        }

        string ISecureDataFormat<AuthenticationTicket>.Protect(AuthenticationTicket data)
        {
            //var roles = data.Identity.FindAll(ClaimTypes.Role);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken
            (
                issuer: this._tokenValidationParams.ValidIssuer,
                audience: this._tokenValidationParams.ValidAudience,
                claims: data.Identity.Claims,

                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(_expDays)),
                signingCredentials: _jwtSecret.ToIdentitySigningCredentials()
            );

            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return token;
        }

        AuthenticationTicket ISecureDataFormat<AuthenticationTicket>.Unprotect(string protectedText)
        {
            try
            {
                AuthenticationTicket tic = base.Unprotect(protectedText); ;//; AuthenticationTicket(claimsIdentity, authenticationProperties);
                return tic;
            }
            catch (SecurityTokenException) // this seems to be a good base class to catch the errors we want
            {
                return null;
            }
            catch (Exception) // this seems to be a good base class to catch the errors we want
            {
                return null;
            }
        }
    }
}
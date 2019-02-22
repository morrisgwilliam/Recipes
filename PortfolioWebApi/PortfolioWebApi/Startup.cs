using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using PortfolioWebApi.Services;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;

[assembly: OwinStartup(typeof(PortfolioWebApi.Startup))]
namespace PortfolioWebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //HttpConfiguration config = new HttpConfiguration();
            //ConfigureOAuth(app);
            //WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureCookieAuth(app);
            ConfigureJwtAuth(app);
            //app.UseWebApi(config);
        }

        private static void ConfigureJwtAuth(IAppBuilder app)
        {
            string _jwtSecret;
            TokenValidationParameters tokenParams;
            SetTokenValidationParameters(out _jwtSecret, out tokenParams);

            // Continue code //////
        }

        public static void ConfigureCookieAuth(IAppBuilder app)
        {
            CookieAuthenticationOptions cookieAuthenticationOptions = new CookieAuthenticationOptions();
            {
                cookieAuthenticationOptions.SlidingExpiration = true;
                cookieAuthenticationOptions.AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie;
                cookieAuthenticationOptions.LoginPath = new PathString("/");
                cookieAuthenticationOptions.Provider = new CookieAuthenticationProvider
                {
                    OnApplyRedirect = ctx =>
                    {
                        if (!IsAjaxRequest(ctx.Request) && !IsApiRequest(ctx.Request))
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                    }
                };

                cookieAuthenticationOptions.CookieName = "authentication";
                SetCookieFormatter(cookieAuthenticationOptions);
                app.UseCookieAuthentication(cookieAuthenticationOptions);
            };

            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);
        }


        private static void SetCookieFormatter(CookieAuthenticationOptions cookieAuthenticationOptions)
        {
            if (ConfigurationManager.AppSettings["UseJwtAuthCookie"] == "true")
            {
                int parsedDays = 0;
                if (!int.TryParse(ConfigurationManager.AppSettings["Jwt.ExpirationDays"], out parsedDays))
                {
                    parsedDays = 30;
                }
                string _jwtSecret;
                TokenValidationParameters tokenParams;
                SetTokenValidationParameters(out _jwtSecret, out tokenParams);
                cookieAuthenticationOptions.TicketDataFormat = new AppJwtFormat(tokenParams, _jwtSecret, parsedDays);
            }
        }

        private static void SetTokenValidationParameters(out string _jwtSecret, out TokenValidationParameters tokenparams)
        {
            string _appDomain = ConfigurationManager.AppSettings["Security.AppDomain"];
            _jwtSecret = ConfigurationManager.AppSettings["Jwt.Secret"];
            tokenparams = new TokenValidationParameters
            {
                IssuerSigningKey = _jwtSecret.ToSymmetricSecurityKey(),
                ValidIssuer = _appDomain,
                ValidAudience = _appDomain,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(0),
                RequireExpirationTime = true
            };
        }

        private static bool IsAjaxRequest(IOwinRequest request)
        {
            IReadableStringCollection query = request.Query;
            if ((query != null) && (query["X-Requested-With"] == "XMLHttpRequest"))
            {
                return true;
            }
            IHeaderDictionary headers = request.Headers;
            return ((headers != null) && (headers["X-Requested-With"] == "XMLHttpRequest"));
        }

        private static bool IsApiRequest(IOwinRequest request)
        {
            string apiPath = VirtualPathUtility.ToAbsolute("~/api/");
            return request.Uri.LocalPath.StartsWith(apiPath);
        }
        //public void ConfigureOAuth(IAppBuilder app)
        //{
        //    OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
        //    {
        //        AllowInsecureHttp = true,
        //        TokenEndpointPath = new PathString("/token"),
        //        AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
        //        Provider = new SimpleAuthorizationServerProvider()
        //    };

        //    // Token Generation
        //    app.UseOAuthAuthorizationServer(OAuthServerOptions);
        //    app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        //}
    }
}
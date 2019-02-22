using System.Security.Claims;
using PortfolioWebApi.Models.Domain;

namespace PortfolioWebApi.Services
{
    public interface IJwtAuthService
    {
        UserBase GetCurrentUser();
        int GetCurrentUserid();
        bool IsLoggedIn();
        void LogIn(UserBase user, params Claim[] extraCalims);
        void LogOut();
    }
}
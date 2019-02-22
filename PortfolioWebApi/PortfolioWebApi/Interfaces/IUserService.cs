using PortfolioWebApi.Models.Domain;
using PortfolioWebApi.Models.Request;
using PortfolioWebApi.Models.Request.Users;

namespace PortfolioWebApi.Services
{
    public interface IUserService
    {
        int AddUser(AddUserRequest data);
        bool LogIn(UserLogInRequest user);
        UserBase Get(string email, string password);
        void LogOut();
    }
}
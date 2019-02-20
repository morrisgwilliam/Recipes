using PortfolioWebApi.Models.Request;

namespace PortfolioWebApi.Services
{
    public interface IUserService
    {
        int AddUser(AddUserRequest data);
    }
}
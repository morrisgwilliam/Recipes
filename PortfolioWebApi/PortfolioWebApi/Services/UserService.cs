using Microsoft.AspNet.Identity;
using PortfolioWebApi.Models.Domain;
using PortfolioWebApi.Models.Request;
using PortfolioWebApi.Models.Request.Users;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using PortfolioWebApi.Services;

namespace PortfolioWebApi.Services
{
    public class UserService : IUserService
    {
        private IJwtAuthService _authenticationService;

        public UserService(IJwtAuthService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        public int AddUser(AddUserRequest data)
        {
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.AddUser";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);
                cmd.Parameters.AddWithValue("@Email", data.Email);
                cmd.Parameters.AddWithValue("@Password", encryptedPassword);
                cmd.Parameters.AddWithValue("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
                return (int)cmd.Parameters["@Id"].Value;
            }

        }

        public bool LogIn(UserLogInRequest user)
        {
            bool isSuccessful = false;
            UserBase response = Get(user.EmailAddress, user.Password);
            if (response != null)
            {
                _authenticationService.LogIn(response);
                isSuccessful = true;
            }
            return isSuccessful;
        }

        public UserBase Get(string email, string password)
        {
            UserBase authUser = null;
            List<string> roles = null;
        }

        // Helper method to create and open a DB connection
        private SqlConnection GetConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            conn.Open();
            return conn;
        }


    }
}
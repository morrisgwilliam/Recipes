using PortfolioWebApi.Models.Request;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PortfolioWebApi.Services
{
    public class UserService : IUserService
    {
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

        // Helper method to create and open a DB connection
        private SqlConnection GetConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Default"].ConnectionString);
            conn.Open();
            return conn;
        }
    }
}
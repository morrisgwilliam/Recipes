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
    public class RecipeService
    {

        public int AddRecipe(AddRecipeRequest data)
        {
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.InsertUserRecipe";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", data.UserId);
                cmd.Parameters.AddWithValue("@Title", data.Title);
                //cmd.Parameters.AddWithValue("@Steps", SqlDbType.Structured);
                var steps = new SqlParameter("@Steps", SqlDbType.Structured);
                if (data.Steps.Any())
                {
                    steps.Value = new Data.Structured.NVarCharTable(data.Steps);
                };
                cmd.Parameters.Add(steps);
                return cmd.ExecuteNonQuery();

            }
        }
        private SqlConnection GetConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            conn.Open();
            return conn;
        }
    }
}
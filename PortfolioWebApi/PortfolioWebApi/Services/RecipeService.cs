using PortfolioWebApi.Models;
using PortfolioWebApi.Models.Domain;
using PortfolioWebApi.Models.Request;
using PortfolioWebApi.Models.Request.Recipes;
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
        public int Delete(int recipeId, int userId)
        {
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.DeleteRecipe";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected;
            }
        }

        public int AddRecipe(AddRecipeRequest data)
        {
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.InsertUserRecipe";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", data.UserId);
                cmd.Parameters.AddWithValue("@Title", data.Title);
                var steps = new SqlParameter("@Steps", SqlDbType.Structured);
                if (data.Steps.Any())
                {
                    steps.Value = new Data.Structured.NVarCharTable(data.Steps);
                };
                cmd.Parameters.Add(steps);
                return cmd.ExecuteNonQuery();

            }
        }

        public Paged<Recipe> Get(int userId, int pageIndex, int pageSize, string query)
        {
            var recipes = new List<Recipe>();
            var instructionsDictionary = new Dictionary<int, List<Instruction>>();
            int totalCount = 0;
            
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                // check name of stored procedure
                cmd.CommandText = "dbo.GetUserRecipes";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageSize", pageSize);
                cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
                cmd.Parameters.AddWithValue("@Query", query);
                cmd.Parameters.AddWithValue("@UserId", userId);

                using (var reader = cmd.ExecuteReader())
                {
                    
                    // Check the domain model for all props sql metadata returned from selection
                    while (reader.Read())
                    {
                        var recipe = new Recipe();
                        recipe.RecipeId = (int)reader["RecipeId"];
                        recipe.Title = (string)reader["Title"];
                        recipes.Add(recipe);
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        var instruction = new Instruction();
                        int recipeId = (int)reader["RecipeId"];
                        instruction.StepId = (int)reader["StepId"];
                        instruction.Step = (string)reader["Instructions"];
                        if (instructionsDictionary.ContainsKey(recipeId))
                        {
                            instructionsDictionary[recipeId].Add(instruction);
                        }
                        else
                        {
                            var instructions = new List<Instruction>();
                            instructions.Add(instruction);
                            instructionsDictionary.Add(recipeId,instructions);
                        }
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        totalCount = (int)reader["TotalCount"];
                    }
                }      
            }
            // Matches up the dictionary of instructions with the recipes in the list.
            //Necessary because we are getting multiple record sets from sql
            //since one recipe has many steps!
            for (int i = 0; i < recipes.Count; i++)
            {
                if (instructionsDictionary.ContainsKey(recipes[i].RecipeId))
                {
                    recipes[i].Instructions = instructionsDictionary[recipes[i].RecipeId];
                }
            }
            var pagedRecipes = new Paged<Recipe>(recipes, pageIndex, pageSize, totalCount);
            return pagedRecipes;
        }
        private SqlConnection GetConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            conn.Open();
            return conn;
        }
    }
}
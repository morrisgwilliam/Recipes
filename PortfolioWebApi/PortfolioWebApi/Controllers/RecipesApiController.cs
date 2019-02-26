using PortfolioWebApi.Models;
using PortfolioWebApi.Models.Domain;
using PortfolioWebApi.Models.Request;
using PortfolioWebApi.Models.Request.Recipes;
using PortfolioWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PortfolioWebApi.Controllers
{
    [RoutePrefix("api/recipes")]
    public class RecipesApiController : ApiController
    {
        RecipeService _service;
        public RecipesApiController(RecipeService service)
        {
            _service = service;
        }
        [Route, HttpPost]
        public HttpResponseMessage Add(AddRecipeRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int rowsAffected = _service.AddRecipe(model);
            if (rowsAffected > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, rowsAffected);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
        }
        [Route, HttpGet]
        public HttpResponseMessage GetUserRecipes(int userId, int pageIndex, int pageSize = 5, string query = null)
        {
            if (userId == 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "UserId query parameter is required");
            }
            Paged<Recipe> pagedRecipes = _service.Get(userId, pageIndex, pageSize, query);
            return Request.CreateResponse(HttpStatusCode.OK, pagedRecipes);
        }
        [Route("{recipeId}"), HttpDelete]
        public HttpResponseMessage Delete(int recipeId, int userId)
        {
            if(recipeId == 0 || userId == 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Must provide a recipe Id and a user Id");
            }
            int rowsAffected = _service.Delete(recipeId, userId);
            return Request.CreateResponse(HttpStatusCode.OK, rowsAffected);
        }
    }
}

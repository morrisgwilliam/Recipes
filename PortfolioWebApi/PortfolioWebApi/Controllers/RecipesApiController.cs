using PortfolioWebApi.Models.Request;
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
    }
}

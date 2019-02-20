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
    [RoutePrefix("api/user")]
    public class UserApiController : ApiController
    {
        IUserService _service;
        public UserApiController(IUserService service)
        {
            _service = service;
        }

        [Route, HttpPost]
        public HttpResponseMessage Add(AddUserRequest model)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int Id = _service.AddUser(model);
            return Request.CreateResponse(HttpStatusCode.OK, Id);


        }
    }
}

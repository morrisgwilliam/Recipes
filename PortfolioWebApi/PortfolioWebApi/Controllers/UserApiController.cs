using Microsoft.AspNet.Identity;
using PortfolioWebApi.Models.Request;
using PortfolioWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PortfolioWebApi.Controllers
{
    [RoutePrefix("api/user")]
    public class UserApiController : ApiController
    {
        //IUserService _service;
        AuthService _authService;
        public UserApiController()
        {
            //_service = service;
            _authService = new AuthService();
        }

        [AllowAnonymous]
        [Route("register"), HttpPost]
        public async Task<IHttpActionResult> Register(AddUserRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _authService.RegisterUser(model);
            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        //[Route, HttpPost]
        //public HttpResponseMessage Add(AddUserRequest model)
        //{

        //    if (!ModelState.IsValid)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //    }
        //    int Id = _service.AddUser(model);
        //    return Request.CreateResponse(HttpStatusCode.OK, Id);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _authService.Dispose();
            }
            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
                if (ModelState.IsValid)
                {
                    return BadRequest();
                }
                return BadRequest(ModelState);
            }
            return null;
        }
    }
}

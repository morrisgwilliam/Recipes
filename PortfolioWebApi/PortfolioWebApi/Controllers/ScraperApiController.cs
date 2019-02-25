using PortfolioWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PortfolioWebApi.Controllers
{
    [RoutePrefix("api/scraper")]
    public class ScraperApiController : ApiController
    {
        ScraperServices _service;
        public ScraperApiController (ScraperServices service)
        {
            _service = service;
        }

        [Route, HttpGet]
        public HttpResponseMessage Get()
        {
            var response = _service.Scrape();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}

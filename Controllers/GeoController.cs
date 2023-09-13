using ListingLand.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ListingLand.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class GeoController : Controller
    {
        private ListingLandContext _db;
        public GeoController(ListingLandContext db)
        {
            _db = db;

        }

        [HttpGet]
        [Route("countries")]
        public ActionResult Countries()
        {

            var lst = _db.Countries.Select(c => new ViewModels.Country()
            {
                ID = c.Id,
                Name = c.Name
            }).ToList();

            return Ok(lst);
        }

        [HttpPost]
        [Route("regions")]
        public ActionResult Regions([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParams)
        {
            var countryid = Int32.Parse(userParams.GetProperty("countryid").ToString());
            var lst = _db.Regions
                .Where(r => r.CountryId == countryid)
                .Select(c => new ViewModels.Region()
                {
                    ID = c.Id,
                    Name = c.Name
                }).ToList();

            return Ok(lst);
        }

        [HttpPost]
        [Route("cities")]
        public ActionResult Cities([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParams)
        {
            var regionid = Int32.Parse(userParams.GetProperty("regionid").ToString());
            var cityname = userParams.GetProperty("cityname").ToString();
            var lst = new List<ViewModels.City>();
            try
            {
                lst = _db.Cities.Where(c =>
                               c.RegionId == regionid &&
                               c.Name.StartsWith(cityname))
                       .Select(c => new ViewModels.City()
                       {
                           ID = c.Id,
                           Name = c.Name
                       }).ToList();

            }
            catch (Exception)
            {


            }

            return Ok(lst);
        }

    }
}

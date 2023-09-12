using ListingLand.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using System;
using static System.Collections.Specialized.BitVector32;

namespace ListingLand.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class ListingController : Controller
    {
        private ListingLandContext _db;
        public ListingController(ListingLandContext db)
        {
            _db = db;

        }
        
        [HttpGet]
        [Route("getnewlisting")]
        public IActionResult NewListing()
        {
            var lst = new List<ViewModels.Listing>();
            
            try
            {
                lst = (from a in _db.Attributes
                       join s in _db.AttributeSections
                       on a.Id equals s.AttributeId
                       join t in _db.AttributeTypes on a.Type equals t.Id
                       join se in _db.Sections on s.SectionId equals se.Id
                       orderby t.Id
                       select new ViewModels.Listing()
                       {
                           AttributeID = a.Id,
                           Attributename = a.Name ?? string.Empty,
                           TypeID = t.Id,
                           AttributeType = t.Name ?? string.Empty,
                           sectionID = se.Id,
                           SectionName = se.Name ?? string.Empty
                       })
                         .ToList();

                //if there are attribute values for that specefic attribute
                lst.ForEach(attribute =>
                {
                    attribute.AttributeValues =
                    _db.AttributeValues
                    .Where(a => a.AttributeId == attribute.AttributeID)
                    .Select(a => new ViewModels.AttributeValue()
                    {
                        ID = a.Id,
                        AttributeID = a.AttributeId ?? 0,
                        Value = a.Value ?? string.Empty
                    })
                    .ToList();
                });

            }
            catch (Exception exc)
            {

                return BadRequest(exc.Message);
            }

            return Ok(lst);
        }

        [HttpPost]
        [Route("createlisting")]
        public IActionResult CreateListing([FromBody] System.Text.Json.JsonElement param)
        {
            var vm = JsonConvert.DeserializeObject<List<ViewModels.Listing>>(param.GetProperty("vm").ToString());

            return Ok(vm);
        }
    }
}

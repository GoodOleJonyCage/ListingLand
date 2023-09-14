using ListingLand.Models;
using ListingLand.ViewModels;
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

        private ViewModels.Listing InitializeListing()
        {
            var listing = new ViewModels.Listing();
            
            var lst = new List<ViewModels.Attribute>();
            
            #region Features
            lst = (from a in _db.Attributes
                   join s in _db.AttributeSections
                   on a.Id equals s.AttributeId
                   join t in _db.AttributeTypes on a.Type equals t.Id
                   join se in _db.Sections on s.SectionId equals se.Id
                   orderby t.Id
                   where se.Id == (int)ListingLand.ViewModels.Section.Features
                   select new ViewModels.Attribute()
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
            listing.Features = lst;
            #endregion

            #region Quick Summary
            lst = (from a in _db.Attributes
                   join s in _db.AttributeSections
                   on a.Id equals s.AttributeId
                   join t in _db.AttributeTypes on a.Type equals t.Id
                   join se in _db.Sections on s.SectionId equals se.Id
                   orderby t.Id
                   where se.Id == (int)ListingLand.ViewModels.Section.QuickSummary
                   select new ViewModels.Attribute()
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
            listing.QuickSummary = lst;
            #endregion

            #region Quick Description
            lst = (from a in _db.Attributes
                   join s in _db.AttributeSections
                   on a.Id equals s.AttributeId
                   join t in _db.AttributeTypes on a.Type equals t.Id
                   join se in _db.Sections on s.SectionId equals se.Id
                   orderby t.Id
                   where se.Id == (int)ListingLand.ViewModels.Section.Description
                   select new ViewModels.Attribute()
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
            listing.Description = lst;
            #endregion

            return listing;
        }

        [HttpGet]
        [Route("getnewlisting")]
        public IActionResult NewListing()
        {
            var listing = new ViewModels.Listing();
            
            try
            {
                listing = InitializeListing();
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(listing);
        }

        [HttpPost]
        [Route("createlisting")]
        public IActionResult CreateListing([FromBody] System.Text.Json.JsonElement param)
        {
            var vm = JsonConvert.DeserializeObject<ViewModels.Listing>(param.GetProperty("vm").ToString());
            bool hasErrors = false;

            if (vm is not null)
            {
                #region clear errors
                vm.NameError = vm.FeatureError = vm.LocationError = string.Empty;
                vm?.QuickSummary.ForEach(a =>
                {
                    a.ErrorMessage = string.Empty;
                });
                vm?.Features.ForEach(a =>
                {
                    a.ErrorMessage = string.Empty;
                });
                vm?.Description.ForEach(d =>
                {
                    d.ErrorMessage = string.Empty;
                });

                if (string.IsNullOrEmpty(vm?.Name))
                {
                    hasErrors = true;
                    vm.NameError = "Name Required";
                }

                if (vm.Location.Country.ID == 0 ||
                    vm.Location.Region.ID == 0 ||
                    vm.Location.City.ID == 0
                    )
                {
                    hasErrors = true;
                    vm.LocationError = "Location Required";
                }
                #endregion

                #region validation

                vm?.QuickSummary.ForEach(a =>
                {
                    if (a.TypeID == (int)ViewModels.AttributeType.OpenText &&
                        string.IsNullOrEmpty(a.TextValue))
                    {
                        hasErrors = true;
                        a.ErrorMessage = $"Value required for {a.Attributename}";
                    }

                    if (a.TypeID == (int)ViewModels.AttributeType.CheckBox)
                    {
                        if (a.AttributeValues.Count > 0)
                        {
                            if (a.AttributeValues.All(at => at.Selected is false))
                            {
                                hasErrors = true;
                                a.ErrorMessage = $"Value required for {a.Attributename}";
                            }
                        }
                        else
                        {
                            if (a.Selected is false)
                            {
                                hasErrors = true;
                                a.ErrorMessage = $"Value required for {a.Attributename}";
                            }
                        }
                    }

                });

                if (vm.Features.All(f => f.Selected is false))
                {
                    hasErrors = true;
                    vm.FeatureError = "Value required for Features";
                }

                vm?.Description.ForEach(d =>
                {
                    if (d.TypeID == (int)ViewModels.AttributeType.OpenText &&
                        string.IsNullOrEmpty(d.TextValue))
                    {
                        hasErrors = true;
                        d.ErrorMessage = $"Value required for {d.Attributename}";
                    }
                });

                #endregion 

                try
                {
                    if (!hasErrors)
                    {
                        #region save listing
                        var newlisting = _db.Listings.Add(new Models.Listing()
                        {
                            Name = vm?.Name,
                            CountryId = vm?.Location.Country.ID,
                            RegionId = vm?.Location.Region.ID,
                            CityId = vm?.Location.City.ID,
                        });
                        _db.SaveChanges();
                        #endregion

                        #region save listing attributes
                        List<ListingAttribute> lstAttrbites = new List<ListingAttribute>();

                        #region Quick Summary
                        vm?.QuickSummary.ForEach(a =>
                        {
                            if (a.TypeID == (int)ViewModels.AttributeType.OpenText)
                            {
                                lstAttrbites.Add(new ListingAttribute()
                                {
                                    ListingId = newlisting.Entity.Id,
                                    AttributeId = a.AttributeID,
                                    ValueText = a.TextValue
                                });
                            }

                            if (a.TypeID == (int)ViewModels.AttributeType.CheckBox)
                            {
                                if (a.AttributeValues.Count > 0)
                                {
                                    a.AttributeValues.Where(at => at.Selected is true).ToList()
                                    .ForEach(at =>
                                    {
                                        lstAttrbites.Add(new ListingAttribute()
                                        {
                                            ListingId = newlisting.Entity.Id,
                                            AttributeId = at.AttributeID,
                                            AttributeValueId = at.ID
                                        });
                                    });
                                }
                            }
                        });
                        #endregion

                        #region Features
                        vm?.Features.Where(f => f.Selected is true).ToList()
                        .ForEach(at =>
                        {
                            lstAttrbites.Add(new ListingAttribute()
                            {
                                ListingId = newlisting.Entity.Id,
                                AttributeId = at.AttributeID,
                            });
                        });
                        #endregion

                        #region Descriptions
                        vm?.Description.ForEach(at =>
                        {
                            lstAttrbites.Add(new ListingAttribute()
                            {
                                ListingId = newlisting.Entity.Id,
                                AttributeId = at.AttributeID,
                                ValueText = at.TextValue
                            });
                        });
                        #endregion

                        _db.ListingAttributes.AddRange(lstAttrbites);
                        _db.SaveChanges();

                        #endregion 

                        //reinitialize after db save 
                        vm = InitializeListing();
                        vm.IsValid = true;
                    }
                    else
                    {
                        vm.IsValid = false;
                    }
                }
                catch (Exception exc)
                {
                    return BadRequest(exc.Message);
                }
            }
            return Ok(vm);
        }
    }
}

using ListingLand.Helpers;
using ListingLand.Models;
using ListingLand.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using static System.Collections.Specialized.BitVector32;
using Location = ListingLand.ViewModels.Location;

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

        private List<ViewModels.Listing> LoadListings(ViewModels.Search vm)
        {
            var listings = new List<ViewModels.Listing>();
          
            var lst = (from l in _db.Listings
                       join c in _db.Countries on l.CountryId equals c.Id
                       join r in _db.Regions on l.RegionId equals r.Id
                       join ci in _db.Cities on l.CityId equals ci.Id
                       select new { l, c, r, ci }).ToList();

            if (vm.MinGarages > -1)
                lst = lst.Where(l => l.l.Garages >= vm.MinGarages).ToList();

            if (vm.MinBaths > -1 )
                lst = lst.Where(l => l.l.Bathrooms >= vm.MinBaths).ToList();

            if (vm.MinBedrooms > -1 )
                lst = lst.Where(l => l.l.Bedrooms >= vm.MinBedrooms).ToList();

            if (vm.MinOfficeRooms > -1)
                lst = lst.Where(l => l.l.OfficeRooms >= vm.MinOfficeRooms).ToList();

            lst = lst.Where(l => l.l.Price >= vm.PriceFrom && l.l.Price <= vm.PriceTo).ToList();

            if (!string.IsNullOrEmpty(vm.AreaTo) && !string.IsNullOrEmpty(vm.AreaFrom))
                lst = lst.Where(l => l.l.Area >= Int32.Parse(vm.AreaFrom) && l.l.Area <= Int32.Parse(vm.AreaTo)).ToList();

            if (!string.IsNullOrEmpty(vm.Name))
                lst = lst.Where(l => l.l.Name.Contains(vm.Name)).ToList();

            if(vm.FrontYard > -1)
            {
                bool hasFrontYard = vm.FrontYard == 1;
                lst = lst.Where(l => l.l.Frontyard.Value == hasFrontYard).ToList();
             }
            if (vm.BackYard > -1)
            {
                bool hasBackYard = vm.BackYard == 1;
                lst = lst.Where(l => l.l.Backyard.Value == hasBackYard).ToList();
            }

            //location
            if(vm.Location.Country.ID > 0 )
                lst = lst.Where(c => c.c.Id == vm.Location.Country.ID).ToList();

            if (vm.Location.Region.ID > 0)
                lst = lst.Where(r => r.r.Id == vm.Location.Region.ID).ToList();

            if (vm.Location.City.ID > 0)
                lst = lst.Where(ci => ci.ci.Id == vm.Location.City.ID).ToList();

            lst.ForEach(listingEntry =>
            {
                var listing = new ViewModels.Listing();

                listing.ListingID = listingEntry.l.Id;
                listing.PostedOn = listingEntry.l.PostedOn;
                listing.PostedOnStr = listingEntry.l.PostedOn.Value.ToString("dd MMM yyyy hh:mm:ss:tt");
                listing.DaysAgo = (int)(DateTime.Now - listingEntry.l.PostedOn.Value).TotalDays;
                listing.Name = listingEntry.l.Name;
                listing.Location.Country.Name = listingEntry.c.Name;
                listing.Location.Region.Name = listingEntry.r.Name;
                listing.Location.City.Name = listingEntry.ci.Name;
                listing.Location.Country.ID = listingEntry.c.Id;
                listing.Location.Region.ID = listingEntry.r.Id;
                listing.Location.City.ID = listingEntry.ci.Id;
                listing.Price = (listingEntry.l.Price ?? 0).ToString();
                listing.Area = (listingEntry.l.Area ?? 0).ToString();
                listing.Bedrooms = (listingEntry.l.Bedrooms ?? 0).ToString();
                listing.Bathrooms = ((listingEntry.l.Bathrooms ?? 0).ToString());
                listing.OfficeRooms = (listingEntry.l.OfficeRooms ?? 0).ToString();
                listing.Garages = (listingEntry.l.Garages ?? 0).ToString();
                listing.Backyard = listingEntry.l.Backyard ?? false;
                listing.Frontyard = listingEntry.l.Frontyard ?? false;

                listing.Images = _db.ListingPics.Where(l => l.ListingId == listing.ListingID)
                .Select(l => new ListingImage()
                {
                    ImageSrc = Helpers.Db_Image_Helper.Get_Db_Image(l.Pic)

                }).ToList();

                listings.Add(listing);

            });

            return listings;
        }

        private List<ViewModels.Listing> LoadListings()
        {
            var listings = new List<ViewModels.Listing>();

            var  lst = (from l in _db.Listings
                            join c in _db.Countries on l.CountryId equals c.Id
                            join r in _db.Regions on l.RegionId equals r.Id
                            join ci in _db.Cities on l.CityId equals ci.Id
                            select new { l, c, r, ci }).ToList();

            lst.ForEach(listingEntry =>
            {
                var listing = new ViewModels.Listing();
                
                listing.ListingID = listingEntry.l.Id;
                listing.PostedOn = listingEntry.l.PostedOn;
                listing.PostedOnStr = listingEntry.l.PostedOn.Value.ToString("dd MMM yyyy hh:mm:ss:tt");
                listing.DaysAgo = (int)(DateTime.Now - listingEntry.l.PostedOn.Value).TotalDays;
                listing.Name = listingEntry.l.Name;
                listing.Location.Country.Name = listingEntry.c.Name;
                listing.Location.Region.Name = listingEntry.r.Name;
                listing.Location.City.Name = listingEntry.ci.Name;
                listing.Location.Country.ID = listingEntry.c.Id;
                listing.Location.Region.ID = listingEntry.r.Id;
                listing.Location.City.ID = listingEntry.ci.Id;
                listing.Price = (listingEntry.l.Price ?? 0).ToString();
                listing.Area = (listingEntry.l.Area ?? 0).ToString();
                listing.Bedrooms = (listingEntry.l.Bedrooms ?? 0).ToString();
                listing.Bathrooms = ((listingEntry.l.Bathrooms ?? 0).ToString());
                listing.OfficeRooms = (listingEntry.l.OfficeRooms ?? 0).ToString();
                listing.Garages = (listingEntry.l.Garages ?? 0).ToString();
                listing.Backyard = listingEntry.l.Backyard ?? false;
                listing.Frontyard = listingEntry.l.Frontyard ?? false;
                
                listing.Images = _db.ListingPics.Where(l => l.ListingId == listing.ListingID)
                .Select(l => new ListingImage()
                {
                    ImageSrc = Helpers.Db_Image_Helper.Get_Db_Image(l.Pic)

                }).ToList();

                listings.Add(listing);

            });

            return listings;
        }

        private List<ViewModels.Listing> LoadListings(int userID)
        {
            var listings = new List<ViewModels.Listing>();

            var lst = (from l in _db.Listings
                       join c in _db.Countries on l.CountryId equals c.Id
                       join r in _db.Regions on l.RegionId equals r.Id
                       join ci in _db.Cities on l.CityId equals ci.Id
                       where l.PostedBy == userID
                       select new { l, c, r, ci }).ToList();

            lst.ForEach(listingEntry =>
            {
                var listing = new ViewModels.Listing();

                listing.ListingID = listingEntry.l.Id;
                listing.PostedOn = listingEntry.l.PostedOn;
                listing.PostedOnStr = listingEntry.l.PostedOn.Value.ToString("dd MMM yyyy hh:mm:ss:tt");
                listing.DaysAgo = (int)(DateTime.Now - listingEntry.l.PostedOn.Value).TotalDays;
                listing.Name = listingEntry.l.Name;
                listing.Location.Country.Name = listingEntry.c.Name;
                listing.Location.Region.Name = listingEntry.r.Name;
                listing.Location.City.Name = listingEntry.ci.Name;
                listing.Location.Country.ID = listingEntry.c.Id;
                listing.Location.Region.ID = listingEntry.r.Id;
                listing.Location.City.ID = listingEntry.ci.Id;
                listing.Price = (listingEntry.l.Price ?? 0).ToString();
                listing.Area = (listingEntry.l.Area ?? 0).ToString();
                listing.Bedrooms = (listingEntry.l.Bedrooms ?? 0).ToString();
                listing.Bathrooms = ((listingEntry.l.Bathrooms ?? 0).ToString());
                listing.OfficeRooms = (listingEntry.l.OfficeRooms ?? 0).ToString();
                listing.Garages = (listingEntry.l.Garages ?? 0).ToString();
                listing.Backyard = listingEntry.l.Backyard ?? false;
                listing.Frontyard = listingEntry.l.Frontyard ?? false;

                listing.Images = _db.ListingPics.Where(l => l.ListingId == listing.ListingID)
                .Select(l => new ListingImage()
                {
                    ImageSrc = Helpers.Db_Image_Helper.Get_Db_Image(l.Pic)

                }).ToList();

                listings.Add(listing);

            });

            return listings;
        }

        private ViewModels.Listing LoadListing(int listingId)
        {
            var listing = new ViewModels.Listing();
            listing.ListingID = listingId;

            listing.Images = _db.ListingPics.Where(l => l.ListingId == listingId)
                .Select(l => new ListingImage()
                {
                    ImageSrc = Helpers.Db_Image_Helper.Get_Db_Image(l.Pic)

                }).ToList();

            //listing.Images.AddRange(listing.Images);

            var lst = new List<ViewModels.Attribute>();

            var listingEntry = (from l in _db.Listings join c in _db.Countries on l.CountryId equals c.Id
                                join r in _db.Regions on l.RegionId equals r.Id
                                join ci in _db.Cities on l.CityId equals ci.Id
                                where l.Id == listingId
                                select new { l,c,r,ci }).SingleOrDefault();
           
            if (listingEntry != null)
            {
                listing.Name = listingEntry.l.Name;
                listing.PostedOn = listingEntry.l.PostedOn;
                listing.PostedOnStr = listingEntry.l.PostedOn.Value.ToString("dd MMM yyyy hh:mm:ss:tt");
                listing.DaysAgo = (int)(DateTime.Now - listingEntry.l.PostedOn.Value).TotalDays;
                listing.PostedOn = listingEntry.l.PostedOn;
                listing.Location.Country.Name = listingEntry.c.Name;
                listing.Location.Region.Name = listingEntry.r.Name;
                listing.Location.City.Name = listingEntry.ci.Name;
                listing.Location.Country.ID = listingEntry.c.Id;
                listing.Location.Region.ID = listingEntry.r.Id;
                listing.Location.City.ID = listingEntry.ci.Id;
                listing.Price = (listingEntry.l.Price??0).ToString();
                listing.Area = (listingEntry.l.Area ?? 0).ToString();
                listing.Bedrooms = (listingEntry.l.Bedrooms ?? 0).ToString();
                listing.Bathrooms = ((listingEntry.l.Bathrooms ?? 0).ToString());
                listing.OfficeRooms = (listingEntry.l.OfficeRooms ?? 0).ToString();
                listing.Garages = (listingEntry.l.Garages ?? 0).ToString();
                listing.Backyard = listingEntry.l.Backyard??false;
                listing.Frontyard = listingEntry.l.Frontyard ?? false;
            }

            #region Features
            lst = (from a in _db.Attributes
                          join s in _db.AttributeSections
                       on a.Id equals s.AttributeId
                          join t in _db.AttributeTypes on a.Type equals t.Id
                          join se in _db.Sections on s.SectionId equals se.Id
                          join la in _db.ListingAttributes on a.Id equals la.AttributeId
                          orderby t.Id
                          where se.Id == (int)ListingLand.ViewModels.Section.Features
                       &&
                       la.ListingId == listingId
                          select new ViewModels.Attribute()
                          {
                              AttributeID = a.Id,
                              Attributename = a.Name ?? string.Empty,
                              TypeID = t.Id,
                              AttributeType = t.Name ?? string.Empty,
                              sectionID = se.Id,
                              SectionName = se.Name ?? string.Empty,
                              Selected = true,
                              TextValue = la.ValueText ?? string.Empty
                          })
                        .ToList();

            lst = lst.DistinctBy(a => a.AttributeID).ToList();
            //if there are attribute values for that specefic attribute
            lst.ForEach(attribute =>
            {
                //get all attributes values 
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

                //get attribute values selected
                var lstAttributesSelected = (from a in _db.AttributeValues
                                             join la in _db.ListingAttributes on a.Id equals la.AttributeValueId
                                             where la.ListingId == listingId &&
                                                   a.AttributeId == attribute.AttributeID
                                             select new ViewModels.AttributeValue()
                                             {
                                                 ID = a.Id,
                                                 AttributeID = a.AttributeId ?? 0,
                                                 Value = a.Value ?? string.Empty

                                             }).ToList();


                //check attributes selected 
                attribute.AttributeValues.ForEach(a =>
                {
                    var attrbselected = lstAttributesSelected.Where(asel => asel.ID == a.ID).SingleOrDefault();
                    if (attrbselected != null)
                        a.Selected = true;
                });
            });
            listing.Features = lst;
            #endregion

            #region Quick Summary
            lst = (from a in _db.Attributes
                   join s in _db.AttributeSections
                   on a.Id equals s.AttributeId
                   join t in _db.AttributeTypes on a.Type equals t.Id
                   join se in _db.Sections on s.SectionId equals se.Id
                   join la in _db.ListingAttributes on a.Id equals la.AttributeId
                   orderby t.Id
                   where se.Id == (int)ListingLand.ViewModels.Section.QuickSummary
                   &&
                   la.ListingId == listingId 
                   select new ViewModels.Attribute()
                   {
                       AttributeID = a.Id,
                       Attributename = a.Name ?? string.Empty,
                       TypeID = t.Id,
                       AttributeType = t.Name ?? string.Empty,
                       sectionID = se.Id,
                       SectionName = se.Name ?? string.Empty,
                       Selected = true,
                       TextValue = la.ValueText??string.Empty
                   })
                     .ToList();
           
            lst = lst.DistinctBy(a => a.AttributeID).ToList();
            //if there are attribute values for that specefic attribute
            lst.ForEach(attribute =>
            {
                //get all attributes values 
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
                
                //get attribute values selected
                var lstAttributesSelected = (from a in _db.AttributeValues
                                             join la in _db.ListingAttributes on a.Id equals la.AttributeValueId
                                             where la.ListingId == listingId &&
                                                   a.AttributeId == attribute.AttributeID
                                             select new ViewModels.AttributeValue()
                                             {
                                                 ID = a.Id,
                                                 AttributeID = a.AttributeId ?? 0,
                                                 Value = a.Value ?? string.Empty

                                             }).ToList();

                //check attributes selected 
                attribute.AttributeValues.ForEach(a =>
                {
                    var attrbselected = lstAttributesSelected.Where(asel => asel.ID == a.ID).SingleOrDefault();
                    if (attrbselected != null)
                        a.Selected = true;
                });
            });
            listing.QuickSummary = lst;
            #endregion

            #region Quick Description
            lst = (from a in _db.Attributes
                   join s in _db.AttributeSections
                   on a.Id equals s.AttributeId
                   join t in _db.AttributeTypes on a.Type equals t.Id
                   join se in _db.Sections on s.SectionId equals se.Id
                   join la in _db.ListingAttributes on a.Id equals la.AttributeId
                   orderby t.Id
                   where se.Id == (int)ListingLand.ViewModels.Section.Description
                   &&
                   la.ListingId == listingId
                   select new ViewModels.Attribute()
                   {
                       AttributeID = a.Id,
                       Attributename = a.Name ?? string.Empty,
                       TypeID = t.Id,
                       AttributeType = t.Name ?? string.Empty,
                       sectionID = se.Id,
                       SectionName = se.Name ?? string.Empty,
                       Selected = true,
                       TextValue = la.ValueText ?? string.Empty
                   })
                     .ToList();
           
            lst = lst.DistinctBy(a => a.AttributeID).ToList();
            //if there are attribute values for that specefic attribute
            lst.ForEach(attribute =>
            {
                attribute.AttributeValues = (from a in _db.AttributeValues
                                             join la in _db.ListingAttributes on a.Id equals la.AttributeValueId
                                             where la.ListingId == listingId &&
                                                   a.AttributeId == attribute.AttributeID 
                                             select new ViewModels.AttributeValue()
                                             {
                                                 AttributeID = a.AttributeId ?? 0,
                                                 Value = a.Value ?? string.Empty

                                             }).ToList();
            });
            listing.Description = lst;
            #endregion

            return listing;
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

        private int GetUserID(string username)
        {
           var user =  _db.Agents.Where(a => a.Email == username).SingleOrDefault();
            if (user != null)
                return user.Id;
            else
                throw new Exception("User Not found");
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
                vm.PriceError = string.Empty;
                vm.AreaError = string.Empty;
                vm.BedroomsError = string.Empty;
                vm.BathroomsError = string.Empty;
                vm.OfficeRoomsError = string.Empty;
                vm.GaragesError = string.Empty;
                vm.BackyardError = string.Empty;
                vm.FrontyardError   = string.Empty;

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

                #endregion

                #region validation
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
                int result = 0;
                if (string.IsNullOrEmpty(vm.Price) || !Int32.TryParse(vm.Price, out result))
                {
                    hasErrors = true;
                    vm.PriceError = "Value required for Price";
                }
                if (string.IsNullOrEmpty(vm.Area) || !Int32.TryParse(vm.Area, out result) )
                {
                    hasErrors = true;
                    vm.AreaError = "Value required for Area";
                }
                if (string.IsNullOrEmpty(vm.Bedrooms) || !Int32.TryParse(vm.Bedrooms, out result))
                {
                    hasErrors = true;
                    vm.BedroomsError = "Value required for Bedrooms";
                }
                if (string.IsNullOrEmpty(vm.Bathrooms) || !Int32.TryParse(vm.Bathrooms, out result))
                {
                    hasErrors = true;
                    vm.BathroomsError = "Value required for Bathrooms";
                }
                if (string.IsNullOrEmpty(vm.OfficeRooms) || !Int32.TryParse(vm.OfficeRooms, out result))
                {
                    hasErrors = true;
                    vm.OfficeRoomsError = "Value required for OfficeRooms";
                }
                if (string.IsNullOrEmpty(vm.Garages) || !Int32.TryParse(vm.Garages, out result))
                {
                    hasErrors = true;
                    vm.GaragesError = "Value required for Garages";
                }
           
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
                            Price = Int32.Parse(vm?.Price),
                            Area = Int32.Parse(vm?.Area),
                            Bedrooms = Int32.Parse(vm?.Bedrooms),
                            Bathrooms = Int32.Parse(vm?.Bathrooms),
                            OfficeRooms = Int32.Parse(vm?.OfficeRooms),
                            Garages = Int32.Parse(vm?.Garages),
                            Backyard = vm?.Backyard,
                            Frontyard = vm?.Frontyard,
                            PostedBy = GetUserID(vm.PostedBy)
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
                        vm.ListingID = newlisting.Entity.Id;
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

        [HttpPost]
        [Route("editlisting")]
        public IActionResult EditListing([FromBody] System.Text.Json.JsonElement param)
        {
            var vm = JsonConvert.DeserializeObject<ViewModels.Listing>(param.GetProperty("vm").ToString());
            bool hasErrors = false;

            if (vm is not null)
            {
                #region clear errors
                vm.NameError = vm.FeatureError = vm.LocationError = string.Empty;
                vm.PriceError = string.Empty;
                vm.AreaError = string.Empty;
                vm.BedroomsError = string.Empty;
                vm.BathroomsError = string.Empty;
                vm.OfficeRoomsError = string.Empty;
                vm.GaragesError = string.Empty;
                vm.BackyardError = string.Empty;
                vm.FrontyardError = string.Empty;

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

                #endregion

                #region validation
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
                int result = 0;
                if (string.IsNullOrEmpty(vm.Price) || !Int32.TryParse(vm.Price, out result))
                {
                    hasErrors = true;
                    vm.PriceError = "Value required for Price";
                }
                if (string.IsNullOrEmpty(vm.Area) || !Int32.TryParse(vm.Area, out result))
                {
                    hasErrors = true;
                    vm.AreaError = "Value required for Area";
                }
                if (string.IsNullOrEmpty(vm.Bedrooms) || !Int32.TryParse(vm.Bedrooms, out result))
                {
                    hasErrors = true;
                    vm.BedroomsError = "Value required for Bedrooms";
                }
                if (string.IsNullOrEmpty(vm.Bathrooms) || !Int32.TryParse(vm.Bathrooms, out result))
                {
                    hasErrors = true;
                    vm.BathroomsError = "Value required for Bathrooms";
                }
                if (string.IsNullOrEmpty(vm.OfficeRooms) || !Int32.TryParse(vm.OfficeRooms, out result))
                {
                    hasErrors = true;
                    vm.OfficeRoomsError = "Value required for OfficeRooms";
                }
                if (string.IsNullOrEmpty(vm.Garages) || !Int32.TryParse(vm.Garages, out result))
                {
                    hasErrors = true;
                    vm.GaragesError = "Value required for Garages";
                }

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
                        #region save edited listing

                        var listingtoEdit = _db.Listings.Where(l => l.Id == vm.ListingID).SingleOrDefault();
                        listingtoEdit.Name = vm?.Name;
                        listingtoEdit.CountryId = vm?.Location.Country.ID;
                        listingtoEdit.RegionId = vm?.Location.Region.ID;
                        listingtoEdit.CityId = vm?.Location.City.ID;
                        listingtoEdit.Price = Int32.Parse(vm?.Price);
                        listingtoEdit.Area = Int32.Parse(vm?.Area);
                        listingtoEdit.Bedrooms = Int32.Parse(vm?.Bedrooms);
                        listingtoEdit.Bathrooms = Int32.Parse(vm?.Bathrooms);
                        listingtoEdit.OfficeRooms = Int32.Parse(vm?.OfficeRooms);
                        listingtoEdit.Garages = Int32.Parse(vm?.Garages);
                        listingtoEdit.Backyard = vm?.Backyard;
                        listingtoEdit.Frontyard = vm?.Frontyard;

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
                                    ListingId = vm.ListingID,
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
                                            ListingId = vm.ListingID,
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
                                ListingId = vm.ListingID,
                                AttributeId = at.AttributeID,
                            });
                        });
                        #endregion

                        #region Descriptions
                        vm?.Description.ForEach(at =>
                        {
                            lstAttrbites.Add(new ListingAttribute()
                            {
                                ListingId = vm.ListingID,
                                AttributeId = at.AttributeID,
                                ValueText = at.TextValue
                            });
                        });
                        #endregion
                        
                        _db.ListingAttributes.RemoveRange(_db.ListingAttributes.Where(l => l.ListingId == vm.ListingID).ToList());
                        _db.ListingAttributes.AddRange(lstAttrbites);
                        _db.SaveChanges();

                        #endregion

                        //reinitialize after db save 
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

        [HttpPost]
        [Route("uploadfiles")]
        public ActionResult Upload(List<IFormFile> files)
        {
            var listingid = Int32.Parse(Request.Form["lsitingid"][0]);
           
            if (files != null)
            {
                if (files.Count == 0)
                    return BadRequest("No Image uploaded");

                try
                {
                    //validation
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            if (!file.IsImage())
                            {
                                return BadRequest("All files must be image files");
                            }
                        }
                    }

                    //clearing prev images
                    if (_db.ListingPics.Any(p => p.ListingId == listingid))
                    {
                        _db.ListingPics.RemoveRange(_db.ListingPics.Where(p => p.ListingId == listingid).ToList());
                    }
                    //save the file
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            #region add image to db
                            using (MemoryStream ms = new MemoryStream())
                            {
                                file.CopyTo(ms);
                                
                                _db.ListingPics.Add(new ListingPic()
                                {
                                    ListingId = listingid,
                                    Pic = ms.ToArray()
                               });

                               _db.SaveChanges();

                                ms.Close();
                                ms.Dispose();
                                 
                            }
                            #endregion
                        }
                    }
                }
                catch (Exception exc)
                {
                    return BadRequest(exc.Message);
                }

            }
            return Ok("Uploaded");
        }

        [HttpPost]
        [Route("getlisting")]
        public IActionResult GetListing([FromBody] System.Text.Json.JsonElement param)
        {
            int listingId = Int32.Parse(param.GetProperty("listingid").ToString());
            var listing = new ViewModels.Listing();

            try
            {
                listing = LoadListing(listingId);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(listing);
        }

        [HttpGet]
        [Route("getlistings")]
        public IActionResult GetListings()
        {
            var listings = new List<ViewModels.Listing>();

            try
            {
                listings = LoadListings();
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(listings);
        }

        [HttpPost]
        [Route("getlistingsbyuserid")]
        public IActionResult GetListingsByUserID([FromBody] System.Text.Json.JsonElement param)
        {
            var username =  param.GetProperty("username").ToString();
            var uerid = GetUserID(username);

            var listings = new List<ViewModels.Listing>();

            try
            {
                listings = LoadListings(uerid);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(listings);
        }

        [HttpGet]
        [Route("getsearchvm")]
        public IActionResult GetSearchVm()
        {
            var vm = new ViewModels.Search();

            //try
            //{
            //    listings = LoadListings();
            //}
            //catch (Exception exc)
            //{
            //    return BadRequest(exc.Message);
            //}

            return Ok(vm);
        }
        
        [HttpPost]
        [Route("getsearchresults")]
        public IActionResult GetSearchReults([FromBody] System.Text.Json.JsonElement param)
        {
            var vm = JsonConvert.DeserializeObject<ViewModels.Search>(param.GetProperty("vm").ToString()); 
            var listings = new List<ViewModels.Listing>();

            int result = 0;
            if(!string.IsNullOrEmpty(vm.AreaFrom) && !Int32.TryParse(vm.AreaFrom, out result))
            {
                return BadRequest("Min.Area has to be numeric");
            }
            if (!string.IsNullOrEmpty(vm.AreaTo) && !Int32.TryParse(vm.AreaTo, out result))
            {
                return BadRequest("Max.Area has to be numeric");
            }

            try
            {
                listings = LoadListings(vm);
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }

            return Ok(listings);
        }

        [HttpPost]
        [Route("deletelisting")]
        public IActionResult DeleteListing([FromBody] System.Text.Json.JsonElement param)
        {
            var listingid = Int32.Parse(param.GetProperty("listingid").ToString());
            try
            {
                _db.ListingPics.RemoveRange(_db.ListingPics.Where(l => l.ListingId == listingid).ToList());
                _db.ListingAttributes.RemoveRange(_db.ListingAttributes.Where(l => l.ListingId == listingid).ToList());
                _db.Listings.RemoveRange(_db.Listings.Where(l => l.Id == listingid).ToList());
                _db.SaveChanges();
            }
            catch (Exception exc)
            {

                return BadRequest(exc.Message);
            }
            return Ok(true);
        }
    }
}

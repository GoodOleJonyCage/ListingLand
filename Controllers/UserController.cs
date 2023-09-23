using ListingLand.Helpers;
using ListingLand.Models;
using ListingLand.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ListingLand.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private ListingLandContext _db;
        public UserController(ListingLandContext db)
        {
            _db = db;

        }

        [HttpGet]
        [Route("getinitializeduser")]
        public IActionResult GetInitializedUser()
        {
            var user = new ViewModels.User();
            return Ok(user);
        }


        [HttpPost]
        [Route("registeruser")]
        public ActionResult RegisterUser(List<IFormFile> files)
        {
            var vm = JsonConvert.DeserializeObject<ViewModels.User>(Request.Form["vm"][0].ToString());

            if(string.IsNullOrEmpty(vm.EmailAddress))
                return BadRequest("Email Required");

            if(!Helpers.Utilities.IsValidEmail(vm.EmailAddress))
                return BadRequest("Email Must be in valid format");

            if (string.IsNullOrEmpty(vm.Name))
                return BadRequest("Name Required");

            if (string.IsNullOrEmpty(vm.Telephone))
                return BadRequest("Telephone Required");

            if (string.IsNullOrEmpty(vm.Password))
                return BadRequest("Password Required");

           
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
                     
                    //save the file
                    //foreach (var file in files)
                    //{
                    //    if (file.Length > 0)
                    //    {
                    //        #region add image to db
                    //        using (MemoryStream ms = new MemoryStream())
                    //        {
                    //            file.CopyTo(ms);

                    //            _db.ListingPics.Add(new ListingPic()
                    //            {
                    //                //ListingId = listingid,
                    //                Pic = ms.ToArray()
                    //            });

                    //            _db.SaveChanges();

                    //            ms.Close();
                    //            ms.Dispose();

                    //        }
                    //        #endregion
                    //    }
                    //}
                }
                catch (Exception exc)
                {
                    return BadRequest(exc.Message);
                }
            }
            else
            {
                return BadRequest("No Image uploaded");
            }

            return Ok("Uploaded");
        }

        [HttpPost]
        [Route("loginuser")]
        public ActionResult LoginUser([FromBody] System.Text.Json.JsonElement param)
        {
           var username =  param.GetProperty("username").ToString();
           var password = param.GetProperty("password").ToString();

            if (string.IsNullOrEmpty(username))
                return BadRequest("Username required");
            
            if (string.IsNullOrEmpty(password))
                return BadRequest("Password required");

            return Ok("Uploaded");
        }
    }
}

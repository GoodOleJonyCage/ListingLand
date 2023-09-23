using ListingLand.Helpers;
using ListingLand.Models;
using ListingLand.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

                    if( _db.Agents.Any(u => u.Email == vm.EmailAddress))
                        return BadRequest("Username already exists");

                    //save the file
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            #region add image to db
                            using (MemoryStream ms = new MemoryStream())
                            {
                                file.CopyTo(ms);
                                _db.Agents.Add(new Agent()
                                {
                                    Email = vm.EmailAddress,
                                    Name = vm.Name,
                                    Password = vm.Password,
                                    Telephone = vm.Telephone,
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
           ViewModels.User user = new User();
            
           var username =  param.GetProperty("username").ToString();
           var password = param.GetProperty("password").ToString();

            if (string.IsNullOrEmpty(username))
                return BadRequest("Username required");
            
            if (string.IsNullOrEmpty(password))
                return BadRequest("Password required");

            var userDB = _db.Agents.Where(u => u.Email == username && u.Password == password).SingleOrDefault();
            if(userDB != null)
            {
                user.EmailAddress = userDB.Email;
                user.Telephone = userDB.Telephone;
                user.Name = userDB.Name;
                user.Token = GenerateToken();
                user.Image = Helpers.Db_Image_Helper.Get_Db_Image(userDB.Pic);
                
                return Ok(user);
            }
            else
            {
                return BadRequest("Invalid Username/password");
            }
        }

        private string GenerateToken()
        {
            return "12345";
        }

        //private string GenerateToken(Models.User user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        //    var claims = new[]
        //    {
        //        new Claim(ClaimTypes.NameIdentifier,user.Username),
        //        new Claim(ClaimTypes.Role,(user.IsAdmin.HasValue ? user.IsAdmin.Value:false) ? roleAdmin : roleUser)
        //    };
        //    var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        //        _config["Jwt:Audience"],
        //        claims,
        //        expires: DateTime.Now.AddMinutes(double.Parse(_config["Timeout"])),
        //        signingCredentials: credentials);


        //    return new JwtSecurityTokenHandler().WriteToken(token);

        //}
    }
}

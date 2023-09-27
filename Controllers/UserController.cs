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
        private readonly IConfiguration _config;
        public UserController(ListingLandContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
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
                                    About = vm.About,
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
                user.Token = GenerateToken(user);
                user.Image = Helpers.Db_Image_Helper.Get_Db_Image(userDB.Pic);
                
                return Ok(user);
            }
            else
            {
                return BadRequest("Invalid Username/password");
            }
        }
        

        [HttpPost]
        [Route("getuser")]
        public ActionResult GetUser([FromBody] System.Text.Json.JsonElement param)
        {
            ViewModels.User user = new User();

            var username = param.GetProperty("username").ToString();
            
            if (string.IsNullOrEmpty(username))
                return BadRequest("Username required");

            
            var userDB = _db.Agents.Where(u => u.Email == username ).SingleOrDefault();
            if (userDB != null)
            {
                user.ID = userDB.Id;
                user.EmailAddress = userDB.Email;
                user.Telephone = userDB.Telephone;
                user.Name = userDB.Name;
                user.About = userDB.About;
                user.Image = Helpers.Db_Image_Helper.Get_Db_Image(userDB.Pic);
                return Ok(user);
            }
            else
            {
                return BadRequest("User Not Found");
            }
        }

        [HttpGet]
        [Route("getusers")]
        public ActionResult GetUsers()
        {
            var users = _db.Agents
                        .Select(u => new ViewModels.User()
                        {
                            ID = u.Id,
                            EmailAddress = u.Email,
                            Name = u.Name,
                            Telephone = u.Telephone,
                            Image = Helpers.Db_Image_Helper.Get_Db_Image(u.Pic),
                            About = u.About,
                        }).ToList();

            return Ok(users);
        }

        [HttpPost]
        [Route("gettestimonials")]
        public ActionResult GetTestimonials([FromBody] System.Text.Json.JsonElement param)
        {
            var userid = Int32.Parse(param.GetProperty("userid").ToString());
            var lst = _db.AgentTestimonials
                        .Where(t => t.AgentId == userid)
                        .Select(t => new ViewModels.AgentTestimonial
                        {
                            Testimonial = t.Testimonial,
                            By = t.By,
                            DateStr = t.Date.Value.ToString("dd MMM yyyy hh:mm:ss:tt"),
                        }).ToList();

            return Ok(lst);
            
        }

        private string GenerateToken(ViewModels.User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.EmailAddress),
                //new Claim(ClaimTypes.Role,(user.IsAdmin.HasValue ? user.IsAdmin.Value:false) ? roleAdmin : roleUser)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_config["Timeout"])),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

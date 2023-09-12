using ListingLand.Models;
using Microsoft.AspNetCore.Mvc;

namespace ListingLand.Controllers
{
    public class ListingController : Controller
    {
        private ListingLandContext _db;
        public ListingController(ListingLandContext db)
        {
            _db = db;

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}

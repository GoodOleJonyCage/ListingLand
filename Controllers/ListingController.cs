using Microsoft.AspNetCore.Mvc;

namespace ListingLand.Controllers
{
    public class ListingController : Controller
    {
        public ListingController()
        {


        }

        public IActionResult Index()
        {
            return View();
        }
    }
}

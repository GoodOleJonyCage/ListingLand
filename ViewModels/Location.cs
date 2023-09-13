namespace ListingLand.ViewModels
{
    public class Country
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class Region
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
    }
    public class City
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
    }


    public class Location
    {
        public Country Country { get; set; } = new Country();
        public Region Region { get; set; } = new Region();
        public City City { get; set; } = new City();
    }
}

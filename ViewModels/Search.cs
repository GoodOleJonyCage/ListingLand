namespace ListingLand.ViewModels
{
    public class Search
    {
        public string Name { get; set; }    

        public int PriceFrom { get; set; }  
        public int PriceTo { get; set;}

        public string AreaFrom { get;set; }
        public string AreaTo { get; set; } 
          
        public int MinOfficeRooms { get; set; }
        public int MinGarages { get; set; }
        public int MinBedrooms { get; set; }
        public int MinBaths { get; set; }

        public int FrontYard { get; set; }
        public int BackYard { get; set; }

        public Location Location { get; set; } = new Location();
    }
}

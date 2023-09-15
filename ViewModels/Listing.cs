namespace ListingLand.ViewModels
{
     
    public enum Section
    {
          Features = 1,
          QuickSummary = 2,
          Description = 3
    }
    public enum AttributeType
    {
        Radio =1 ,
 	    IndividualCheckBox = 2,
        OpenText = 3,
        CheckBox = 4
    }
    public class Listing
    {
        public string Name { get; set; } = string.Empty;
        public Location Location { get; set; } = new Location();
        public int Price { get; set; }
        public int Area { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int OfficeRooms { get; set; }
        public int Garages { get; set; }
        public bool Backyard { get; set; }
        public bool Frontyard { get; set; }

        public bool IsValid { get; set; }

        public string NameError { get; set; } = string.Empty;
        public string LocationError { get; set; } = string.Empty;
        public string PriceError { get; set; } = string.Empty;
        public string AreaError { get; set; } = string.Empty;
        public string BedroomsError { get; set; } = string.Empty;
        public string BathroomsError { get; set; } = string.Empty;
        public string OfficeRoomsError { get; set; } = string.Empty;
        public string GaragesError { get; set; } = string.Empty;
        public string BackyardError { get; set; } = string.Empty;
        public string FrontyardError { get; set; } = string.Empty;


        public string FeatureError { get; set; } = string.Empty;
        
        public List<Attribute> Features { get; set; } = new List<Attribute>();
        public List<Attribute> QuickSummary { get; set; } = new List<Attribute>();
        public List<Attribute> Description { get; set; } = new List<Attribute>();
    }
}

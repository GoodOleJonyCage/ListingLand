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

        public string NameError { get; set; } = string.Empty;
        public string LocationError { get; set; } = string.Empty;
        public string FeatureError { get; set; } = string.Empty;
        
        public List<Attribute> Features { get; set; } = new List<Attribute>();
        public List<Attribute> QuickSummary { get; set; } = new List<Attribute>();
        public List<Attribute> Description { get; set; } = new List<Attribute>();
    }
}

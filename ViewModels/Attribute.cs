namespace ListingLand.ViewModels
{
    public class AttributeValue
    {
        public int ID { get; set; }
        public int AttributeID { get; set; }
        public string Value { get; set; } = string.Empty;
        public bool Selected { get;set; }
    }
    
    public class Attribute
    {
        public int AttributeID { get; set; }
        public string Attributename { get; set; } = string.Empty;
        public int TypeID { get; set; }
        public string AttributeType { get; set; } = string.Empty;
        public int sectionID { get; set; }
        public string SectionName { get; set; } = string.Empty;
        public string TextValue { get; set; } = string.Empty;
        public bool Selected { get; set; }
        public bool IsInvalid { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public List<AttributeValue> AttributeValues { get; set; }=new List<AttributeValue>();
    }
}

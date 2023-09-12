using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class AttributeValue
{
    public int Id { get; set; }

    public int? AttributeId { get; set; }

    public string? Value { get; set; }

    public virtual Attribute? Attribute { get; set; }

    public virtual ICollection<ListingAttribute> ListingAttributes { get; set; } = new List<ListingAttribute>();
}

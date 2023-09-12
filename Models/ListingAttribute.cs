using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class ListingAttribute
{
    public int Id { get; set; }

    public int? ListingId { get; set; }

    public int? AttributeId { get; set; }

    public string? ValueText { get; set; }

    public int? AttributeValueId { get; set; }

    public virtual Attribute? Attribute { get; set; }

    public virtual AttributeValue? AttributeValue { get; set; }

    public virtual Listing? Listing { get; set; }
}

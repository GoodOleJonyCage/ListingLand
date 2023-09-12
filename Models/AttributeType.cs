using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class AttributeType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Attribute> Attributes { get; set; } = new List<Attribute>();
}

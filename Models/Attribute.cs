using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class Attribute
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Type { get; set; }

    public virtual ICollection<AttributeSection> AttributeSections { get; set; } = new List<AttributeSection>();

    public virtual ICollection<AttributeValue> AttributeValues { get; set; } = new List<AttributeValue>();

    public virtual ICollection<ListingAttribute> ListingAttributes { get; set; } = new List<ListingAttribute>();

    public virtual AttributeType? TypeNavigation { get; set; }
}

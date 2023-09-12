using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class Section
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<AttributeSection> AttributeSections { get; set; } = new List<AttributeSection>();
}

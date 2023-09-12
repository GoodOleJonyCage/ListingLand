using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class AttributeSection
{
    public int Id { get; set; }

    public int? AttributeId { get; set; }

    public int? SectionId { get; set; }

    public virtual Attribute? Attribute { get; set; }

    public virtual Section? Section { get; set; }
}

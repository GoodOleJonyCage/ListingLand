using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class Listing
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? CountryId { get; set; }

    public int? RegionId { get; set; }

    public int? CityId { get; set; }

    public virtual ICollection<ListingAttribute> ListingAttributes { get; set; } = new List<ListingAttribute>();
}

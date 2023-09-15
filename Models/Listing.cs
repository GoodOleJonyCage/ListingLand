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

    public int? Price { get; set; }

    public int? Area { get; set; }

    public int? Bedrooms { get; set; }

    public int? Bathrooms { get; set; }

    public int? OfficeRooms { get; set; }

    public int? Garages { get; set; }

    public bool? Backyard { get; set; }

    public bool? Frontyard { get; set; }

    public virtual ICollection<ListingAttribute> ListingAttributes { get; set; } = new List<ListingAttribute>();
}

using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class ListingPic
{
    public int Id { get; set; }

    public int? ListingId { get; set; }

    public byte[]? Pic { get; set; }

    public virtual Listing? Listing { get; set; }
}

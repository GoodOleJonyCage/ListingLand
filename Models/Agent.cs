using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class Agent
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Name { get; set; }

    public string? Telephone { get; set; }

    public byte[]? Pic { get; set; }

    public string? About { get; set; }

    public virtual ICollection<Listing> Listings { get; set; } = new List<Listing>();
}

using System;
using System.Collections.Generic;

namespace ListingLand.Models;

public partial class AgentTestimonial
{
    public int Id { get; set; }

    public string? Testimonial { get; set; }

    public string? By { get; set; }

    public int? AgentId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Agent? Agent { get; set; }
}

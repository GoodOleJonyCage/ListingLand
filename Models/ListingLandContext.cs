using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ListingLand.Models;

public partial class ListingLandContext : DbContext
{
    public ListingLandContext()
    {
    }

    public ListingLandContext(DbContextOptions<ListingLandContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agent> Agents { get; set; }

    public virtual DbSet<AgentTestimonial> AgentTestimonials { get; set; }

    public virtual DbSet<Attribute> Attributes { get; set; }

    public virtual DbSet<AttributeSection> AttributeSections { get; set; }

    public virtual DbSet<AttributeType> AttributeTypes { get; set; }

    public virtual DbSet<AttributeValue> AttributeValues { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Listing> Listings { get; set; }

    public virtual DbSet<ListingAttribute> ListingAttributes { get; set; }

    public virtual DbSet<ListingPic> ListingPics { get; set; }

    public virtual DbSet<Region> Regions { get; set; }

    public virtual DbSet<Section> Sections { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-HJJ87HE\\SQLEXPRESS;Database=ListingLand;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agent>(entity =>
        {
            entity.ToTable("Agent");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.About)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Telephone)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AgentTestimonial>(entity =>
        {
            entity.ToTable("AgentTestimonial");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AgentId).HasColumnName("AgentID");
            entity.Property(e => e.By)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Date)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Testimonial)
                .HasMaxLength(3000)
                .IsUnicode(false);

            entity.HasOne(d => d.Agent).WithMany(p => p.AgentTestimonials)
                .HasForeignKey(d => d.AgentId)
                .HasConstraintName("FK_AgentTestimonial_Agent");
        });

        modelBuilder.Entity<Attribute>(entity =>
        {
            entity.ToTable("Attribute");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.TypeNavigation).WithMany(p => p.Attributes)
                .HasForeignKey(d => d.Type)
                .HasConstraintName("FK_Attribute_AttributeType");
        });

        modelBuilder.Entity<AttributeSection>(entity =>
        {
            entity.ToTable("AttributeSection");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.SectionId).HasColumnName("SectionID");

            entity.HasOne(d => d.Attribute).WithMany(p => p.AttributeSections)
                .HasForeignKey(d => d.AttributeId)
                .HasConstraintName("FK_AttributeSection_Attribute");

            entity.HasOne(d => d.Section).WithMany(p => p.AttributeSections)
                .HasForeignKey(d => d.SectionId)
                .HasConstraintName("FK_AttributeSection_Section");
        });

        modelBuilder.Entity<AttributeType>(entity =>
        {
            entity.ToTable("AttributeType");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AttributeValue>(entity =>
        {
            entity.ToTable("AttributeValue");

            entity.HasIndex(e => e.AttributeId, "IDX_AttributeValue_AttributeID");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.Value)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.Attribute).WithMany(p => p.AttributeValues)
                .HasForeignKey(d => d.AttributeId)
                .HasConstraintName("FK_AttributeValue_Attribute");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cities__3214EC071AFD4597");

            entity.HasIndex(e => e.Name, "IDX_Cities_Name");

            entity.HasIndex(e => e.RegionId, "IDX_Cities_RegionID");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Region).WithMany(p => p.Cities)
                .HasForeignKey(d => d.RegionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cities_Regions");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Countrie__3214EC07CD803B48");

            entity.HasIndex(e => e.Name, "IDX_Countries_Name").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Language)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Listing>(entity =>
        {
            entity.ToTable("Listing");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CityId).HasColumnName("CityID");
            entity.Property(e => e.CountryId).HasColumnName("CountryID");
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.PostedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RegionId).HasColumnName("RegionID");

            entity.HasOne(d => d.PostedByNavigation).WithMany(p => p.Listings)
                .HasForeignKey(d => d.PostedBy)
                .HasConstraintName("FK_Listing_Agent");
        });

        modelBuilder.Entity<ListingAttribute>(entity =>
        {
            entity.ToTable("ListingAttribute");

            entity.HasIndex(e => e.ListingId, "IDX_ListingAttribute_ListingID");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.AttributeValueId).HasColumnName("AttributeValueID");
            entity.Property(e => e.ListingId).HasColumnName("ListingID");
            entity.Property(e => e.ValueText)
                .HasMaxLength(2000)
                .IsUnicode(false);

            entity.HasOne(d => d.Attribute).WithMany(p => p.ListingAttributes)
                .HasForeignKey(d => d.AttributeId)
                .HasConstraintName("FK_ListingAttribute_Attribute");

            entity.HasOne(d => d.AttributeValue).WithMany(p => p.ListingAttributes)
                .HasForeignKey(d => d.AttributeValueId)
                .HasConstraintName("FK_ListingAttribute_AttributeValue");

            entity.HasOne(d => d.Listing).WithMany(p => p.ListingAttributes)
                .HasForeignKey(d => d.ListingId)
                .HasConstraintName("FK_ListingAttribute_Listing");
        });

        modelBuilder.Entity<ListingPic>(entity =>
        {
            entity.ToTable("ListingPic");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ListingId).HasColumnName("ListingID");

            entity.HasOne(d => d.Listing).WithMany(p => p.ListingPics)
                .HasForeignKey(d => d.ListingId)
                .HasConstraintName("FK_ListingPic_Listing");
        });

        modelBuilder.Entity<Region>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Regions__3214EC07FFEA7CC0");

            entity.HasIndex(e => e.CountryId, "IDX_Regions_CountryID");

            entity.HasIndex(e => e.Name, "IDX_Regions_Name");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Country).WithMany(p => p.Regions)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Regions_Countries");
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.ToTable("Section");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

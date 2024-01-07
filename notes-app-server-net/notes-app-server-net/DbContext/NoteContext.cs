using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using notes_app_server_net.Models;

namespace notes_app_server_net.DbContext;

public partial class NoteContext : Microsoft.EntityFrameworkCore.DbContext
{
    public NoteContext()
    {
    }

    public NoteContext(DbContextOptions<NoteContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Note> Notes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Note_pkey");

            entity.ToTable("Note");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .HasColumnName("userId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

using Microsoft.EntityFrameworkCore;
using projetoFinal_WebBackEnd.Models;

namespace projetoFinal_WebBackEnd.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Telefone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Animal>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(80);
            entity.Property(e => e.Especie).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Raca).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Idade).IsRequired();

            entity.HasOne(e => e.Cliente)
                  .WithMany(c => c.Animais)
                  .HasForeignKey(e => e.ClienteId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Servico>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(80);
            entity.Property(e => e.Descricao).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Preco).IsRequired().HasColumnType("money");
        });

        modelBuilder.Entity<Agendamento>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.DataHora).IsRequired();
            entity.Property(e => e.Observacoes).HasMaxLength(300);

            entity.HasOne(e => e.Animal)
                  .WithMany(a => a.Agendamentos)
                  .HasForeignKey(e => e.AnimalId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Servico)
                  .WithMany(s => s.Agendamentos)
                  .HasForeignKey(e => e.ServicoId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Animal> Animais { get; set; }
    public DbSet<Servico> Servicos { get; set; }
    public DbSet<Agendamento> Agendamentos { get; set; }
}

namespace projetoFinal_WebBackEnd.Models;

public class Animal
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Especie { get; set; } = null!;
    public string Raca { get; set; } = null!;
    public int Idade { get; set; }

    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;

    public ICollection<Agendamento> Agendamentos { get; set; } = [];
}

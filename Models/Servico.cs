namespace projetoFinal_WebBackEnd.Models;

public class Servico
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public decimal Preco { get; set; }

    public ICollection<Agendamento> Agendamentos { get; set; } = [];
}

namespace projetoFinal_WebBackEnd.Models;

public class Agendamento
{
    public int Id { get; set; }
    public DateTime DataHora { get; set; }
    public string Observacoes { get; set; } = string.Empty;

    public int AnimalId { get; set; }
    public Animal Animal { get; set; } = null!;

    public int ServicoId { get; set; }
    public Servico Servico { get; set; } = null!;
}

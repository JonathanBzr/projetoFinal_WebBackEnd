using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using projetoFinal_WebBackEnd.Data;
using projetoFinal_WebBackEnd.Models;

namespace projetoFinal_WebBackEnd.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AgendamentosController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        var agendamentos = _context.Agendamentos.ToList();
        return Ok(agendamentos);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var agendamento = _context.Agendamentos.Find(id);
        if (agendamento == null)
            return NotFound();

        return Ok(agendamento);
    }

    [HttpPost]
    public IActionResult Post(Agendamento agendamento)
    {
        _context.Agendamentos.Add(agendamento);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = agendamento.Id }, agendamento);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Agendamento agendamento)
    {
        if (id != agendamento.Id)
            return BadRequest();

        var existing = _context.Agendamentos.Find(id);
        if (existing == null)
            return NotFound();

        existing.DataHora = agendamento.DataHora;
        existing.Observacoes = agendamento.Observacoes;
        existing.AnimalId = agendamento.AnimalId;
        existing.ServicoId = agendamento.ServicoId;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var agendamento = _context.Agendamentos.Find(id);
        if (agendamento == null)
            return NotFound();

        _context.Agendamentos.Remove(agendamento);
        _context.SaveChanges();
        return NoContent();
    }
}

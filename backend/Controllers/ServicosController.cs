using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using projetoFinal_WebBackEnd.Data;
using projetoFinal_WebBackEnd.Models;

namespace projetoFinal_WebBackEnd.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ServicosController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        var servicos = _context.Servicos.ToList();
        return Ok(servicos);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var servico = _context.Servicos.Find(id);
        if (servico == null)
            return NotFound();

        return Ok(servico);
    }

    [HttpPost]
    public IActionResult Post(Servico servico)
    {
        _context.Servicos.Add(servico);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = servico.Id }, servico);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Servico servico)
    {
        if (id != servico.Id)
            return BadRequest();

        var existing = _context.Servicos.Find(id);
        if (existing == null)
            return NotFound();

        existing.Nome = servico.Nome;
        existing.Descricao = servico.Descricao;
        existing.Preco = servico.Preco;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var servico = _context.Servicos.Find(id);
        if (servico == null)
            return NotFound();

        _context.Servicos.Remove(servico);
        _context.SaveChanges();
        return NoContent();
    }
}

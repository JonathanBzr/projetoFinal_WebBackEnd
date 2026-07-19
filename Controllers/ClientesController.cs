using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using projetoFinal_WebBackEnd.Data;
using projetoFinal_WebBackEnd.Models;

namespace projetoFinal_WebBackEnd.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ClientesController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        var clientes = _context.Clientes.ToList();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
            return NotFound();

        return Ok(cliente);
    }

    [HttpPost]
    public IActionResult Post(Cliente cliente)
    {
        _context.Clientes.Add(cliente);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Cliente cliente)
    {
        if (id != cliente.Id)
            return BadRequest();

        var existing = _context.Clientes.Find(id);
        if (existing == null)
            return NotFound();

        existing.Nome = cliente.Nome;
        existing.Telefone = cliente.Telefone;
        existing.Email = cliente.Email;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
            return NotFound();

        _context.Clientes.Remove(cliente);
        _context.SaveChanges();
        return NoContent();
    }
}

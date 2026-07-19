using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using projetoFinal_WebBackEnd.Data;
using projetoFinal_WebBackEnd.Models;

namespace projetoFinal_WebBackEnd.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AnimaisController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        var animais = _context.Animais.ToList();
        return Ok(animais);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var animal = _context.Animais.Find(id);
        if (animal == null)
            return NotFound();

        return Ok(animal);
    }

    [HttpPost]
    public IActionResult Post(Animal animal)
    {
        _context.Animais.Add(animal);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = animal.Id }, animal);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Animal animal)
    {
        if (id != animal.Id)
            return BadRequest();

        var existing = _context.Animais.Find(id);
        if (existing == null)
            return NotFound();

        existing.Nome = animal.Nome;
        existing.Especie = animal.Especie;
        existing.Raca = animal.Raca;
        existing.Idade = animal.Idade;
        existing.ClienteId = animal.ClienteId;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var animal = _context.Animais.Find(id);
        if (animal == null)
            return NotFound();

        _context.Animais.Remove(animal);
        _context.SaveChanges();
        return NoContent();
    }
}

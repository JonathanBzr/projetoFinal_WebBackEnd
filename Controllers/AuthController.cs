using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using projetoFinal_WebBackEnd.DTO;

namespace projetoFinal_WebBackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IConfiguration configuration) : ControllerBase
{
    private readonly IConfiguration _configuration = configuration;

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        if (request.Usuario != "admin" || request.Senha != "123456")
        {
            return Unauthorized();
        }

        var token = GerarToken();
        return Ok(new { token });
    }

    private string GerarToken()
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "Administrador"),
            new Claim(ClaimTypes.Role, "Administrador")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credenciais = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: credenciais
        );

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}

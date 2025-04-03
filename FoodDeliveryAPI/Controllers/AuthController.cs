using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Collections.Generic;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private static List<User> users = new List<User>();

    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        if (users.Exists(u => u.Email == user.Email))
        {
            return BadRequest(new { message = "User already exists!" });
        }

        users.Add(user);
        return Ok(new { message = "User registered successfully!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = users.Find(u => u.Email == request.Email && u.Password == request.Password);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // 🔹 Generate JWT Token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("YourSuperSecretKey"); // Replace with a real secret key

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, user.Email) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new
        {
            message = "Login successful!",
            token = tokenString
        });
    }
}

// User Model
public class User
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

// Login Model
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}


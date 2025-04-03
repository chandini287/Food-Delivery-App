using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private static List<User> users = new List<User>();

    // Register Endpoint
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

    // Login Endpoint
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = users.Find(u => u.Email == request.Email && u.Password == request.Password);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        return Ok(new { message = "Login successful!", user });
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

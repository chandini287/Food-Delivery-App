using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // ✅ Fix for DatabaseGeneratedOption

namespace FoodDeliveryAPI.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // ✅ Fix for the missing reference
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? Role { get; set; } = "User"; // Default role as "User"
    }
}
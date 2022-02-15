using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("PESSOAS")]
    public partial class Pessoa
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        [Required]
        [Column("FULL_NAME")]
        [StringLength(255)]
        public string FullName { get; set; }
        [Column("BIRTHDAY", TypeName = "date")]
        public DateTime Birthday { get; set; }
        [Required]
        [Column("CPF")]
        [StringLength(255)]
        public string Cpf { get; set; }
        [Column("INCOME", TypeName = "decimal(10, 2)")]
        public decimal Income { get; set; }
    }
}

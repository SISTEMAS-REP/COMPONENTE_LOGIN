namespace Prod.LoginUnico.Domain.Entities;

public class BaseAuditEntity
{
    public string? usuario_registro { get; set; }

    public DateTime? fecha_registro { get; set; }

    public string? usuario_modificacion { get; set; }

    public DateTime? fecha_modificacion { get; set; }
}

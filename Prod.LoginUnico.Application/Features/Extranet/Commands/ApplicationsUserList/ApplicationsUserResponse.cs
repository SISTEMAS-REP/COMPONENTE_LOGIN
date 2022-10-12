
namespace Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList
{
    public class ApplicationsUserResponse
    {
        public List<ApplicationUserResponse>? ApplicationUser { get; set; }
    }

    public class ApplicationUserResponse
    {
        public int id_aplicacion { get; set; }
        public string? nombre { get; set; }
        public string? descripcion { get; set; }
        public string? url_intranet { get; set; }
        public string? url_extranet { get; set; }
        public bool estado { get; set; }
        public bool es_intranet { get; set; }
        public bool es_extranet { get; set; }
        public byte[]? conten_img { get; set; }
    }
}

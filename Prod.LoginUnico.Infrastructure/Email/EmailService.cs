using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.ServiciosExternos;
using System.Collections.Specialized;
using System.Web;

namespace Prod.LoginUnico.Infrastructure.Email;

public class EmailService : EmailSender, IEmailService
{
    public EmailService(string rootTemplates, string route) : base(route)
    {
        Templates = SenderManager.GetEmailTemplates(rootTemplates, Templates);
    }

    public 
        Task CreatePersonAccount(string email, 
        string documentNumber, 
        string password)
    {
        var data = new
        {
            documentNumber = documentNumber,
            password = password
        };

        base.Send(templateName: "CreatePersonAccount", 
            request: new()
            {
                to = email,
                isBodyHtml = true,
                subject = "LOGIN ÚNICO - Creación de Usuario"
            },
            data: data);

        return Task.CompletedTask;
    }

    public
        Task CreateCompanyAccount(string email,
        string rucNumber,
        string documentNumber,
        string password)
    {
        var data = new
        {
            rucNumber = rucNumber,
            documentNumber = documentNumber,
            password = password
        };

        base.Send(templateName: "CreateCompanyAccount",
            request: new()
            {
                to = email,
                isBodyHtml = true,
                subject = "LOGIN ÚNICO - Creación de Usuario"
            },
            data: data);

        return Task.CompletedTask;
    }

    private string ToQueryString(NameValueCollection nvc)
    {
        var array = (from key in nvc.AllKeys
                     from value in nvc.GetValues(key)
                     select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(value)))
            .ToArray();
        return "?" + string.Join("&", array);
    }
}
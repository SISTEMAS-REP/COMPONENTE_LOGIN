using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Prod.ComponenteLoginAngular.MVC
{
    public static class HtmlExtensions
    {
        public static IHtmlContent LoadSpaScripts(this IHtmlHelper helper)
        {
            var html = File.ReadAllText(System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dist", "index.html"));

            return helper.Raw(html);
        }
    }
}

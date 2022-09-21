//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Prod.LoginUnico.Application.Common.Wrapper;
//using Prod.LoginUnico.Application.Models;

//namespace Prod.LoginUnico.Web.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class ComponenteLoginController
//    {
//        public ComponenteLoginController() { }


//        [AllowAnonymous]
//        [HttpPost]
//        [Route("Obtener_Imagen_By_Aplicacion")]
//        public async Task<Response<ImagenAplicacion>> Obtener_Imagen_By_Aplicacion([FromBody] PersonaRequest request)
//        {
            
//            byte[] numArray;
//            try
//            {
//                var carpetaRutaLogo = System.IO.Path.Combine("", request.id_aplicacion + ".png");
//                numArray = System.IO.File.ReadAllBytes(carpetaRutaLogo);
//            }
//            catch (System.IO.FileNotFoundException ex)
//            {
//                var carpetaRutaLogoError = System.IO.Path.Combine("", "Logo_Temp.png");
//                numArray = System.IO.File.ReadAllBytes(carpetaRutaLogoError);
//            }
//            return new ()
//            {
//                Succeeded= true,
//                Data = numArray
//            };
//        }
//    }
//}

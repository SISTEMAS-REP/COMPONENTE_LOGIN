using System;
using System.Collections.Generic;
using System.Text;


namespace Prod.ComponenteLoginAngular.MVC.Model
{

    public enum TIPO_PERSONA
    {
        NATURAL = 1,
        JURIDICA = 2
    }

    public enum TIPO_DOCUMENTO_PERSONA
    {
        DNI = 1,
        LE = 2,
        CE = 3,
        BREVETE = 4,
        FOTOCHECK = 5,
        OTROS = 6,
        LIBRETA_MILITAR = 7,
        RUC = 8,
        PASAPORTE = 9
    }

    public enum TIPO_SECTOR
    {
        PESQUERIA = 1,
        INDUSTRIA = 2,
        PRODUCE = 3,
    }

    public static class ESTADO_PERSONA
    {
        public const string ACTIVO = "A";
        public const string INACTIVO = "I";
    }
}

namespace Prod.LoginUnico.Application.Models;

public class SunatResultModel
{
    public string rucNumber { get; set; }

    public string businessName { get; set; }

    public string comercialName { get; set; } //

    public DateTime? registrationDate { get; set; } //


    public string departmentCode { get; set; }

    public string provinceCode { get; set; }

    public string districtCode { get; set; }

    public string ubigeoCode { get; set; }

    public string businessAddress { get; set; }


    public bool status { get; set; } //

    public string businessType { get; set; } //

    public string ciiu { get; set; } //
}

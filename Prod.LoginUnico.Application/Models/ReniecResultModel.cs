using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Models;

public class ReniecResultModel
{
    public string documentNumber { get; set; }

    public string lastName { get; set; }

    public string firstName { get; set; }

    
    public string departmentCode { get; set; }

    public string department { get; set; } //

    public string provinceCode { get; set; }

    public string province { get; set; } //

    public string districtCode { get; set; }

    public string district { get; set; } //

    public string ubigeoCode { get; set; }

    public string address { get; set; }


    public DateTime dateOfBirth { get; set; } //

    public string restrictionCode { get; set; } //

    public string genderCode { get; set; } //

    public string gender { get; set; } //

    public string maritalStatusCode { get; set; } //

    public string maritalStatus { get; set; } //

}

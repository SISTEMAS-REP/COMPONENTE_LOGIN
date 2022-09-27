using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Infrastructure.Services;

public class ReCaptchaService : IReCaptchaService
{
	private readonly AppSettings _options;

	public ReCaptchaService(IOptions<AppSettings> options)
	{
        _options = options.Value;
	}

	public async Task<ReCaptchaResultModel> 
		Validate(string recaptchaToken)
	{
		using (var http = new HttpClient())
		{
			var request = new FormUrlEncodedContent(
				new Dictionary<string, string>
				{
					{"secret", _options.ReCaptcha.SecretKey },
					{"response", recaptchaToken }
				});

			var response = await http
				.PostAsync(_options.ReCaptcha.UrlValidator, request);

			var content = response.Content.ReadAsStringAsync().Result;
			var result = JsonConvert.DeserializeObject<ReCaptchaResultModel>(content);

            return await Task
				.FromResult(result);
        }
	}
}

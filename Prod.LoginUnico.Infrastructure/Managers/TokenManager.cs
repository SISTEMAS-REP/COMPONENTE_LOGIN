using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Models;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Infrastructure.Managers;

public class TokenManager : ITokenManager
{
    private readonly AppSettings _options;

    public TokenManager(IOptions<AppSettings> options)
    {
        _options = options.Value;
    }

    public Token GenerateToken(ExtranetUserEntity user)
    {
        Token token = new();

        //Get the symmetry of the Security Key.
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_options.Authorization!.SecurityKey!));

        //Generate the encrypted ID.
        var signingCredentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);

        //Give the token settings to be created.
        token.ExpiresAt = DateTime.UtcNow
            .AddMinutes(_options.Authorization.Expiration);

        var claims = new List<Claim> {
            new Claim(ClaimTypes.Sid, user.id_usuario_extranet.ToString()),
            new Claim(ClaimTypes.Name, user.user_name),
            new Claim(ClaimTypes.NameIdentifier, user.id_persona_natural.ToString())
        };

        var securityToken = new JwtSecurityToken(
            audience: _options.Authorization.Audience,
            issuer: _options.Authorization.Issuer,
            expires: token.ExpiresAt,
            notBefore: DateTime.UtcNow,
            signingCredentials: signingCredentials,
            claims: claims);

        //Let's take an example from the token generator class.
        var tokenHandler = new JwtSecurityTokenHandler();
        token.AccessToken = tokenHandler.WriteToken(securityToken);
        //token.RefreshToken = GenerateRefreshToken();
        return token;
    }
}

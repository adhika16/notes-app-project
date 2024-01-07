using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace notes_app_server_net.Attributes
{
    public class GetUserIdFilterAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Access the user's claims from the AuthorizationHandlerContext
            var claims = context.HttpContext.User.Claims;

            // Extract the userId or sub claim
            string userIdOrSub = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "sub")?.Value;

            // Store the userId or sub in the HttpContext items dictionary
            context.HttpContext.Items["userIdOrSub"] = userIdOrSub;
        }
    }
}

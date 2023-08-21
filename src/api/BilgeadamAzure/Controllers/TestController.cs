using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BilgeadamAzure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        // GET: api/<TestController>
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<string>> Get(object requestData)
        {
            if (requestData is null)
            {
                return BadRequest();
            }

            var data = await InvokeRequestResponseService(requestData.ToString());

            return data;

            static async Task<string> InvokeRequestResponseService(string requestBody)
            {
                var handler = new HttpClientHandler()
                {
                    ClientCertificateOptions = ClientCertificateOption.Manual,
                    ServerCertificateCustomValidationCallback =
                            (httpRequestMessage, cert, cetChain, policyErrors) => { return true; }
                };

                using (var client = new HttpClient(handler))
                {

                    const string apiKey = "ySXVKRfVD1ZWf0cnm7OPFGHOoDbCJkNN";
                    if (string.IsNullOrEmpty(apiKey))
                    {
                        throw new Exception("A key should be provided to invoke the endpoint");
                    }
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                    client.BaseAddress = new Uri("http://10def03d-23c9-4976-8497-c8c259cbedb9.westeurope.azurecontainer.io/score");

                    var content = new StringContent(requestBody);
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                    HttpResponseMessage response = await client.PostAsync("", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string result = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Result: {0}", result);

                        return result;
                    }
                    else
                    {
                        Console.WriteLine(string.Format("The request failed with status code: {0}", response.StatusCode));

                        Console.WriteLine(response.Headers.ToString());

                        return await response.Content.ReadAsStringAsync();
                    }
                }
            }
        }

    }
}

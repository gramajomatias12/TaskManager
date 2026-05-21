using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Classes;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntidadController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EntidadController(IConfiguration configuration) => _configuration = configuration;

        [HttpGet("{entidad}")]
        public IActionResult Get(string entidad)
        {
            AccesoDatos db = new(_configuration);

            // Le mandamos el JSON vacío para que la clase AccesoDatos no proteste
            Respuesta res = db.Consultar("SIS_" + entidad + "_S", "{}");

            if (res.isException) return BadRequest(res.mensaje);

            return Ok(res.Items);
        }

        [HttpPost("{entidad}")]
        public IActionResult Post(string entidad, [FromBody] PeticionGenerica data)
        {
            AccesoDatos db = new(_configuration);

            // Si la entidad ya viene como "Tareas_D", el SP será "SIS_Tareas_D"
            // Si viene como "Tareas", le ponemos "_IU" por defecto
            string sufijo = entidad.Contains("_") ? "" : "_IU";
            string nombreSP = "SIS_" + entidad + sufijo;

            Respuesta res = db.Consultar(nombreSP, data.jsonParametros);
            return Ok(res);
        }
    }
}

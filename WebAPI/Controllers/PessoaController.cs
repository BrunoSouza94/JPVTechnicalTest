using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly AppDbContext context = new AppDbContext();

        [HttpGet]
        public IEnumerable<Pessoa> Get()
        {
            return context
                    .Pessoas
                    .ToList();
        }

        [HttpPost]
        public ActionResult Insert(Pessoa pessoa)
        {
            context
                .Pessoas
                .Add(pessoa);

            context
                .SaveChanges();

            return new OkResult();
        }

        [HttpPut]
        public ActionResult Edit(Pessoa pessoa)
        {
            var entry = context.Entry(pessoa);
            context.Set<Pessoa>().Attach(pessoa);
            entry.State = EntityState.Modified;

            context.SaveChanges();

            return new OkResult();
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            Pessoa course = context
                            .Pessoas
                            .FirstOrDefault(c => c.Id == id);

            context
                .Pessoas
                .Remove(course);

            context
                .SaveChanges();

            return new OkResult();
        }
    }
}

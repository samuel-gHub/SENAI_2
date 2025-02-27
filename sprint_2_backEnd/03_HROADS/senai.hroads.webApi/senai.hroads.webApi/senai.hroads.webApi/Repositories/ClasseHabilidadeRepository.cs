﻿using Microsoft.EntityFrameworkCore;
using senai.hroads.webApi.Contexts;
using senai.hroads.webApi.Domains;
using senai.hroads.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.hroads.webApi.Repositories
{
    public class ClasseHabilidadeRepository : IClasseHabilidadeRepository
    {
        HROADSContext ctx = new HROADSContext();

        public void Atualizar(ClasseHabilidade classeHabilidadeAtualizada)
        {
            ClasseHabilidade classeHabilidadeBuscada = ctx.ClasseHabilidades.Find(classeHabilidadeAtualizada.IdClasseHabilidade);

            if (classeHabilidadeBuscada != null)
            {
                classeHabilidadeBuscada.IdClasse = classeHabilidadeAtualizada.IdClasse;
                classeHabilidadeBuscada.IdHabilidade = classeHabilidadeAtualizada.IdHabilidade;

                ctx.ClasseHabilidades.Update(classeHabilidadeBuscada);
                ctx.SaveChanges();
            }
        }

        public ClasseHabilidade BuscarPorId(int id)
        {
            return ctx.ClasseHabilidades.Include(c => c.IdClasseNavigation).Include(d => d.IdHabilidadeNavigation).FirstOrDefault(e => e.IdClasseHabilidade == id);
        }

        public void Cadastrar(ClasseHabilidade novaClasseHabilidade)
        {
            ctx.ClasseHabilidades.Add(novaClasseHabilidade);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.ClasseHabilidades.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        public List<ClasseHabilidade> ListarTodas()
        {
            return ctx.ClasseHabilidades.Include(c => c.IdClasseNavigation).Include(d => d.IdHabilidadeNavigation).ToList();
        }
    }
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { normalizarTexto } from '../../../shared/rotulos';
import type { AbaDestino } from './componentes';
import { SECOES, type SecaoGuia } from './secoes';

const ATALHOS = ['primeiros-passos', 'lancar-producao', 'abrir-paineis', 'analise-ler'];

function combina(secao: SecaoGuia, termos: string[]) {
  const texto = normalizarTexto(`${secao.grupo} ${secao.titulo} ${secao.resumo} ${secao.palavras}`);
  return termos.every((t) => texto.includes(t));
}

function agruparPorGrupo(secoes: SecaoGuia[]) {
  const grupos: { nome: string; secoes: SecaoGuia[] }[] = [];
  for (const s of secoes) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo?.nome === s.grupo) ultimo.secoes.push(s);
    else grupos.push({ nome: s.grupo, secoes: [s] });
  }
  return grupos;
}

export default function Guia({ onIrPara }: { onIrPara: (aba: AbaDestino) => void }) {
  const [busca, setBusca] = useState('');
  const [ativa, setAtiva] = useState(SECOES[0].id);
  const rolagem = useRef<HTMLDivElement>(null);

  const visiveis = useMemo(() => {
    const termos = normalizarTexto(busca).split(/\s+/).filter(Boolean);
    return termos.length ? SECOES.filter((s) => combina(s, termos)) : SECOES;
  }, [busca]);
  const grupos = useMemo(() => agruparPorGrupo(visiveis), [visiveis]);

  useEffect(() => {
    rolagem.current?.scrollTo({ top: 0 });
  }, [busca]);

  useEffect(() => {
    const container = rolagem.current;
    if (!container) return;
    const atualizar = () => {
      const limite = container.getBoundingClientRect().top + 96;
      let atual = visiveis[0]?.id;
      for (const s of visiveis) {
        const el = document.getElementById(`guia-${s.id}`);
        if (el && el.getBoundingClientRect().top <= limite) atual = s.id;
      }
      if (atual) setAtiva(atual);
    };
    atualizar();
    container.addEventListener('scroll', atualizar, { passive: true });
    return () => container.removeEventListener('scroll', atualizar);
  }, [visiveis]);

  useEffect(() => {
    document.querySelector(`[data-indice="${ativa}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [ativa]);

  const irParaSecao = (id: string) => {
    document.getElementById(`guia-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex h-full bg-zinc-50">
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-zinc-200 bg-white">
        <div className="border-b border-zinc-100 p-3">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar no guia..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-blue-400 focus:bg-white"
          />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {grupos.map((g) => (
            <div key={g.nome} className="mb-4">
              <div className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-zinc-400">{g.nome}</div>
              {g.secoes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  data-indice={s.id}
                  onClick={() => irParaSecao(s.id)}
                  className={`block w-full rounded-md px-2 py-1.5 text-left text-[13px] transition-colors ${
                    ativa === s.id ? 'bg-blue-50 font-semibold text-blue-700' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  {s.titulo}
                </button>
              ))}
            </div>
          ))}
          {grupos.length === 0 && <p className="px-2 text-sm text-zinc-400">Nada encontrado.</p>}
        </nav>
      </aside>

      <div ref={rolagem} className="min-w-0 flex-1 overflow-y-auto scroll-smooth">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-8 py-8">
          {!busca && (
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-sm">
              <h2 className="text-lg font-bold">Como usar o programa</h2>
              <p className="mt-1 max-w-2xl text-sm text-blue-100">
                Cada parte do programa explicada passo a passo. Use a busca à esquerda ou comece por um destes:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ATALHOS.map((id) => {
                  const s = SECOES.find((x) => x.id === id);
                  return s ? (
                    <button
                      key={id}
                      type="button"
                      onClick={() => irParaSecao(id)}
                      className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      {s.titulo}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {visiveis.map((s) => (
            <section
              key={s.id}
              id={`guia-${s.id}`}
              className="scroll-mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="text-[11px] font-bold uppercase tracking-wide text-blue-600">{s.grupo}</div>
              <h2 className="mt-0.5 text-base font-bold text-zinc-900">{s.titulo}</h2>
              <p className="mt-0.5 text-sm text-zinc-500">{s.resumo}</p>
              <div className="mt-4 flex flex-col gap-3">{s.conteudo(onIrPara)}</div>
            </section>
          ))}

          {visiveis.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
              Nenhum assunto encontrado para “{busca}”.
              <button type="button" onClick={() => setBusca('')} className="ml-1 font-semibold text-blue-600 hover:underline">
                Limpar busca
              </button>
            </div>
          )}

          <div className="h-[40vh]" aria-hidden />
        </div>
      </div>
    </div>
  );
}

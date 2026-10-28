import { Children, type ReactNode } from 'react';

export type AbaDestino = 'producao' | 'cadastros' | 'analise';

const ROTULO_DESTINO: Record<AbaDestino, string> = {
  producao: 'Controle de Produção',
  cadastros: 'Cadastros',
  analise: 'Análise',
};

export function Passos({ children }: { children: ReactNode }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {Children.toArray(children).map((passo, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
          <span className="mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">{passo}</div>
        </li>
      ))}
    </ol>
  );
}

export function Passo({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

type TomAviso = 'dica' | 'atencao' | 'perigo';

const AVISO: Record<TomAviso, { classe: string; titulo: string }> = {
  dica: { classe: 'border-blue-200 bg-blue-50 text-blue-900', titulo: 'Dica' },
  atencao: { classe: 'border-amber-200 bg-amber-50 text-amber-900', titulo: 'Atenção' },
  perigo: { classe: 'border-red-200 bg-red-50 text-red-900', titulo: 'Cuidado' },
};

export function Aviso({ tom = 'dica', titulo, children }: { tom?: TomAviso; titulo?: string; children: ReactNode }) {
  const estilo = AVISO[tom];
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${estilo.classe}`}>
      <div className="mb-0.5 text-xs font-bold uppercase tracking-wide">{titulo ?? estilo.titulo}</div>
      {children}
    </div>
  );
}

export function Botao({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center whitespace-nowrap rounded-md border border-zinc-300 bg-white px-1.5 py-px text-[0.8em] font-semibold text-zinc-800 shadow-sm">
      {children}
    </span>
  );
}

export function Tecla({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 rounded border border-b-2 border-zinc-300 bg-zinc-50 px-1.5 py-px font-mono text-[0.8em] text-zinc-700">
      {children}
    </kbd>
  );
}

export function Campo({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap font-semibold text-zinc-900">{children}</span>;
}

export function Paragrafo({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-zinc-700">{children}</p>;
}

export function Lista({ children }: { children: ReactNode }) {
  return <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-zinc-700 marker:text-zinc-400">{children}</ul>;
}

export function Subtitulo({ children }: { children: ReactNode }) {
  return <h3 className="pt-1 text-sm font-bold text-zinc-900">{children}</h3>;
}

export function Tabela({ cabecalho, linhas }: { cabecalho: string[]; linhas: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-zinc-50">
            {cabecalho.map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-zinc-500">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-t border-zinc-100 align-top">
              {linha.map((celula, j) => (
                <td key={j} className={`px-3 py-2 leading-relaxed ${j === 0 ? 'font-semibold text-zinc-800' : 'text-zinc-600'}`}>{celula}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pergunta({ pergunta, children }: { pergunta: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-zinc-200 bg-white px-4 py-3 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-zinc-800">
        {pergunta}
        <span className="text-zinc-400 transition-transform group-open:rotate-90">▸</span>
      </summary>
      <div className="mt-2 text-sm leading-relaxed text-zinc-600">{children}</div>
    </details>
  );
}

export function IrPara({ destino, onIrPara }: { destino: AbaDestino; onIrPara: (aba: AbaDestino) => void }) {
  return (
    <button
      type="button"
      onClick={() => onIrPara(destino)}
      className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
    >
      Abrir a tela {ROTULO_DESTINO[destino]} →
    </button>
  );
}

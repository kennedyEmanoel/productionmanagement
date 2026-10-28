import type { ReactNode } from 'react';
import {
  Aviso, Botao, Campo, IrPara, Lista, Paragrafo, Passo, Passos, Pergunta, Subtitulo, Tabela, Tecla,
  type AbaDestino,
} from './componentes';

export interface SecaoGuia {
  id: string;
  grupo: string;
  titulo: string;
  resumo: string;
  palavras: string;
  conteudo: (irPara: (aba: AbaDestino) => void) => ReactNode;
}

export const SECOES: SecaoGuia[] = [
  // ─── Começando ─────────────────────────────────────────────────────────────
  {
    id: 'visao-geral',
    grupo: 'Começando',
    titulo: 'O que o programa faz',
    resumo: 'Registro da produção hora a hora por operador, painéis para TV, acesso do gestor pela rede e análise de desempenho.',
    palavras: 'introducao glossario cartao ficha escala faixa meta realizado saldo eficiencia variacao',
    conteudo: () => (
      <>
        <Paragrafo>
          A cada faixa de horário você anota quanto cada operador produziu e qual era a meta. Com isso o programa monta os
          painéis da TV, deixa o gestor acompanhar e editar pelo navegador e gera a análise de desempenho de cada operador.
        </Paragrafo>
        <Subtitulo>Palavras que aparecem no programa</Subtitulo>
        <Tabela
          cabecalho={['Termo', 'O que significa']}
          linhas={[
            ['Cartão (ficha)', 'A folha de produção de um dia para um produto e uma etapa. Ex.: 13/10 · 4G SIMCOM · Soldagem.'],
            ['Escala', 'Os operadores colocados em um cartão.'],
            ['Faixa de horário', 'Cada linha do cartão: 07:12–08:00, 08:00–09:00 ... 16:00–17:12.'],
            ['Meta', 'Quantas peças eram esperadas naquela faixa.'],
            ['Realizado', 'Quantas peças foram feitas de verdade.'],
            ['Saldo', 'Realizado menos meta. Negativo = abaixo da meta.'],
            ['Eficiência', 'Realizado ÷ meta, em %. 100% = bateu a meta.'],
            ['Variação', 'Um tipo dentro de uma etapa. Ex.: Soldagem → Cabos ou Retrabalho; Gravação → Firmware, IMEI ou Serial.'],
          ]}
        />
        <Subtitulo>Cores usadas em todo o programa</Subtitulo>
        <Lista>
          <li><b className="text-emerald-700">Verde</b>: 100% da meta ou mais.</li>
          <li><b className="text-amber-700">Amarelo/laranja</b>: entre 80% e 99%.</li>
          <li><b className="text-red-700">Vermelho</b>: abaixo de 80% (situação crítica).</li>
          <li><b className="text-zinc-500">Cinza</b> ou <b>—</b>: sem registro.</li>
        </Lista>
      </>
    ),
  },
  {
    id: 'navegacao',
    grupo: 'Começando',
    titulo: 'Navegar entre as telas',
    resumo: 'O menu lateral, o cabeçalho e o endereço de acesso pela rede.',
    palavras: 'menu lateral sidebar cabecalho telas navegar abrir fechar',
    conteudo: () => (
      <>
        <Passos>
          <Passo>Clique no ícone <Botao>☰</Botao> no canto superior esquerdo para abrir o menu.</Passo>
          <Passo>Escolha a tela. Para fechar o menu sem escolher, clique em qualquer lugar fora dele.</Passo>
        </Passos>
        <Tabela
          cabecalho={['Item do menu', 'Para que serve']}
          linhas={[
            ['Ctrl. Produção', 'Abrir os cartões do dia e lançar a produção hora a hora. É a tela inicial.'],
            ['Painel Produção', 'Abre os painéis de TV: escolha Painel Detalhado ou Painel Geral.'],
            ['Análise', 'Desempenho de um operador ao longo de um período.'],
            ['Cadastros', 'Operadores, produtos, etapas e variações.'],
            ['Guia de uso', 'Esta página.'],
          ]}
        />
        <Paragrafo>
          No canto superior direito aparece <Campo>ACESSO PELA REDE</Campo> com um endereço (ex.: http://192.168.0.10:3000).
          É o link que o gestor usa no navegador. Clique nele para abrir no seu navegador também.
        </Paragrafo>
      </>
    ),
  },
  {
    id: 'primeiros-passos',
    grupo: 'Começando',
    titulo: 'Primeiros passos',
    resumo: 'O que cadastrar antes de lançar a primeira produção.',
    palavras: 'configuracao inicial comecar cadastrar primeiro uso',
    conteudo: (irPara) => (
      <>
        <Passos>
          <Passo>Em <Campo>Cadastros → Operadores</Campo>, cadastre as pessoas que vão aparecer nos cartões.</Passo>
          <Passo>Em <Campo>Cadastros → Produtos</Campo>, cadastre os produtos (nome e, se houver, versão).</Passo>
          <Passo>Em <Campo>Cadastros → Etapas</Campo>, confira as etapas do processo e as variações de cada uma. O programa já vem com Montagem, Soldagem, Revisão e Gravação.</Passo>
          <Passo>Vá para <Campo>Ctrl. Produção</Campo> e abra o primeiro cartão do dia (veja “Abrir o cartão do dia”).</Passo>
        </Passos>
        <IrPara destino="cadastros" onIrPara={irPara} />
      </>
    ),
  },

  // ─── Dia a dia ─────────────────────────────────────────────────────────────
  {
    id: 'cartao-do-dia',
    grupo: 'Dia a dia',
    titulo: 'Abrir o cartão do dia',
    resumo: 'Criar ou abrir a folha de produção de um produto e uma etapa.',
    palavras: 'ficha cartao criar abrir consultar data produto etapa variacao meta hora',
    conteudo: (irPara) => (
      <>
        <Paragrafo>Na tela <Campo>Ctrl. Produção</Campo>, use a barra azul do meio:</Paragrafo>
        <Passos>
          <Passo>Escolha a <Campo>DATA</Campo>, o <Campo>PRODUTO</Campo> e a <Campo>ETAPA</Campo>.</Passo>
          <Passo>Se a etapa tiver tipos (ex.: Soldagem → Cabos ou Retrabalho), aparece o campo <Campo>VARIAÇÃO</Campo>. Escolha o tipo, ou “sem variação”.</Passo>
          <Passo>Em <Campo>META/H</Campo>, informe a meta por hora que será sugerida em cada faixa.</Passo>
          <Passo>Clique em <Botao>Abrir / Criar</Botao>. Se o cartão já existir, ele é aberto; se não, é criado.</Passo>
        </Passos>
        <Paragrafo>
          <Botao>Consultar</Botao> só abre um cartão que já existe; não cria nada.
        </Paragrafo>
        <Aviso>
          Nunca existem dois cartões iguais (mesma data, produto, etapa e variação). Clicar em <Botao>Abrir / Criar</Botao> de
          novo só reabre o mesmo cartão.
        </Aviso>
        <IrPara destino="producao" onIrPara={irPara} />
      </>
    ),
  },
  {
    id: 'operadores-no-cartao',
    grupo: 'Dia a dia',
    titulo: 'Colocar e tirar operadores do cartão',
    resumo: 'Montar a escala de quem trabalhou naquela etapa.',
    palavras: 'escala adicionar remover operador cartao',
    conteudo: () => (
      <>
        <Passos>
          <Passo>Com o cartão aberto, use <Campo>+ Operador</Campo> (no lado direito da barra azul).</Passo>
          <Passo>Escolha o nome na lista e clique em <Botao>Adicionar</Botao>. Cada operador ganha uma coluna colorida na tabela.</Passo>
        </Passos>
        <Paragrafo>
          A lista mostra só operadores <b>ativos</b> que ainda não estão no cartão. Se alguém não aparece, confira em Cadastros
          se ele está desativado.
        </Paragrafo>
        <Aviso tom="perigo" titulo="O ✕ apaga na hora">
          O <Botao>✕</Botao> ao lado do nome tira o operador do cartão <b>e apaga todos os registros dele nesse cartão</b>,
          sem pedir confirmação. Use só para corrigir quem foi colocado por engano.
        </Aviso>
      </>
    ),
  },
  {
    id: 'lancar-producao',
    grupo: 'Dia a dia',
    titulo: 'Lançar a produção hora a hora',
    resumo: 'Digitar meta e realizado de cada operador em cada faixa e salvar.',
    palavras: 'lancar salvar registro meta realizado saldo faixa horario hora a hora meta padrao',
    conteudo: () => (
      <>
        <Paragrafo>Cada linha da tabela é uma faixa de horário. Cada operador tem quatro colunas: <Campo>META</Campo>, <Campo>REAL.</Campo>, <Campo>SALDO</Campo> e o botão de salvar.</Paragrafo>
        <Passos>
          <Passo>Na linha da faixa, confira a <Campo>META</Campo> (já vem preenchida com a meta padrão do cartão).</Passo>
          <Passo>Digite o <Campo>REAL.</Campo> (quantas peças foram feitas). A célula fica amarela: ainda não foi salva.</Passo>
          <Passo>Clique em <Botao>Salvar</Botao> naquela linha. O botão fica verde com <Botao>✓</Botao> por um instante: está gravado.</Passo>
        </Passos>
        <Lista>
          <li>O <Campo>SALDO</Campo> é calculado na hora (realizado − meta).</li>
          <li>Salvar de novo a mesma célula <b>corrige</b> o valor; não cria outro registro.</li>
          <li>O botão fica desabilitado enquanto a meta for zero.</li>
          <li>As colunas <Campo>TOT. REAL.</Campo>, <Campo>TOT. META</Campo> e <Campo>% ATING.</Campo> somam a linha; a última linha soma o dia.</li>
          <li><Campo>Meta padrão</Campo> (ao lado do número do cartão) muda a meta sugerida para as células que ainda não foram salvas.</li>
        </Lista>
        <Aviso tom="atencao">
          Valor digitado e não salvo se perde ao trocar de cartão ou de tela. Salve cada faixa assim que lançar.
        </Aviso>
      </>
    ),
  },
  {
    id: 'consultar-dias',
    grupo: 'Dia a dia',
    titulo: 'Ver dias e cartões anteriores',
    resumo: 'A lista de dias com registro e os cartões de cada dia.',
    palavras: 'historico consultar dias anteriores lista cartoes do dia voltar',
    conteudo: () => (
      <>
        <Paragrafo>Quando nenhum cartão está aberto, a tela mostra o que já existe:</Paragrafo>
        <Lista>
          <li><Campo>DIAS COM REGISTRO</Campo>: os últimos 14 dias com produção, com o número de cartões e a eficiência do dia. Clique em um dia para ver os cartões dele.</li>
          <li><Campo>CARTÕES DE ...</Campo>: um cartão por etapa e produto, com operadores, realizado × meta e a %. Clique para abrir.</li>
        </Lista>
        <Paragrafo>
          Dentro de um cartão, <Botao>← Cartões do dia</Botao> volta para essa lista, já com os totais atualizados.
          Para um dia mais antigo que os 14 da lista, escolha a data na barra azul e use <Botao>Consultar</Botao>.
        </Paragrafo>
      </>
    ),
  },
  {
    id: 'excluir-cartao',
    grupo: 'Dia a dia',
    titulo: 'Excluir um cartão',
    resumo: 'Apagar um cartão criado por engano, com tudo o que foi lançado nele.',
    palavras: 'excluir apagar deletar cartao ficha',
    conteudo: () => (
      <>
        <Passos>
          <Passo>Abra o cartão.</Passo>
          <Passo>Clique em <Botao>Excluir cartão</Botao> (no canto direito da faixa azul escura acima da tabela).</Passo>
          <Passo>Leia o aviso: ele mostra quantos operadores e registros serão apagados junto. Confirme em <Botao>Excluir cartão</Botao>.</Passo>
        </Passos>
        <Aviso tom="perigo">
          Não há como desfazer. Os operadores e o produto continuam cadastrados; só o cartão e seus lançamentos somem.
        </Aviso>
      </>
    ),
  },

  // ─── Painéis de TV ─────────────────────────────────────────────────────────
  {
    id: 'abrir-paineis',
    grupo: 'Painéis de TV',
    titulo: 'Abrir os painéis',
    resumo: 'Painel Detalhado (por operador) e Painel Geral (por etapa).',
    palavras: 'painel tv dashboard detalhado geral tela cheia carrossel',
    conteudo: (irPara) => (
      <>
        <Tabela
          cabecalho={['Painel', 'O que mostra']}
          linhas={[
            ['Painel Detalhado', 'Uma etapa por vez, com o desempenho de cada operador na faixa de horário escolhida.'],
            ['Painel Geral', 'Todas as etapas, com o total do dia e da faixa, sem detalhar operadores.'],
          ]}
        />
        <Paragrafo>Há dois caminhos para abrir:</Paragrafo>
        <Lista>
          <li>Menu <Botao>☰</Botao> → <Campo>Painel Produção</Campo> → <Campo>Painel Detalhado</Campo> ou <Campo>Painel Geral</Campo>.</li>
          <li>Em <Campo>Ctrl. Produção</Campo>, botão <Botao>Abrir Painel ▾</Botao> na barra escura do topo.</li>
        </Lista>
        <Paragrafo>O painel abre em uma janela própria, em tela cheia. Dentro dele:</Paragrafo>
        <Lista>
          <li>A cada 1 minuto ele passa sozinho para a próxima etapa (“carrossel”).</li>
          <li>Clicar em uma etapa na coluna da esquerda fixa aquela etapa e para o carrossel.</li>
          <li><Tecla>F11</Tecla> ou <Tecla>F</Tecla> entra e sai da tela cheia.</li>
        </Lista>
        <Aviso>
          Para mostrar o painel em uma TV sem ligar o computador nela, abra no navegador da TV o endereço de{' '}
          <Campo>ACESSO PELA REDE</Campo> seguido de <Campo>/dashboard</Campo> (veja “Acesso do gestor pelo navegador”).
        </Aviso>
        <IrPara destino="producao" onIrPara={irPara} />
      </>
    ),
  },
  {
    id: 'controlar-paineis',
    grupo: 'Painéis de TV',
    titulo: 'Escolher o que os painéis mostram',
    resumo: 'Data, produto e faixa de horário, enviados com o botão Atualizar.',
    palavras: 'atualizar painel faixa horario data produto fechar controle dos paineis',
    conteudo: () => (
      <>
        <Paragrafo>Os painéis não se atualizam sozinhos: você manda o que eles devem mostrar pela barra escura do topo de <Campo>Ctrl. Produção</Campo> (<Campo>CONTROLE DOS PAINÉIS DE PRODUÇÃO</Campo>).</Paragrafo>
        <Passos>
          <Passo>Escolha a <Campo>DATA</Campo>, o <Campo>PRODUTO</Campo> (ou “Todos”) e a <Campo>FAIXA DE HORÁRIO</Campo>.</Passo>
          <Passo>Clique em <Botao>Atualizar</Botao> do painel que quer mudar: o azul (<Campo>DETALHADO</Campo>) ou o verde (<Campo>GERAL</Campo>).</Passo>
          <Passo>Para fechar um painel, use <Botao>Fechar</Botao> ao lado do <Botao>Atualizar</Botao> dele.</Passo>
        </Passos>
        <Aviso>
          Ao abrir, o painel já mostra o dia de hoje, todos os produtos e a faixa de horário atual. Depois de lançar uma nova
          hora, clique em <Botao>Atualizar</Botao> para a TV mostrar os números novos. O gestor também consegue fazer isso pelo
          navegador.
        </Aviso>
      </>
    ),
  },

  // ─── Gestor pela rede ──────────────────────────────────────────────────────
  {
    id: 'acesso-rede',
    grupo: 'Gestor pela rede',
    titulo: 'Acesso do gestor pelo navegador',
    resumo: 'Ver e editar a produção de outro computador ou celular da mesma rede.',
    palavras: 'gestor navegador celular rede link endereco ip web dashboard firewall',
    conteudo: () => (
      <>
        <Passos>
          <Passo>Copie o endereço que aparece em <Campo>ACESSO PELA REDE</Campo>, no topo do programa.</Passo>
          <Passo>No computador ou celular do gestor, conectado à <b>mesma rede</b> da fábrica, abra esse endereço no navegador.</Passo>
        </Passos>
        <Tabela
          cabecalho={['Página', 'O que dá para fazer']}
          linhas={[
            ['Controle de Produção', 'O mesmo que no programa: ver dias e cartões, abrir ou criar cartão, colocar operadores, lançar e salvar as horas, mudar a meta padrão, excluir cartão e atualizar o painel da TV. No celular as horas aparecem em cartões, uma embaixo da outra.'],
            ['Dashboard', 'Painel com filtros de data, produto e faixa. Atualiza sozinho a cada 60 segundos.'],
          ]}
        />
        <Aviso tom="atencao">
          O programa precisa estar <b>aberto</b> no computador do líder para o link funcionar. Se o gestor não conseguir
          acessar, confira se está na mesma rede e se o Firewall do Windows liberou o programa.
        </Aviso>
        <Aviso tom="perigo">
          Não há senha: qualquer pessoa na rede que tiver o endereço consegue editar. Compartilhe o link só com quem precisa.
        </Aviso>
      </>
    ),
  },

  // ─── Cadastros ─────────────────────────────────────────────────────────────
  {
    id: 'cadastros',
    grupo: 'Cadastros',
    titulo: 'Operadores, produtos e etapas',
    resumo: 'Criar, editar, buscar, desativar e excluir.',
    palavras: 'cadastro operador produto etapa novo editar buscar inativo versao descricao',
    conteudo: (irPara) => (
      <>
        <Paragrafo>A tela <Campo>Cadastros</Campo> tem três abas: <Campo>Operadores</Campo>, <Campo>Produtos</Campo> e <Campo>Etapas</Campo>. Todas funcionam do mesmo jeito:</Paragrafo>
        <Lista>
          <li><Botao>+ Novo ...</Botao> abre o formulário. Campos com <span className="text-red-500">*</span> são obrigatórios.</li>
          <li><Botao>Editar</Botao> muda o cadastro. Os cartões antigos passam a mostrar o nome novo.</li>
          <li><Botao>Desativar</Botao> tira o item das listas de escolha; <Botao>Reativar</Botao> devolve.</li>
          <li><Botao>Excluir</Botao> apaga (veja “Desativar ou excluir?”).</li>
          <li>A caixa de busca filtra a lista; <Campo>Mostrar inativos</Campo> exibe também os desativados.</li>
        </Lista>
        <Subtitulo>Regras de cada cadastro</Subtitulo>
        <Lista>
          <li><b>Operador</b>: só o nome. É salvo em letras maiúsculas.</li>
          <li><b>Produto</b>: nome, versão (opcional, ex.: 1.0 ou v2) e descrição. O mesmo nome pode existir em versões diferentes.</li>
          <li><b>Etapa</b>: nome e descrição. A ordem de cadastro é a ordem em que aparecem nos painéis.</li>
          <li>Nomes repetidos são recusados, mesmo com diferença de acento ou de maiúscula (“João” e “JOAO” são o mesmo).</li>
        </Lista>
        <IrPara destino="cadastros" onIrPara={irPara} />
      </>
    ),
  },
  {
    id: 'variacoes',
    grupo: 'Cadastros',
    titulo: 'Variações de uma etapa',
    resumo: 'Tipos dentro de uma etapa, como Cabos e Retrabalho na Soldagem.',
    palavras: 'variacao tipo etapa soldagem cabos retrabalho gravacao firmware imei serial',
    conteudo: () => (
      <>
        <Paragrafo>
          Use variações quando a mesma etapa tem tipos de trabalho com metas diferentes e você quer ver cada um separado nos
          painéis e na análise.
        </Paragrafo>
        <Passos>
          <Passo>Em <Campo>Cadastros → Etapas</Campo>, clique no <Botao>▸</Botao> à esquerda da etapa.</Passo>
          <Passo>Digite o nome em <Campo>Nova variação</Campo> e clique em <Botao>+ Adicionar variação</Botao>.</Passo>
          <Passo>Cada variação tem <Botao>Editar</Botao>, <Botao>Desativar</Botao> e <Botao>Excluir</Botao> (a exclusão pede confirmação na própria linha).</Passo>
        </Passos>
        <Paragrafo>Etapas sem variação (como Montagem) continuam funcionando normalmente.</Paragrafo>
      </>
    ),
  },
  {
    id: 'desativar-ou-excluir',
    grupo: 'Cadastros',
    titulo: 'Desativar ou excluir?',
    resumo: 'O que acontece com os cartões em cada caso.',
    palavras: 'desativar excluir apagar inativo historico cartoes perder dados',
    conteudo: () => (
      <>
        <Tabela
          cabecalho={['Ação', 'O que acontece com os cartões já lançados']}
          linhas={[
            ['Desativar (qualquer item)', 'Nada. O histórico continua nos painéis e na análise; o item só some das listas para cartões novos. Dá para reativar.'],
            ['Excluir produto', 'Todos os cartões desse produto são apagados, com seus lançamentos.'],
            ['Excluir etapa', 'Todos os cartões dessa etapa e as variações dela são apagados.'],
            ['Excluir variação', 'Os cartões que usam essa variação são apagados.'],
            ['Excluir operador', 'Os cartões continuam, mas ele sai das escalas e os lançamentos dele somem (os totais diminuem).'],
          ]}
        />
        <Aviso tom="atencao">
          Antes de excluir, o programa mostra quantos cartões, escalas e registros serão apagados. Para quem saiu da empresa ou
          produto que não é mais feito, prefira <b>Desativar</b>.
        </Aviso>
      </>
    ),
  },

  // ─── Análise ───────────────────────────────────────────────────────────────
  {
    id: 'analise-filtros',
    grupo: 'Análise de desempenho',
    titulo: 'Escolher o que analisar',
    resumo: 'Operador, produto, etapa e período (mínimo de 1 semana).',
    palavras: 'analise filtros periodo semana operador produto etapa historico corrigir',
    conteudo: (irPara) => (
      <>
        <Paragrafo>Todos os filtros ficam na barra azul do topo da tela <Campo>Análise</Campo>:</Paragrafo>
        <Lista>
          <li><Campo>OPERADOR</Campo>: só aparecem operadores com registros (os desativados aparecem marcados “inativo”).</li>
          <li><Campo>PRODUTO</Campo> e <Campo>ETAPA EM QUE ATUOU</Campo>: mudam conforme o operador, mostrando só onde ele trabalhou.</li>
          <li><Campo>VARIAÇÃO</Campo>: aparece só quando existe mais de uma opção.</li>
          <li><Campo>PERÍODO</Campo>: no mínimo 7 dias e no máximo 366.</li>
        </Lista>
        <Paragrafo>
          Atalhos: <Botao>7 dias</Botao> <Botao>14 dias</Botao> <Botao>30 dias</Botao> <Botao>90 dias</Botao> terminam hoje;
          <Botao>Histórico</Botao> pega do primeiro ao último registro daquela combinação.
        </Paragrafo>
        <Aviso>
          Se o período ficar com menos de 7 dias, a análise some e aparece a mensagem com o motivo. <Botao>Corrigir período</Botao> ajusta para o período válido mais próximo.
          Se não houver registros no período, use <Botao>Ver período com dados</Botao>.
        </Aviso>
        <IrPara destino="analise" onIrPara={irPara} />
      </>
    ),
  },
  {
    id: 'analise-ler',
    grupo: 'Análise de desempenho',
    titulo: 'Como ler a análise',
    resumo: 'Indicadores, gráficos, pontos críticos, mapa dia × hora e tabela por faixa.',
    palavras: 'analise eficiencia consistencia tendencia critico grafico mapa tabela dia hora semana',
    conteudo: () => (
      <>
        <Subtitulo>Análise geral</Subtitulo>
        <Tabela
          cabecalho={['Indicador', 'Como ler']}
          linhas={[
            ['Eficiência global', 'Tudo o que foi produzido ÷ todas as metas do período. Embaixo, a média simples dos dias.'],
            ['Produzido × metas', 'As duas somas e o saldo em peças.'],
            ['Consistência', 'Quanto o resultado varia de um dia para o outro. Alta (até 10% de oscilação), moderada (até 20%) ou baixa. Precisa de 3 dias com registro.'],
            ['Registros e meta horária', 'Em quantos dias úteis houve registro e qual foi a meta por hora usada.'],
          ]}
        />
        <Paragrafo>Abaixo vêm o melhor e o pior dia, e o melhor e o pior horário.</Paragrafo>
        <Subtitulo>Gráficos</Subtitulo>
        <Lista>
          <li><b>Realizado × meta por dia</b>: cada barra é um dia. <b>Clique em uma barra</b> para ver aquele dia hora a hora no gráfico ao lado.</li>
          <li><b>Realizado × meta por hora</b>: <Botao>Dia escolhido</Botao> mostra um dia; <Botao>Média do período</Botao> mostra a média de cada faixa.</li>
          <li><b>Tendência</b>: <Botao>No período</Botao> (dia a dia, média móvel e linha de tendência), <Botao>Semana a semana</Botao> e <Botao>Dia da semana</Botao>. Para dizer se está subindo ou caindo, precisa de 5 dias com registro.</li>
        </Lista>
        <Paragrafo>Passe o mouse sobre um gráfico para ver os números.</Paragrafo>
        <Subtitulo>Análise detalhada</Subtitulo>
        <Lista>
          <li><b>Dias, horários e ocorrências críticas</b>: tudo abaixo de 80% da meta, dos piores para os menos piores.</li>
          <li><b>Dia a dia, hora a hora</b>: realizado / meta de cada faixa de cada dia. Clique em um dia para vê-lo no gráfico por hora.</li>
          <li><b>Meta horária × realizado, por faixa</b>: compara cada faixa em todo o período e diz em quantos dias ficou abaixo.</li>
        </Lista>
        <Aviso tom="atencao" titulo="Sem registro não é zero">
          Hora ou dia sem lançamento fica de fora das contas e aparece como <b>—</b> ou barra cinza. Só conta como zero a hora em
          que alguém lançou realizado 0. Sábados e domingos só aparecem quando houve produção.
        </Aviso>
      </>
    ),
  },

  // ─── Dados ─────────────────────────────────────────────────────────────────
  {
    id: 'dados-backup',
    grupo: 'Dados e atualizações',
    titulo: 'Onde ficam os dados e as cópias de segurança',
    resumo: 'O arquivo do banco e a pasta de backups.',
    palavras: 'banco dados arquivo backup copia seguranca pasta appdata sqlite',
    conteudo: () => (
      <>
        <Paragrafo>Todos os dados ficam em um único arquivo neste computador:</Paragrafo>
        <div className="rounded-lg bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-100">
          %APPDATA%\Gestão de Manufatura\bd_estoque.sqlite
        </div>
        <Paragrafo>
          Para abrir a pasta: <Tecla>Win</Tecla> + <Tecla>R</Tecla>, digite <Campo>%APPDATA%\Gestão de Manufatura</Campo> e
          aperte <Tecla>Enter</Tecla>. Ao lado do arquivo fica a pasta <Campo>backups</Campo>, onde o programa guarda uma cópia
          automática sempre que uma atualização precisa mudar a estrutura do banco.
        </Paragrafo>
        <Aviso tom="atencao">
          Faça você também, de vez em quando, uma cópia do arquivo <Campo>bd_estoque.sqlite</Campo> para um pendrive ou outra
          pasta, com o programa fechado. Não renomeie nem mova a pasta: o programa a procura por esse nome.
        </Aviso>
      </>
    ),
  },
  {
    id: 'atualizacoes',
    grupo: 'Dados e atualizações',
    titulo: 'Atualizações do programa',
    resumo: 'Como as novas versões chegam.',
    palavras: 'atualizacao versao nova instalar reiniciar',
    conteudo: () => (
      <>
        <Paragrafo>
          O programa instalado procura novas versões sozinho. Quando uma é baixada, ele avisa e pede para reiniciar. Ao abrir a
          nova versão pela primeira vez, ele atualiza o banco de dados automaticamente e guarda a cópia de segurança na pasta{' '}
          <Campo>backups</Campo>.
        </Paragrafo>
        <Aviso tom="atencao">
          Se aparecer uma mensagem de erro ao abrir depois de uma atualização, não apague nada da pasta do programa. Anote a
          mensagem e procure o responsável pelo sistema: a cópia de antes da atualização está em <Campo>backups</Campo>.
        </Aviso>
      </>
    ),
  },

  // ─── Perguntas ─────────────────────────────────────────────────────────────
  {
    id: 'perguntas',
    grupo: 'Perguntas frequentes',
    titulo: 'Perguntas frequentes',
    resumo: 'Dúvidas comuns do dia a dia.',
    palavras: 'duvidas faq problema nao aparece duplicado corrigir erro',
    conteudo: () => (
      <div className="flex flex-col gap-2">
        <Pergunta pergunta="Se eu clicar duas vezes em Salvar, a produção é duplicada?">
          Não. Cada operador tem um único registro por faixa em cada cartão. Salvar de novo só atualiza o valor.
        </Pergunta>
        <Pergunta pergunta="Lancei um número errado. Como corrijo?">
          Abra o cartão, digite o valor certo na célula e clique em Salvar de novo.
        </Pergunta>
        <Pergunta pergunta="Um operador não aparece na lista para adicionar ao cartão.">
          Ou ele já está no cartão, ou está desativado. Confira em Cadastros → Operadores, marcando “Mostrar inativos”.
        </Pergunta>
        <Pergunta pergunta="A TV não mostra o que acabei de lançar.">
          Os painéis do programa só mudam quando alguém clica em Atualizar (em Ctrl. Produção ou na página do gestor).
          O Dashboard aberto pelo navegador atualiza sozinho a cada 60 segundos.
        </Pergunta>
        <Pergunta pergunta="O gestor não consegue abrir o link.">
          O programa precisa estar aberto no computador do líder, os dois precisam estar na mesma rede e o Firewall do Windows
          precisa permitir o programa. O endereço pode mudar se o computador trocar de rede; confira sempre o que aparece em
          ACESSO PELA REDE.
        </Pergunta>
        <Pergunta pergunta="Na análise, por que um dia aparece cinza?">
          Porque não houve registro naquele dia. Ele não conta como produção zero; só fica de fora das contas.
        </Pergunta>
        <Pergunta pergunta="Um operador mudou de nome ou foi digitado errado.">
          Use Editar em Cadastros. O nome muda em todos os cartões, inclusive nos antigos.
        </Pergunta>
        <Pergunta pergunta="Posso apagar um operador que saiu da empresa?">
          Pode, mas os lançamentos dele somem dos cartões. Para manter o histórico, use Desativar.
        </Pergunta>
      </div>
    ),
  },
];

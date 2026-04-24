import { useState, useEffect } from "react";

const BRAPI_TOKEN = process.env.NEXT_PUBLIC_BRAPI_TOKEN;

const blogPosts = [
  {
    id: 5, tag: "Análise", tagColor: "#7c8aff",
    titulo: "Análise Técnica ou Fundamentalista: qual usar para operar na B3?",
    resumo: "Se você já ficou em dúvida sobre qual método usar antes de comprar uma ação, este artigo é para você. Entenda as diferenças, as aplicações e como combinar as duas abordagens.",
    tempo: "10 min", data: "22 Abr 2025",
    conteudo: `Se você já ficou em dúvida sobre qual método usar antes de comprar uma ação, este artigo é para você. O mercado financeiro desenvolveu duas grandes escolas de análise — a fundamentalista e a técnica — e entender a diferença entre elas pode mudar completamente a forma como você toma decisões de investimento.\n\nO mercado de ações abriga uma enorme variedade de empresas, com características bastante distintas entre si. Há empresas de grande capitalização (large caps), consolidadas e que distribuem dividendos regulares. Há empresas de menor porte (small caps), com maior potencial de crescimento e volatilidade. Diante dessa diversidade, surge a questão central: como decidir em qual ativo investir e qual o momento certo?\n\nA ANÁLISE FUNDAMENTALISTA\n\nA análise fundamentalista parte da premissa de que o preço de uma ação reflete, no longo prazo, o valor real do negócio. Seu objetivo é estimar o valor intrínseco de uma empresa e compará-lo ao preço de mercado atual.\n\nO analista fundamentalista investiga os resultados financeiros (receita, lucro, margens), indicadores de valor como P/L e P/VPA, o posicionamento competitivo e o cenário macroeconômico. É a abordagem preferida por investidores de longo prazo que mantêm posições por meses ou anos.\n\nA ANÁLISE TÉCNICA\n\nA análise técnica parte de uma premissa diferente: toda a informação relevante já está refletida no preço. O analista técnico estuda o comportamento histórico dos preços para identificar padrões que antecipem movimentos futuros.\n\nBaseada na Teoria de Dow, utiliza gráficos de candlesticks, suportes, resistências e indicadores como médias móveis, MACD e RSI. Para o trader técnico, a pergunta não é "essa é uma boa empresa?", mas "esse é o momento certo para comprar ou vender?". É a abordagem preferida por traders de swing trade e day trade.\n\nCOMO COMBINAR AS DUAS ABORDAGENS\n\nMuitos investidores experientes combinam as duas escolas. A estratégia mais comum é usar a análise fundamentalista como filtro de seleção e a análise técnica como ferramenta de timing.\n\nExemplo prático com ITUB4: o trader filtra bancos com ROE acima de 18% e histórico de dividendos — restando ITUB4 e BBDC4. Em seguida, aplica análise técnica e observa que ITUB4 passou por correção de 12% e se aproxima de suporte relevante coincidindo com a média móvel de 21 períodos. Um candlestick de reversão (martelo) se forma nessa região.\n\nO setup definido: entrada em R$ 27,80, stop em R$ 26,90 e alvos em R$ 29,80 e R$ 31,20 — relação risco/retorno de 1:2,2. A fundamentação qualitativa reforça a convicção, mas não altera os parâmetros técnicos de risco.\n\nAmbas as abordagens têm histórico comprovado de sucesso. A escolha entre elas — ou a combinação de ambas — depende do seu perfil de risco, horizonte de investimento e estilo operacional.`,
  },
  {
    id: 1, tag: "Básico", tagColor: "#00e87a",
    titulo: "O que são as maiores altas da B3?",
    resumo: "Entenda como funciona o ranking de maiores altas diárias e por que ele é uma das ferramentas mais usadas por traders de curto prazo na bolsa brasileira.",
    tempo: "4 min", data: "18 Abr 2025",
    conteudo: `As maiores altas da B3 representam as ações com maior variação percentual positiva no pregão do dia. Esse ranking é atualizado em tempo real durante o horário de negociação (10h às 17h) e é amplamente utilizado por traders para identificar oportunidades de momentum.\n\nUm movimento de alta expressivo pode ser desencadeado por diferentes fatores: divulgação de resultados acima do esperado, notícias corporativas positivas, entrada de capital estrangeiro ou simplesmente um aumento de volume sem catalisador aparente.\n\nÉ importante diferenciar uma alta saudável, com volume elevado e consistência, de um spike pontual de baixa liquidez. Ações com poucos negócios no dia podem registrar variações de 15–20% com apenas algumas ordens.\n\nPara usar o ranking de maiores altas de forma eficiente, combine a variação percentual com o volume financeiro. Uma alta de 8% com volume de R$ 5M tem muito menos credibilidade do que a mesma alta com R$ 200M negociados.`,
  },
  {
    id: 2, tag: "Análise", tagColor: "#f0a500",
    titulo: "Volume financeiro: o termômetro da liquidez",
    resumo: "O volume financeiro é um dos indicadores mais ignorados por iniciantes e mais valorizados por traders experientes. Veja como interpretá-lo no contexto da B3.",
    tempo: "6 min", data: "15 Abr 2025",
    conteudo: `O volume financeiro representa o total de reais negociados em um ativo durante o pregão. Ele é calculado multiplicando a quantidade de ações negociadas pelo preço médio de cada transação.\n\nNa prática, o volume é o principal indicador de participação do mercado em um movimento de preço. Uma alta ou baixa expressiva acompanhada de volume acima da média histórica tende a ser mais confiável e duradoura.\n\nNo contexto do Radar B3, exibimos o volume financeiro do dia ao lado de cada ação justamente para que você possa fazer essa avaliação de imediato. Ações com variação maior que 5% e volume acima de R$ 100M geralmente indicam movimentos com maior consistência.\n\nUm conceito avançado ligado ao volume é o VWAP (Volume Weighted Average Price). Ele representa o preço médio de todas as transações do dia e é usado como referência por fundos e instituições para avaliar se compraram ou venderam a um preço justo.`,
  },
  {
    id: 3, tag: "Estratégia", tagColor: "#7c8aff",
    titulo: "Swing Trade vs Day Trade: qual combina com você?",
    resumo: "Dois estilos, dois perfis de operador. Entenda as diferenças práticas entre swing trade e day trade no mercado brasileiro e como escolher o mais adequado.",
    tempo: "8 min", data: "10 Abr 2025",
    conteudo: `Day trade e swing trade são os dois principais estilos de operação de curto prazo na B3. Embora ambos usem análise técnica e monitorem movimentações diárias, as diferenças entre eles são significativas.\n\nO day trade exige que todas as posições sejam abertas e encerradas no mesmo pregão. Isso demanda atenção constante ao mercado e uma tolerância psicológica elevada. A tributação é de 20% sobre o lucro líquido, sem isenção.\n\nO swing trade mantém posições por dias ou semanas, capturando movimentos mais amplos de tendência. Exige menos tempo de tela e permite uma análise mais tranquila. A tributação é de 15% sobre o lucro, com isenção para vendas mensais abaixo de R$ 20.000.\n\nPara quem está começando, o swing trade tende a ser mais adequado. O ranking de maiores altas e baixas é especialmente útil para swing traders identificarem candidatos a operações no dia seguinte.`,
  },
  {
    id: 4, tag: "Guia", tagColor: "#ff6b6b",
    titulo: "Como abrir conta em uma corretora para investir na B3",
    resumo: "Passo a passo completo para abrir sua conta em uma corretora brasileira e começar a investir na bolsa de valores com segurança.",
    tempo: "5 min", data: "05 Abr 2025",
    conteudo: `Abrir uma conta em uma corretora no Brasil é um processo 100% digital, gratuito e leva menos de 10 minutos. As principais corretoras do país — XP, Rico, Clear, BTG e Inter — oferecem conta sem taxa de manutenção.\n\nOs documentos necessários são simples: CPF, RG ou CNH, comprovante de residência recente e uma foto selfie para validação biométrica. Todo o processo é feito pelo aplicativo ou site da corretora.\n\nApós a aprovação, você pode transferir recursos via TED ou Pix diretamente para sua conta. O dinheiro fica disponível para negociação no mesmo dia.\n\nUma dica importante: verifique se a corretora escolhida oferece a plataforma de negociação adequada ao seu perfil. Para day trade, plataformas como Profit (Nelogica) são essenciais. Para swing trade, o home broker padrão já é suficiente.\n\nLembre-se que todas as corretoras brasileiras são reguladas pela CVM e têm os recursos protegidos pelo mecanismo de ressarcimento de prejuízos (MRP) da B3.`,
  },
];

function formatVolume(v) {
  if (!v) return "—";
  if (v >= 1e9) return `R$ ${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `R$ ${(v / 1e6).toFixed(0)}M`;
  return `R$ ${(v / 1e3).toFixed(0)}K`;
}
function formatPreco(p) {
  if (!p) return "—";
  return p.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatSetor(setor) {
  if (!setor) return null;
  const map = {
    "Consumer Non-Durables": "Consumo",
    "Consumer Durables": "Consumo",
    "Consumer Services": "Serviços",
    "Health Technology": "Saúde",
    "Health Services": "Saúde",
    "Finance": "Finanças",
    "Financial Conglomerates": "Finanças",
    "Technology Services": "Tecnologia",
    "Electronic Technology": "Tecnologia",
    "Energy Minerals": "Energia",
    "Industrial Services": "Indústria",
    "Producer Manufacturing": "Indústria",
    "Process Industries": "Indústria",
    "Transportation": "Transporte",
    "Utilities": "Utilidades",
    "Commercial Services": "Serviços",
    "Retail Trade": "Varejo",
    "Distribution Services": "Distribuição",
    "Communications": "Telecom",
    "Telecommunication Services": "Telecom",
    "Non-Energy Minerals": "Mineração",
    "Real Estate": "Imóveis",
    "Miscellaneous": null,
    "Investment Trusts/Mutual Funds": null,
  };
  return map[setor] !== undefined ? map[setor] : setor.split(" ")[0];
}

function formatPorte(marketCap) {
  if (!marketCap) return null;
  if (marketCap >= 10e9) return "Large Cap";
  if (marketCap >= 2e9) return "Mid Cap";
  return "Small Cap";
}

// ─── FERIADOS B3 (mês/dia) ────────────────────────────────────────────────────
// Feriados fixos — válidos para qualquer ano
const FERIADOS_FIXOS = [
  "01-01", // Confraternização Universal
  "21-04", // Tiradentes
  "01-05", // Dia do Trabalho
  "07-09", // Independência
  "12-10", // Nossa Senhora Aparecida
  "02-11", // Finados
  "15-11", // Proclamação da República
  "20-11", // Consciência Negra
  "24-12", // Véspera de Natal
  "25-12", // Natal
  "31-12", // Véspera de Ano Novo
];

// Feriados móveis por ano (Carnaval e Corpus Christi mudam todo ano)
const FERIADOS_MOVEIS = {
  2025: ["03-03","04-03","18-04","19-06"],
  2026: ["16-02","17-02","03-04","04-06"],
  2027: ["08-02","09-02","26-03","24-06"],
};

function isFeriadoB3(data) {
  const dia = String(data.getDate()).padStart(2,"0");
  const mes = String(data.getMonth()+1).padStart(2,"0");
  const ano = data.getFullYear();
  const chave = `${dia}-${mes}`;
  if (FERIADOS_FIXOS.includes(chave)) return true;
  const moveis = FERIADOS_MOVEIS[ano] || [];
  return moveis.includes(chave);
}

function getPregaoStatus() {
  const agora = new Date();
  const diaSemana = agora.getDay();
  const totalMin = agora.getHours() * 60 + agora.getMinutes();
  const fimDeSemana = diaSemana === 0 || diaSemana === 6;
  const feriado = isFeriadoB3(agora);

  if (fimDeSemana || feriado) return {
    cor:"#555", pulsar:false, label:"MERCADO FECHADO", bgBorder:"rgba(255,255,255,0.06)"
  };
  if (totalMin >= 540 && totalMin < 600) return {
    cor:"#f0a500", pulsar:false, label:"PRÉ-ABERTURA · B3", bgBorder:"rgba(240,165,0,0.2)"
  };
  if (totalMin >= 600 && totalMin < 1020) return {
    cor:"#00e87a", pulsar:true, label:"AO VIVO · B3", bgBorder:"rgba(0,232,122,0.15)"
  };
  if (totalMin >= 1020 && totalMin < 1050) return {
    cor:"#f0a500", pulsar:false, label:"LEILÃO DE FECHAMENTO", bgBorder:"rgba(240,165,0,0.2)"
  };
  return {
    cor:"#555", pulsar:false, label:"MERCADO FECHADO", bgBorder:"rgba(255,255,255,0.06)"
  };
}

function StockCard({ stock, rank, tipo, animate }) {
  const isAlta = tipo === "alta";
  const intensity = 1 - (rank - 1) / 10;
  const bgAlta  = `rgba(0,${Math.round(180+intensity*60)},${Math.round(80+intensity*40)},${0.08+intensity*0.10})`;
  const bgBaixa = `rgba(${Math.round(200+intensity*55)},${Math.round(20+intensity*10)},${Math.round(30+intensity*10)},${0.08+intensity*0.10})`;
  const bdAlta  = `rgba(0,${Math.round(210+intensity*45)},100,${0.2+intensity*0.4})`;
  const bdBaixa = `rgba(${Math.round(220+intensity*35)},40,50,${0.2+intensity*0.4})`;
  const cor = isAlta ? "#00e87a" : "#ff5050";
  const corNum = isAlta ? "#00ff8c" : "#ff4444";
  const setor = formatSetor(stock.setor);
  const porte = formatPorte(stock.marketCap);

  return (
    <div style={{
      background: isAlta ? bgAlta : bgBaixa,
      border: `1px solid ${isAlta ? bdAlta : bdBaixa}`,
      borderRadius:"10px", padding:"12px 14px",
      display:"flex", alignItems:"center", gap:"12px",
      transition:`all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${rank * 0.07}s`,
      cursor:"default",
    }}>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:isAlta?"rgba(0,230,120,0.45)":"rgba(255,80,80,0.45)", width:"18px", minWidth:"18px", textAlign:"center", flexShrink:0, fontWeight:600 }}>
        {rank}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", width:"90px", minWidth:"90px", flexShrink:0 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"15px", fontWeight:800, color:cor, letterSpacing:"0.04em", whiteSpace:"nowrap", lineHeight:1 }}>
          {stock.ticker}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", fontWeight:700, color:corNum, lineHeight:1 }}>
          {stock.variacao > 0 ? "+" : ""}{stock.variacao.toFixed(2)}%
        </div>
      </div>
      <div style={{ width:"1px", height:"34px", background:"rgba(255,255,255,0.08)", flexShrink:0 }} />
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", flex:1 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.85)", fontWeight:500, whiteSpace:"nowrap" }}>
          {formatPreco(stock.preco)}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>
          Vol {formatVolume(stock.volume)}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"5px", alignItems:"flex-end", flexShrink:0 }}>
        {setor && (
          <div style={{ background:`${cor}15`, border:`1px solid ${cor}35`, borderRadius:"4px", padding:"2px 7px", fontFamily:"'DM Mono',monospace", fontSize:"9px", color:`${cor}CC`, letterSpacing:"0.07em", whiteSpace:"nowrap", textTransform:"uppercase" }}>
            {setor}
          </div>
        )}
        {porte && (
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.05em" }}>
            {porte}
          </div>
        )}
      </div>
      <div style={{ fontSize:"13px", flexShrink:0, opacity:0.4 }}>{isAlta?"▲":"▼"}</div>
    </div>
  );
}

function SkeletonCard({ rank }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"10px", padding:"12px 14px", display:"flex", alignItems:"center", gap:"12px", animation:"pulse 1.5s infinite" }}>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.2)", width:"18px", minWidth:"18px", textAlign:"center" }}>{rank}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:"6px", width:"90px", minWidth:"90px" }}>
        <div style={{ height:"14px", background:"rgba(255,255,255,0.07)", borderRadius:"4px", width:"60px" }} />
        <div style={{ height:"12px", background:"rgba(255,255,255,0.05)", borderRadius:"4px", width:"45px" }} />
      </div>
      <div style={{ width:"1px", height:"34px", background:"rgba(255,255,255,0.05)", flexShrink:0 }} />
      <div style={{ display:"flex", flexDirection:"column", gap:"6px", flex:1 }}>
        <div style={{ height:"13px", background:"rgba(255,255,255,0.07)", borderRadius:"4px", width:"80px" }} />
        <div style={{ height:"10px", background:"rgba(255,255,255,0.05)", borderRadius:"4px", width:"60px" }} />
      </div>
    </div>
  );
}

function ColHeader({ tipo }) {
  const isAlta = tipo === "alta";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px", paddingBottom:"10px", borderBottom:`1px solid ${isAlta?"rgba(0,230,120,0.2)":"rgba(255,70,70,0.2)"}` }}>
      <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:isAlta?"#00e87a":"#ff4444", boxShadow:`0 0 10px ${isAlta?"#00e87a":"#ff4444"}`, animation:"pulse 2s infinite" }} />
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px", letterSpacing:"0.12em", textTransform:"uppercase", color:isAlta?"#00e87a":"#ff4444" }}>
        {isAlta?"Maiores Altas":"Maiores Baixas"}
      </span>
      <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>TOP 10</span>
    </div>
  );
}

function Navbar({ page, setPage }) {
  return (
    <nav style={{
      position:"relative", zIndex:10,
      display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
      maxWidth:"860px", margin:"0 auto 28px",
      padding:"10px 14px",
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:"12px",
    }}>
      <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px", color:"#fff", letterSpacing:"-0.02em" }}>
          RADAR <span style={{ color:"#00e87a" }}>B3</span>
        </span>
      </button>
      <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", justifyContent:"center" }}>
        {[
          {label:"Dashboard", key:"home"},
          {label:"Blue Chips", key:"bluechips"},
          {label:"Análises", key:"mercado"},
          {label:"Blog", key:"blog"},
        ].map(({label,key}) => (
          <button key={key} onClick={() => setPage(key)} style={{
            background: page===key ? (key==="bluechips" ? "rgba(30,144,255,0.15)" : key==="mercado" ? "rgba(255,165,0,0.15)" : "rgba(0,232,122,0.1)") : "none",
            border: page===key ? (key==="bluechips" ? "1px solid rgba(30,144,255,0.4)" : key==="mercado" ? "1px solid rgba(255,165,0,0.4)" : "1px solid rgba(0,232,122,0.25)") : "1px solid transparent",
            borderRadius:"8px", padding:"6px 12px", cursor:"pointer",
            fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500,
            color: page===key ? (key==="bluechips" ? "#1e90ff" : key==="mercado" ? "#ffa500" : "#00e87a") : "rgba(255,255,255,0.4)",
            letterSpacing:"0.04em", transition:"all 0.2s", whiteSpace:"nowrap",
          }}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── BLUE CHIP CARD ───────────────────────────────────────────────────────────
function BlueChipCard({ stock, rank }) {
  const isAlta = stock.variacao >= 0;
  const cor = isAlta ? "#00e87a" : "#ff5050";
  const corNum = isAlta ? "#00ff8c" : "#ff4444";
  const bgCard = isAlta
    ? "rgba(0,180,80,0.06)"
    : "rgba(200,30,30,0.06)";
  const bdCard = isAlta
    ? "rgba(0,200,100,0.18)"
    : "rgba(220,50,50,0.18)";
  const setor = formatSetor(stock.setor);
  const porte = formatPorte(stock.marketCap);

  return (
    <div style={{
      background: bgCard,
      border: `1px solid ${bdCard}`,
      borderRadius:"10px", padding:"12px 16px",
      display:"flex", alignItems:"center", gap:"14px",
      transition:"all 0.3s ease",
      animation:`fadeUp 0.4s ease ${rank * 0.04}s both`,
    }}>
      {/* Rank */}
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)", width:"22px", minWidth:"22px", textAlign:"center", flexShrink:0, fontWeight:600 }}>
        {rank}
      </div>

      {/* Ticker + Variação */}
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", width:"90px", minWidth:"90px", flexShrink:0 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"15px", fontWeight:800, color:cor, letterSpacing:"0.04em", lineHeight:1 }}>
          {stock.ticker}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", fontWeight:700, color:corNum, lineHeight:1 }}>
          {isAlta?"+":""}{stock.variacao.toFixed(2)}%
        </div>
      </div>

      {/* Divider */}
      <div style={{ width:"1px", height:"34px", background:"rgba(255,255,255,0.08)", flexShrink:0 }} />

      {/* Preço + Volume */}
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", flex:1 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.85)", fontWeight:500 }}>
          {formatPreco(stock.preco)}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.35)" }}>
          Vol {formatVolume(stock.volume)}
        </div>
      </div>

      {/* Setor + Porte */}
      <div style={{ display:"flex", flexDirection:"column", gap:"5px", alignItems:"flex-end", flexShrink:0 }}>
        {setor && (
          <div style={{ background:`${cor}15`, border:`1px solid ${cor}35`, borderRadius:"4px", padding:"2px 7px", fontFamily:"'DM Mono',monospace", fontSize:"9px", color:`${cor}CC`, letterSpacing:"0.07em", whiteSpace:"nowrap", textTransform:"uppercase" }}>
            {setor}
          </div>
        )}
        {porte && (
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(255,255,255,0.25)" }}>
            {porte}
          </div>
        )}
      </div>

      {/* Seta */}
      <div style={{ fontSize:"13px", flexShrink:0, opacity:0.4 }}>{isAlta?"▲":"▼"}</div>
    </div>
  );
}

// ─── PÁGINA BLUE CHIPS ────────────────────────────────────────────────────────
function BlueChipsPage() {
  const [chips, setChips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const timeStr = lastUpdate
    ? lastUpdate.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" })
    : "";

  async function fetchBlueChips() {
    try {
      setErro(null);

      // Busca por volume — ordena pelo maior volume
      const url = `https://brapi.dev/api/quote/list?token=${BRAPI_TOKEN}&sortBy=volume&sortOrder=desc&limit=100&type=stock`;
      const res = await fetch(url);
      const json = await res.json();
      const stocks = json.stocks || [];

      const filtradas = stocks.filter(s =>
        s.stock && s.close > 0 &&
        s.change !== null && s.change !== undefined &&
        s.volume > 0 &&
        s.market_cap >= 10e9 && // apenas Large Caps (Big Caps)
        /^[A-Z]{4}\d{1,2}$/.test(s.stock)
      );

      if (filtradas.length > 0) {
        // Pega as 10 com maior volume e ordena por variação %
        const top10 = filtradas.slice(0, 10);
        const ordenadas = [...top10].sort((a, b) => b.change - a.change);

        setChips(ordenadas.map(s => ({
          ticker: s.stock,
          preco: s.close,
          variacao: s.change,
          volume: s.volume * s.close,
          setor: s.sector || null,
          marketCap: s.market_cap || null,
        })));
      } else {
        // Fallback fora do pregão — lista fixa das principais Large Caps da B3
        // Fallback fora do pregão — 1 lote de 10 Large Caps
        const lotes = [
          "PETR4,VALE3,ITUB4,BBDC4,ABEV3,WEGE3,BBAS3,SUZB3,GGBR4,RDOR3",
        ];
        const resultados = await Promise.all(
          lotes.map(l =>
            fetch(`https://brapi.dev/api/quote/${l}?token=${BRAPI_TOKEN}`)
              .then(r => r.json()).then(d => d.results || []).catch(() => [])
          )
        );
        const validas = resultados.flat().filter(s =>
          s && s.regularMarketPrice > 0
        );
        const ordenadas = [...validas].sort((a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent);

        setChips(ordenadas.map(s => ({
          ticker: s.symbol,
          preco: s.regularMarketPrice,
          variacao: s.regularMarketChangePercent,
          volume: (s.regularMarketVolume || 0) * s.regularMarketPrice,
          setor: s.sector || null,
          marketCap: s.marketCap || null,
        })));
      }

      setLastUpdate(new Date());
      setLoading(false);
    } catch (e) {
      setErro("Não foi possível carregar os dados.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlueChips();
    const interval = setInterval(fetchBlueChips, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position:"relative", zIndex:2, maxWidth:"600px", margin:"0 auto" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"28px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"rgba(30,144,255,0.06)", border:"1px solid rgba(30,144,255,0.2)", borderRadius:"6px", padding:"4px 14px", marginBottom:"10px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#1e90ff", boxShadow:"0 0 8px #1e90ff", animation:"pulse 2s infinite" }} />
          <span style={{ fontSize:"10px", letterSpacing:"0.2em", color:"rgba(30,144,255,0.8)", textTransform:"uppercase" }}>
            BLUE CHIPS · B3
          </span>
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", color:"#fff", letterSpacing:"-0.02em", marginBottom:"6px" }}>
          Top 10 por <span style={{ color:"#1e90ff" }}>Volume</span>
        </h2>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>
          Selecionadas pelo maior volume financeiro · Classificadas por variação %
          {timeStr ? ` · Atualizado às ${timeStr}` : ""}
        </p>
      </div>

      {erro && (
        <div style={{ background:"rgba(255,68,68,0.08)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"10px", padding:"16px", textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,100,100,0.8)", marginBottom:"20px" }}>
          {erro}
        </div>
      )}

      {/* Cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {loading
          ? Array.from({length:15}, (_,i) => <SkeletonCard key={i} rank={i+1} />)
          : chips.map((s, i) => <BlueChipCard key={s.ticker} stock={s} rank={i+1} />)
        }
      </div>

      {/* Ad banner */}
      <div style={{ maxWidth:"728px", margin:"32px auto 0", height:"90px", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.02)" }}>
        <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.15em", textTransform:"uppercase" }}>Espaço publicitário · 728×90</span>
      </div>
    </div>
  );
}

// ─── PÁGINA MERCADO — HISTOGRAMA ──────────────────────────────────────────────
function MercadoPage() {
  const [variacoes, setVariacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [hover, setHover] = useState(null);

  const timeStr = lastUpdate
    ? lastUpdate.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" })
    : "";

  async function fetchMercado() {
    try {
      // Busca as 80 ações com maior volume em 8 lotes de 10
      const lotes = [
        "PETR4,VALE3,ITUB4,BBDC4,ABEV3,WEGE3,RENT3,BBAS3,SUZB3,GGBR4",
        "PRIO3,RDOR3,RADL3,EQTL3,TOTS3,EMBR3,JBSS3,CSAN3,SBSP3,CPFE3",
        "ELET3,CMIG4,VIVT3,TIMS3,CYRE3,MRVE3,LREN3,HAPV3,BPAC11,BEEF3",
        "MGLU3,COGN3,IRBR3,USIM5,CSNA3,GGBR3,BRFS3,SLCE3,AGRO3,ARZZ3",
        "SOMA3,HBSA3,RECV3,RRRP3,VBBR3,JHSF3,MOVI3,TEND3,GFSA3,MRVE3",
        "OIBR3,AZUL4,GOLL4,CVCB3,YDUQ3,NTCO3,MYPK3,RAIL3,CCRO3,ECOR3",
        "ENEV3,ENGI11,TAEE11,TRPL4,EGIE3,AURE3,CSMG3,SAPR11,ODPV3,FLRY3",
        "LWSA3,PETZ3,AMER3,VIIA3,SEER3,ROMI3,FRAS3,TUPY3,UNIP6,PTBL3",
      ];

      const resultados = await Promise.all(
        lotes.map(l =>
          fetch(`https://brapi.dev/api/quote/${l}?token=${BRAPI_TOKEN}`)
            .then(r => r.json())
            .then(d => d.results || [])
            .catch(() => [])
        )
      );

      const validas = resultados.flat()
        .filter(s => s && s.regularMarketChangePercent !== null && s.regularMarketChangePercent !== undefined)
        .map(s => ({
          ticker: s.symbol,
          variacao: s.regularMarketChangePercent,
        }));

      setVariacoes(validas);
      setLastUpdate(new Date());
      setLoading(false);
    } catch(e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMercado();
    const iv = setInterval(fetchMercado, 60000);
    return () => clearInterval(iv);
  }, []);

  // Monta os buckets do histograma
  const FAIXAS = [
    {label:"< -8%",  min:-Infinity, max:-8},
    {label:"-8 a -6",min:-8,        max:-6},
    {label:"-6 a -4",min:-6,        max:-4},
    {label:"-4 a -2",min:-4,        max:-2},
    {label:"-2 a  0",min:-2,        max: 0},
    {label:" 0 a +2",min: 0,        max: 2},
    {label:"+2 a +4",min: 2,        max: 4},
    {label:"+4 a +6",min: 4,        max: 6},
    {label:"+6 a +8",min: 6,        max: 8},
    {label:"> +8%",  min: 8,        max:Infinity},
  ];

  const buckets = FAIXAS.map((f, i) => ({
    ...f,
    idx: i,
    acoes: variacoes.filter(v => v.variacao >= f.min && v.variacao < f.max),
    count: variacoes.filter(v => v.variacao >= f.min && v.variacao < f.max).length,
  }));

  const maxCount = Math.max(...buckets.map(b => b.count), 1);
  const total = variacoes.length;
  const positivas = variacoes.filter(v => v.variacao >= 0).length;
  const negativas = variacoes.filter(v => v.variacao < 0).length;
  const mediaVar = total > 0 ? (variacoes.reduce((a,b) => a + b.variacao, 0) / total).toFixed(2) : "0.00";

  // Curva de densidade suave (gaussiana aproximada)
  const W = 600; const H = 200; const PAD = 40;
  const bW = (W - PAD*2) / buckets.length;

  const curvaPoints = buckets.map((b, i) => {
    const x = PAD + i * bW + bW/2;
    const y = PAD + (H - PAD*2) - ((b.count / maxCount) * (H - PAD*2));
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{ position:"relative", zIndex:2, maxWidth:"860px", margin:"0 auto" }}>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"28px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"rgba(255,165,0,0.06)", border:"1px solid rgba(255,165,0,0.2)", borderRadius:"6px", padding:"4px 14px", marginBottom:"10px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#ffa500", boxShadow:"0 0 8px #ffa500", animation:"pulse 2s infinite" }} />
          <span style={{ fontSize:"10px", letterSpacing:"0.2em", color:"rgba(255,165,0,0.8)", textTransform:"uppercase" }}>
            DISTRIBUIÇÃO · B3
          </span>
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", color:"#fff", letterSpacing:"-0.02em", marginBottom:"6px" }}>
          Distribuição de <span style={{ color:"#ffa500" }}>Variações</span>
        </h2>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>
          80 ações por volume · Agrupadas por faixa de variação %
          {timeStr ? ` · Atualizado às ${timeStr}` : ""}
        </p>
      </div>

      {/* KPIs */}
      {!loading && (
        <div style={{ display:"flex", gap:"12px", justifyContent:"center", marginBottom:"28px", flexWrap:"wrap" }}>
          {[
            { label:"Total", valor:`${total} ações`, cor:"rgba(255,255,255,0.6)" },
            { label:"Em alta", valor:`${positivas}`, cor:"#00e87a" },
            { label:"Em baixa", valor:`${negativas}`, cor:"#ff5050" },
            { label:"Média", valor:`${mediaVar > 0 ? "+" : ""}${mediaVar}%`, cor: parseFloat(mediaVar) >= 0 ? "#00e87a" : "#ff5050" },
          ].map(k => (
            <div key={k.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px", padding:"10px 20px", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)", marginBottom:"4px", letterSpacing:"0.08em" }}>{k.label}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px", color:k.cor }}>{k.valor}</div>
            </div>
          ))}
        </div>
      )}

      {/* Título seção 1 */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,165,0,0.6)", letterSpacing:"0.15em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
          Histograma — Visão geral do mercado
        </span>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
      </div>

      {/* Histograma */}
      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"12px", padding:"24px", marginBottom:"20px" }}>
        {loading ? (
          <div style={{ height:"240px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>
            Carregando dados...
          </div>
        ) : (
          <div style={{ position:"relative" }}>
            {/* Barras */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:"4px", height:"200px", padding:"0 8px" }}>
              {buckets.map((b, i) => {
                const isPos = b.min >= 0;
                const isNeg = b.max <= 0;
                const cor = isPos ? "#00e87a" : isNeg ? "#ff4444" : "#f0a500";
                const altura = maxCount > 0 ? (b.count / maxCount) * 180 : 0;
                const isHov = hover === i;

                return (
                  <div
                    key={i}
                    style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", cursor:"pointer" }}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {/* Tooltip */}
                    {isHov && (
                      <div style={{
                        position:"absolute", top:0, background:"rgba(0,0,0,0.85)",
                        border:`1px solid ${cor}40`, borderRadius:"6px", padding:"8px 12px",
                        fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#fff",
                        zIndex:10, whiteSpace:"nowrap", pointerEvents:"none",
                        left:"50%", transform:"translateX(-50%)",
                      }}>
                        <div style={{ color:cor, fontWeight:700, marginBottom:"4px" }}>{b.label}%</div>
                        <div>{b.count} ação{b.count !== 1 ? "ões" : ""}</div>
                        {b.acoes.slice(0,5).map(a => (
                          <div key={a.ticker} style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px" }}>
                            {a.ticker} {a.variacao > 0 ? "+" : ""}{a.variacao.toFixed(2)}%
                          </div>
                        ))}
                        {b.acoes.length > 5 && <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"10px" }}>+{b.acoes.length - 5} mais</div>}
                      </div>
                    )}

                    {/* Contador */}
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color: b.count > 0 ? cor : "transparent" }}>
                      {b.count}
                    </div>

                    {/* Barra */}
                    <div style={{
                      width:"100%", height:`${altura}px`,
                      background: isHov ? cor : `${cor}88`,
                      borderRadius:"4px 4px 0 0",
                      transition:"all 0.2s",
                      minHeight: b.count > 0 ? "4px" : "0",
                    }} />
                  </div>
                );
              })}
            </div>

            {/* Curva SVG sobre as barras */}
            {buckets.some(b => b.count > 0) && (
              <svg
                style={{ position:"absolute", top:20, left:8, right:8, pointerEvents:"none" }}
                width="100%" height="200px"
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
              >
                <polyline
                  points={curvaPoints}
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />
                {buckets.map((b, i) => {
                  const x = PAD + i * bW + bW/2;
                  const y = PAD + (H - PAD*2) - ((b.count / maxCount) * (H - PAD*2));
                  if (b.count === 0) return null;
                  return <circle key={i} cx={x} cy={y} r="3" fill="rgba(255,255,255,0.6)" />;
                })}
              </svg>
            )}

            {/* Eixo X */}
            <div style={{ display:"flex", gap:"4px", padding:"8px 8px 0", borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:"4px" }}>
              {buckets.map((b, i) => (
                <div key={i} style={{ flex:1, textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"8px", color:"rgba(255,255,255,0.3)", lineHeight:1.2 }}>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legenda */}
      <div style={{ display:"flex", gap:"20px", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)", marginBottom:"40px" }}>
        <span><span style={{ color:"#00e87a" }}>■</span> Variação positiva</span>
        <span><span style={{ color:"#ff4444" }}>■</span> Variação negativa</span>
        <span><span style={{ color:"rgba(255,255,255,0.4)" }}>----</span> Curva de distribuição</span>
      </div>

      {/* Título seção 2 */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"32px 0 16px" }}>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,165,0,0.6)", letterSpacing:"0.15em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
          Índices Mundiais — Contexto global
        </span>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
      </div>

      {/* Gráfico de Linhas — Índices Mundiais */}
      <IndicesMundiaisChart />

      {/* Título seção 3 */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"32px 0 16px" }}>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,165,0,0.6)", letterSpacing:"0.15em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
          Busca de Ação — Análise individual
        </span>
        <div style={{ height:"1px", flex:1, background:"rgba(255,165,0,0.2)" }} />
      </div>

      {/* Busca de Ticker */}
      <TickerChart />
    </div>
  );
}

// ─── BUSCA DE TICKER ──────────────────────────────────────────────────────────
function TickerChart() {
  const [input, setInput] = useState("");
  const [ticker, setTicker] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [hoverX, setHoverX] = useState(null);

  async function buscarTicker() {
    const t = input.trim().toUpperCase();
    if (!t) return;
    setLoading(true);
    setErro(null);
    setDados(null);
    setTicker(t);

    try {
      const res = await fetch(
        `https://brapi.dev/api/quote/${t}?range=1mo&interval=1d&token=${BRAPI_TOKEN}`
      );
      const json = await res.json();
      const result = json.results?.[0];

      if (!result || !result.regularMarketPrice) {
        setErro("Ticker não encontrado.");
        setLoading(false);
        return;
      }

      const hist = result.historicalDataPrice || [];
      if (hist.length < 2) {
        setErro("Dados históricos insuficientes para este ticker.");
        setLoading(false);
        return;
      }

      // Calcula % acumulada base 0
      const base = hist[0].close;
      const pontos = hist
        .filter(p => p.close)
        .map(p => ({
          data: p.date,
          pct: ((p.close - base) / base) * 100,
          preco: p.close,
        }));

      setDados({
        nome: result.shortName || t,
        ticker: t,
        preco: result.regularMarketPrice,
        variacao: result.regularMarketChangePercent,
        pontos,
      });
      setLoading(false);
    } catch {
      setErro("Erro ao buscar dados. Tente novamente.");
      setLoading(false);
    }
  }

  const isAlta = dados?.variacao >= 0;
  const cor = isAlta ? "#00e87a" : "#ff5050";

  // SVG do gráfico
  const W = 800; const H = 220; const PL = 50; const PR = 20; const PT = 20; const PB = 30;
  const gW = W - PL - PR;
  const gH = H - PT - PB;

  const renderGrafico = () => {
    if (!dados?.pontos?.length) return null;
    const pts = dados.pontos;
    const valores = pts.map(p => p.pct);
    const minY = Math.min(...valores, -1);
    const maxY = Math.max(...valores, 1);
    const rangeY = maxY - minY || 1;

    const toX = (i) => PL + (i / (pts.length - 1)) * gW;
    const toY = (v) => PT + gH - ((v - minY) / rangeY) * gH;

    const linhaPoints = pts.map((p, i) => `${toX(i)},${toY(p.pct)}`).join(" ");
    const areaPoints = `${toX(0)},${toY(minY)} ${linhaPoints} ${toX(pts.length-1)},${toY(minY)}`;

    const gridLines = [minY, 0, maxY].filter((v,i,a) => a.indexOf(v) === i);
    const labelDatas = pts.filter((_, i) => i % 5 === 0 || i === pts.length - 1);

    return (
      <div style={{ position:"relative" }}>
        <svg
          width="100%" viewBox={`0 0 ${W} ${H}`}
          style={{ display:"block", cursor:"crosshair" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const xRel = (e.clientX - rect.left) / rect.width * W;
            const idx = Math.round((xRel - PL) / gW * (pts.length - 1));
            if (idx >= 0 && idx < pts.length) setHoverX(idx);
          }}
          onMouseLeave={() => setHoverX(null)}
        >
          <defs>
            <linearGradient id="tickerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={cor} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grade */}
          {gridLines.map(v => (
            <g key={v}>
              <line x1={PL} y1={toY(v)} x2={W-PR} y2={toY(v)}
                stroke={v===0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}
                strokeWidth={v===0 ? 1.5 : 1} strokeDasharray={v===0?"none":"3 3"} />
              <text x={PL-4} y={toY(v)+4} textAnchor="end"
                fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">
                {v >= 0 ? "+" : ""}{v.toFixed(1)}%
              </text>
            </g>
          ))}

          {/* Labels X */}
          {labelDatas.map((p, i) => {
            const idx = pts.indexOf(p);
            const dt = new Date(p.data * 1000);
            const label = `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}`;
            return (
              <text key={i} x={toX(idx)} y={H-8} textAnchor="middle"
                fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="monospace">
                {label}
              </text>
            );
          })}

          {/* Linha vertical hover */}
          {hoverX !== null && (
            <line x1={toX(hoverX)} y1={PT} x2={toX(hoverX)} y2={H-PB}
              stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          )}

          {/* Área preenchida */}
          <polygon points={areaPoints} fill="url(#tickerGrad)" />

          {/* Linha */}
          <polyline points={linhaPoints} fill="none" stroke={cor}
            strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* Ponto hover */}
          {hoverX !== null && (
            <circle cx={toX(hoverX)} cy={toY(pts[hoverX].pct)} r="4" fill={cor} />
          )}
        </svg>

        {/* Tooltip */}
        {hoverX !== null && (
          <div style={{
            position:"absolute", top:16, left:60,
            background:"rgba(10,12,15,0.95)",
            border:`1px solid ${cor}40`,
            borderRadius:"8px", padding:"8px 12px",
            fontFamily:"'DM Mono',monospace", fontSize:"11px",
            pointerEvents:"none",
          }}>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"10px", marginBottom:"4px" }}>
              {(() => {
                const dt = new Date(dados.pontos[hoverX].data * 1000);
                return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
              })()}
            </div>
            <div style={{ color:cor, fontWeight:700 }}>
              {dados.pontos[hoverX].pct >= 0 ? "+" : ""}{dados.pontos[hoverX].pct.toFixed(2)}%
            </div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"10px" }}>
              R$ {dados.pontos[hoverX].preco.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFractionDigits:2})}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ marginBottom:"40px" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"20px" }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px", color:"#fff", marginBottom:"4px" }}>
          Buscar <span style={{ color:"#ffa500" }}>Ação</span>
        </h3>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>
          Digite o ticker e veja a variação % acumulada dos últimos 30 dias
        </p>
      </div>

      {/* Campo de busca */}
      <div style={{ display:"flex", gap:"8px", maxWidth:"400px", margin:"0 auto 20px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === "Enter" && buscarTicker()}
          placeholder="Ex: PETR4, VALE3, MGLU3..."
          style={{
            flex:1, background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.15)",
            borderRadius:"8px", padding:"10px 14px",
            fontFamily:"'DM Mono',monospace", fontSize:"13px",
            color:"#fff", outline:"none",
            letterSpacing:"0.05em",
          }}
        />
        <button
          onClick={buscarTicker}
          style={{
            background:"rgba(255,165,0,0.15)", border:"1px solid rgba(255,165,0,0.4)",
            borderRadius:"8px", padding:"10px 18px", cursor:"pointer",
            fontFamily:"'DM Mono',monospace", fontSize:"12px",
            color:"#ffa500", fontWeight:600, whiteSpace:"nowrap",
          }}
        >
          BUSCAR
        </button>
      </div>

      {/* Resultado */}
      {loading && (
        <div style={{ textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>
          Buscando {ticker}...
        </div>
      )}

      {erro && (
        <div style={{ textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"#ff5050", padding:"20px",
          background:"rgba(255,68,68,0.06)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"10px", maxWidth:"400px", margin:"0 auto" }}>
          {erro}
        </div>
      )}

      {dados && !loading && (
        <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${cor}30`, borderRadius:"12px", padding:"20px" }}>
          {/* Info do ticker */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:cor }}>
                {dados.ticker}
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)" }}>
                {dados.nome}
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"16px", color:"rgba(255,255,255,0.85)", fontWeight:500 }}>
                {formatPreco(dados.preco)}
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:cor, fontWeight:700 }}>
                {dados.variacao >= 0 ? "+" : ""}{dados.variacao?.toFixed(2)}% hoje
              </div>
            </div>
          </div>
          {renderGrafico()}
        </div>
      )}
    </div>
  );
}

// ─── GRÁFICO ÍNDICES MUNDIAIS ─────────────────────────────────────────────────
const INDICES = [
  { ticker:"%5EGSPC",  nome:"S&P 500",      cor:"#4af0a0", grossura:1.5 },
  { ticker:"%5EIXIC",  nome:"Nasdaq",        cor:"#4ab8ff", grossura:1.5 },
  { ticker:"%5ESTOXX50E", nome:"Euro Stoxx", cor:"#c084fc", grossura:1.5 },
  { ticker:"%5EN225",  nome:"Nikkei 225",    cor:"#fb923c", grossura:1.5 },
  { ticker:"%5EFTSE",  nome:"FTSE 100",      cor:"#facc15", grossura:1.5 },
  { ticker:"%5EBVSP",  nome:"Ibovespa",      cor:"#00e87a", grossura:3   },
];

function IndicesMundiaisChart() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverX, setHoverX] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    async function fetchIndices() {
      try {
        const resultados = await Promise.all(
          INDICES.map(idx =>
            fetch(`https://brapi.dev/api/quote/${idx.ticker}?range=1mo&interval=1d&token=${BRAPI_TOKEN}`)
              .then(r => r.json())
              .then(d => {
                const hist = d.results?.[0]?.historicalDataPrice || [];
                return { ...idx, hist };
              })
              .catch(() => ({ ...idx, hist: [] }))
          )
        );

        // Pega todas as datas únicas ordenadas
        const todasDatas = [...new Set(
          resultados.flatMap(r => r.hist.map(p => p.date))
        )].sort();

        // Para cada série, normaliza para % acumulada desde o dia 0
        const seriesProcessadas = resultados.map(r => {
          // Monta mapa de data → preço
          const mapaPrecos = {};
          r.hist.forEach(p => { if (p.close) mapaPrecos[p.date] = p.close; });

          // Interpola gaps
          const precos = [];
          let ultimoPreco = null;
          todasDatas.forEach(d => {
            if (mapaPrecos[d]) {
              ultimoPreco = mapaPrecos[d];
              precos.push(mapaPrecos[d]);
            } else if (ultimoPreco) {
              precos.push(ultimoPreco); // interpolação pelo último valor
            } else {
              precos.push(null);
            }
          });

          // Normaliza: % acumulada desde o primeiro preço válido
          const primeiroValido = precos.find(p => p !== null);
          const pctAcumulada = precos.map(p =>
            p !== null && primeiroValido ? ((p - primeiroValido) / primeiroValido) * 100 : null
          );

          return { ...r, datas: todasDatas, pct: pctAcumulada };
        });

        setSeries(seriesProcessadas);
        setLoading(false);
      } catch(e) {
        setLoading(false);
      }
    }
    fetchIndices();
  }, []);

  if (loading) return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"12px", padding:"24px", height:"300px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>
      Carregando índices mundiais...
    </div>
  );

  if (!series.length || !series[0].datas?.length) return null;

  const datas = series[0]?.datas || [];
  const W = 800; const H = 280; const PL = 50; const PR = 20; const PT = 20; const PB = 30;
  const gW = W - PL - PR;
  const gH = H - PT - PB;

  // Range Y
  const todosValores = series.flatMap(s => s.pct.filter(v => v !== null));
  const minY = Math.min(...todosValores, -1);
  const maxY = Math.max(...todosValores, 1);
  const rangeY = maxY - minY || 1;

  const toX = (i) => PL + (i / (datas.length - 1)) * gW;
  const toY = (v) => PT + gH - ((v - minY) / rangeY) * gH;

  // Linhas de grade Y
  const gridLines = [-4,-2,0,2,4].filter(v => v >= minY && v <= maxY);

  // Labels datas (a cada 5 dias)
  const labelDatas = datas.filter((_, i) => i % 5 === 0 || i === datas.length - 1);

  return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"12px", padding:"24px", marginBottom:"20px" }}>

      {/* Título */}
      <div style={{ marginBottom:"16px" }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"#fff", marginBottom:"4px" }}>
          Variação Acumulada — <span style={{ color:"#ffa500" }}>Últimos 30 dias</span>
        </h3>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>
          Base 0% no primeiro dia · Interpolação nos gaps · Fechamento diário
        </p>
      </div>

      {/* SVG do gráfico */}
      <div style={{ position:"relative", overflowX:"auto" }}>
        <svg
          width="100%" viewBox={`0 0 ${W} ${H}`}
          style={{ display:"block", cursor:"crosshair" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const xRel = (e.clientX - rect.left) / rect.width * W;
            const idx = Math.round((xRel - PL) / gW * (datas.length - 1));
            if (idx >= 0 && idx < datas.length) {
              setHoverX(idx);
              setTooltipData({
                data: datas[idx],
                valores: series.map(s => ({ nome: s.nome, cor: s.cor, val: s.pct[idx] }))
              });
            }
          }}
          onMouseLeave={() => { setHoverX(null); setTooltipData(null); }}
        >
          {/* Grade horizontal */}
          {gridLines.map(v => (
            <g key={v}>
              <line x1={PL} y1={toY(v)} x2={W-PR} y2={toY(v)}
                stroke={v === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}
                strokeWidth={v === 0 ? 1.5 : 1}
                strokeDasharray={v === 0 ? "none" : "3 3"}
              />
              <text x={PL-4} y={toY(v)+4} textAnchor="end"
                fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">
                {v > 0 ? "+" : ""}{v}%
              </text>
            </g>
          ))}

          {/* Labels eixo X */}
          {labelDatas.map(d => {
            const i = datas.indexOf(d);
            const dt = new Date(d * 1000);
            const label = `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}`;
            return (
              <text key={d} x={toX(i)} y={H-8} textAnchor="middle"
                fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="monospace">
                {label}
              </text>
            );
          })}

          {/* Linha vertical do hover */}
          {hoverX !== null && (
            <line x1={toX(hoverX)} y1={PT} x2={toX(hoverX)} y2={H-PB}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
          )}

          {/* Séries — Ibovespa por último para ficar na frente */}
          {[...series.filter(s => s.nome !== "Ibovespa"), ...series.filter(s => s.nome === "Ibovespa")].map(s => {
            const pontos = s.pct
              .map((v, i) => v !== null ? `${toX(i)},${toY(v)}` : null)
              .filter(Boolean)
              .join(" ");

            const isIbov = s.nome === "Ibovespa";

            return (
              <g key={s.nome}>
                <polyline
                  points={pontos}
                  fill="none"
                  stroke={s.cor}
                  strokeWidth={isIbov ? 3 : 1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity={isIbov ? 1 : 0.7}
                />
                {/* Ponto final */}
                {s.pct[s.pct.length-1] !== null && (
                  <circle
                    cx={toX(s.pct.length-1)}
                    cy={toY(s.pct[s.pct.length-1])}
                    r={isIbov ? 4 : 2.5}
                    fill={s.cor}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltipData && (
          <div style={{
            position:"absolute", top:16, right:16,
            background:"rgba(10,12,15,0.95)",
            border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:"8px", padding:"10px 14px",
            fontFamily:"'DM Mono',monospace", fontSize:"11px",
            pointerEvents:"none", minWidth:"160px",
          }}>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"10px", marginBottom:"8px" }}>
              {(() => {
                const dt = new Date(tooltipData.data * 1000);
                return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
              })()}
            </div>
            {tooltipData.valores.map(v => (
              <div key={v.nome} style={{ display:"flex", justifyContent:"space-between", gap:"16px", marginBottom:"4px" }}>
                <span style={{ color: v.nome === "Ibovespa" ? v.cor : "rgba(255,255,255,0.5)", fontWeight: v.nome === "Ibovespa" ? 700 : 400 }}>
                  {v.nome}
                </span>
                <span style={{ color: v.val === null ? "rgba(255,255,255,0.2)" : v.val >= 0 ? "#00e87a" : "#ff5050" }}>
                  {v.val === null ? "—" : `${v.val >= 0 ? "+" : ""}${v.val.toFixed(2)}%`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legenda */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"12px", marginTop:"16px", justifyContent:"center" }}>
        {series.map(s => (
          <div key={s.nome} style={{ display:"flex", alignItems:"center", gap:"6px", fontFamily:"'DM Mono',monospace", fontSize:"10px" }}>
            <div style={{ width: s.nome==="Ibovespa" ? "20px" : "16px", height: s.nome==="Ibovespa" ? "3px" : "2px", background:s.cor, borderRadius:"2px" }} />
            <span style={{ color: s.nome==="Ibovespa" ? s.cor : "rgba(255,255,255,0.45)", fontWeight: s.nome==="Ibovespa" ? 700 : 400 }}>
              {s.nome}
            </span>
            {s.pct?.length > 0 && s.pct[s.pct.length-1] !== null && (
              <span style={{ color: s.pct[s.pct.length-1] >= 0 ? "#00e87a" : "#ff5050" }}>
                {s.pct[s.pct.length-1] >= 0 ? "+" : ""}{s.pct[s.pct.length-1].toFixed(2)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post, onClick, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(post)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)", border:`1px solid ${hov?"rgba(0,232,122,0.25)":"rgba(255,255,255,0.07)"}`, borderRadius:"12px", padding:"20px", cursor:"pointer", transition:"all 0.25s ease", transform:hov?"translateY(-2px)":"translateY(0)", animation:`fadeUp 0.4s ease ${index*0.08}s both` }}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:600, color:post.tagColor, background:`${post.tagColor}18`, border:`1px solid ${post.tagColor}40`, borderRadius:"4px", padding:"2px 8px", letterSpacing:"0.08em" }}>{post.tag}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>{post.data} · {post.tempo} de leitura</span>
      </div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"#fff", lineHeight:1.3, marginBottom:"8px", letterSpacing:"-0.01em" }}>{post.titulo}</h3>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>{post.resumo}</p>
      <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"14px", fontFamily:"'DM Mono',monospace", fontSize:"11px", color:hov?"#00e87a":"rgba(255,255,255,0.3)", transition:"color 0.2s" }}>
        Ler artigo <span style={{ fontSize:"14px" }}>→</span>
      </div>
    </div>
  );
}

function BlogPostView({ post, onBack, onDashboard }) {
  return (
    <div style={{ maxWidth:"640px", margin:"0 auto", position:"relative", zIndex:2 }}>
      <button onClick={onBack} style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"6px 14px", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", marginBottom:"28px", display:"flex", alignItems:"center", gap:"6px" }}>
        ← Voltar ao Blog
      </button>
      <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"16px" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:600, color:post.tagColor, background:`${post.tagColor}18`, border:`1px solid ${post.tagColor}40`, borderRadius:"4px", padding:"2px 8px" }}>{post.tag}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>{post.data} · {post.tempo} de leitura</span>
      </div>
      <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(22px,4vw,30px)", color:"#fff", lineHeight:1.2, letterSpacing:"-0.02em", marginBottom:"24px" }}>{post.titulo}</h1>
      <div style={{ height:"1px", background:"linear-gradient(90deg,rgba(0,232,122,0.4),transparent)", marginBottom:"28px" }} />
      {post.conteudo.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.65)", lineHeight:1.9, marginBottom:"20px" }}>{para}</p>
      ))}
      <div style={{ marginTop:"36px", background:"rgba(0,232,122,0.06)", border:"1px solid rgba(0,232,122,0.2)", borderRadius:"12px", padding:"20px 24px" }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"14px", color:"#00e87a", marginBottom:"6px" }}>Veja o mercado agora</p>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", marginBottom:"14px", lineHeight:1.6 }}>
          Acompanhe as maiores altas e baixas da B3 em tempo real no Radar B3.
        </p>
        <button onClick={onDashboard} style={{ background:"#00e87a", color:"#0a0c0f", border:"none", borderRadius:"8px", padding:"10px 20px", cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"12px", letterSpacing:"0.05em" }}>
          VER RADAR AO VIVO →
        </button>
      </div>
    </div>
  );
}

function BlogPage({ onDashboard }) {
  const [postAberto, setPostAberto] = useState(null);
  if (postAberto) return <BlogPostView post={postAberto} onBack={() => setPostAberto(null)} onDashboard={onDashboard} />;
  return (
    <div style={{ position:"relative", zIndex:2, maxWidth:"860px", margin:"0 auto" }}>
      <div style={{ marginBottom:"28px", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>Aprenda sobre o mercado</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(22px,4vw,32px)", color:"#fff", letterSpacing:"-0.02em" }}>Blog <span style={{ color:"#00e87a" }}>Radar B3</span></h2>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)", marginTop:"8px" }}>Conteúdo para traders e investidores da bolsa brasileira</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
        {blogPosts.map((post, i) => <BlogCard key={post.id} post={post} onClick={setPostAberto} index={i} />)}
      </div>
    </div>
  );
}

function DashboardPage({ timeStr, altas, baixas, loading, erro }) {
  const [status, setStatus] = useState({ cor:"#555", pulsar:false, label:"...", bgBorder:"rgba(255,255,255,0.06)" });
  const [ibov, setIbov] = useState(null);
  const [dolar, setDolar] = useState(null);

  useEffect(() => {
    setStatus(getPregaoStatus());
    const iv = setInterval(() => setStatus(getPregaoStatus()), 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    async function fetchIndicadores() {
      try {
        // Ibovespa
        const resIbov = await fetch(`https://brapi.dev/api/quote/%5EBVSP?token=${BRAPI_TOKEN}`);
        const jsonIbov = await resIbov.json();
        const bvsp = jsonIbov.results?.[0];
        if (bvsp) setIbov({ valor: bvsp.regularMarketPrice, variacao: bvsp.regularMarketChangePercent });

        // Dólar via endpoint de câmbio
        const resDolar = await fetch(`https://brapi.dev/api/v2/currency?currency=USD-BRL&token=${BRAPI_TOKEN}`);
        const jsonDolar = await resDolar.json();
        const usd = jsonDolar.currency?.[0];
        if (usd) setDolar({ valor: parseFloat(usd.bidPrice), variacao: parseFloat(usd.percentageChange) });
      } catch {}
    }
    fetchIndicadores();
    const iv = setInterval(fetchIndicadores, 60000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginBottom:"28px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.03)", border:`1px solid ${erro?"rgba(255,68,68,0.3)":status.bgBorder}`, borderRadius:"6px", padding:"4px 14px", marginBottom:"10px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:erro?"#ff4444":status.cor, boxShadow:(erro||status.pulsar)?`0 0 8px ${erro?"#ff4444":status.cor}`:"none", animation:(erro||status.pulsar)?"pulse 1.5s infinite":"none", transition:"background 0.5s" }} />
          <span style={{ fontSize:"10px", letterSpacing:"0.2em", color:erro?"rgba(255,100,100,0.7)":status.cor==="#555"?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.6)", textTransform:"uppercase" }}>
            {erro?"ERRO AO CARREGAR":loading?"CARREGANDO...":status.label}
          </span>
        </div>
        <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>
          {status.pulsar ? `Maiores movimentações do dia ${timeStr?`· Atualizado às ${timeStr}`:""}` : ""}
        </p>

        {/* Ibovespa + Dólar */}
        {(ibov || dolar) && (
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", marginTop:"6px", letterSpacing:"0.04em" }}>
            {ibov && (
              <span>
                IBOV{" "}
                <span style={{ color:"rgba(255,255,255,0.75)" }}>
                  {ibov.valor.toLocaleString("pt-BR", { minimumFractionDigits:0, maximumFractionDigits:0 })}
                </span>
                {" "}
                <span style={{ color: ibov.variacao >= 0 ? "#00e87a" : "#ff5050" }}>
                  {ibov.variacao >= 0 ? "+" : ""}{ibov.variacao.toFixed(2)}%
                </span>
              </span>
            )}
            {ibov && dolar && (
              <span style={{ color:"rgba(255,255,255,0.2)", margin:"0 10px" }}>·</span>
            )}
            {dolar && (
              <span>
                USD/BRL{" "}
                <span style={{ color:"rgba(255,255,255,0.75)" }}>
                  R$ {dolar.valor.toLocaleString("pt-BR", { minimumFractionDigits:2, maximumFractionDigits:2 })}
                </span>
                {" "}
                <span style={{ color: dolar.variacao >= 0 ? "#ff5050" : "#00e87a" }}>
                  {dolar.variacao >= 0 ? "+" : ""}{dolar.variacao.toFixed(2)}%
                </span>
              </span>
            )}
          </p>
        )}
      </div>

      {erro && (
        <div style={{ maxWidth:"860px", margin:"0 auto 24px", background:"rgba(255,68,68,0.08)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"10px", padding:"16px", textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,100,100,0.8)" }}>
          {erro}
        </div>
      )}

      <div style={{ position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"24px", maxWidth:"860px", margin:"0 auto" }}>
        <div>
          <ColHeader tipo="alta" />
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {loading ? Array.from({length:10},(_,i) => <SkeletonCard key={i} rank={i+1} />) : altas.map((s,i) => <StockCard key={s.ticker} stock={s} rank={i+1} tipo="alta" animate={true} />)}
          </div>
        </div>
        <div>
          <ColHeader tipo="baixa" />
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {loading ? Array.from({length:10},(_,i) => <SkeletonCard key={i} rank={i+1} />) : baixas.map((s,i) => <StockCard key={s.ticker} stock={s} rank={i+1} tipo="baixa" animate={true} />)}
          </div>
        </div>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:"728px", margin:"32px auto 0", height:"90px", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.02)" }}>
        <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.15em", textTransform:"uppercase" }}>Espaço publicitário · 728×90</span>
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [altas, setAltas] = useState([]);
  const [baixas, setBaixas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const timeStr = lastUpdate
    ? lastUpdate.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" })
    : "";

  async function fetchDados() {
    try {
      setErro(null);

      const urlAltas = `https://brapi.dev/api/quote/list?token=${BRAPI_TOKEN}&sortBy=change&sortOrder=desc&limit=20&type=stock`;
      const urlBaixas = `https://brapi.dev/api/quote/list?token=${BRAPI_TOKEN}&sortBy=change&sortOrder=asc&limit=20&type=stock`;

      const [resAltas, resBaixas] = await Promise.all([
        fetch(urlAltas).then(r => r.json()),
        fetch(urlBaixas).then(r => r.json()),
      ]);

      const filtrar = (stocks) => (stocks || []).filter(s =>
        s.stock && s.close > 0 &&
        s.change !== null && s.change !== undefined &&
        /^[A-Z]{4}\d{1,2}$/.test(s.stock)
      );

      const altasValidas = filtrar(resAltas.stocks);
      const baixasValidas = filtrar(resBaixas.stocks);

      const mapear = (s) => ({
        ticker: s.stock, preco: s.close,
        variacao: s.change, volume: s.volume * s.close,
        setor: s.sector || null, marketCap: s.market_cap || null,
      });

      if (altasValidas.length > 0) {
        setAltas(altasValidas.filter(s => s.change > 0).slice(0, 10).map(mapear));
      }
      if (baixasValidas.length > 0) {
        setBaixas(baixasValidas.filter(s => s.change < 0).slice(0, 10).map(mapear));
      }

      if (altasValidas.length === 0 && baixasValidas.length === 0) {
        const lotes = [
          "PETR4,VALE3,ITUB4,BBDC4,ABEV3,WEGE3,RENT3,BBAS3,SUZB3,GGBR4",
          "PRIO3,RDOR3,RADL3,EQTL3,TOTS3,EMBR3,JBSS3,CSAN3,SBSP3,CPFE3",
          "ELET3,CMIG4,VIVT3,TIMS3,CYRE3,MRVE3,LREN3,HAPV3,BPAC11,BEEF3",
        ];
        const resultados = await Promise.all(
          lotes.map(l =>
            fetch(`https://brapi.dev/api/quote/${l}?token=${BRAPI_TOKEN}`)
              .then(r => r.json()).then(d => d.results || []).catch(() => [])
          )
        );
        const validas = resultados.flat().filter(s =>
          s && s.regularMarketPrice > 0 && s.regularMarketChangePercent !== null
        );
        const mapearFallback = (s) => ({
          ticker: s.symbol, preco: s.regularMarketPrice,
          variacao: s.regularMarketChangePercent,
          volume: (s.regularMarketVolume || 0) * s.regularMarketPrice,
          setor: s.sector || null, marketCap: s.marketCap || null,
        });
        const ordenadas = [...validas].sort((a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent);
        setAltas(ordenadas.slice(0, 10).map(mapearFallback));
        setBaixas([...ordenadas].reverse().slice(0, 10).map(mapearFallback));
      }

      setLastUpdate(new Date());
      setLoading(false);
    } catch (e) {
      setErro("Não foi possível carregar os dados. Tentando novamente...");
      setLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDados();
    const interval = setInterval(fetchDados, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#0a0c0f", fontFamily:"'DM Mono',monospace", padding:"24px 16px 60px", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        @keyframes scanline { 0%{top:-5%} 100%{top:105%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        div::-webkit-scrollbar{width:4px}
        div::-webkit-scrollbar-track{background:transparent}
        div::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
      `}</style>

      <div style={{ position:"fixed", inset:0, zIndex:0, backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }} />
      <div style={{ position:"fixed", left:0, right:0, height:"2px", background:"linear-gradient(90deg,transparent,rgba(0,200,100,.08),transparent)", zIndex:1, animation:"scanline 8s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"fixed", top:"20%", left:"5%", width:"300px", height:"300px", background:"radial-gradient(circle,rgba(0,200,100,.04) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"30%", right:"5%", width:"300px", height:"300px", background:"radial-gradient(circle,rgba(255,50,50,.04) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      <Navbar page={page} setPage={setPage} />

      {page === "home" && <DashboardPage timeStr={timeStr} altas={altas} baixas={baixas} loading={loading} erro={erro} />}
      {page === "bluechips" && <BlueChipsPage />}
      {page === "mercado" && <MercadoPage />}
      {page === "blog" && <BlogPage onDashboard={() => setPage("home")} />}

      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginTop:"40px", fontSize:"10px", color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>
        RADAR B3 · Dados com fins informativos · Não constitui recomendação de investimento
      </div>
    </div>
  );
}
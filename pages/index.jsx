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

function getPregaoStatus() {
  const agora = new Date();
  const diaSemana = agora.getDay();
  const totalMin = agora.getHours() * 60 + agora.getMinutes();
  const fimDeSemana = diaSemana === 0 || diaSemana === 6;

  if (fimDeSemana) return { cor:"#555", pulsar:false, label:"MERCADO FECHADO", bgBorder:"rgba(255,255,255,0.06)" };
  if (totalMin >= 540 && totalMin < 600) return { cor:"#f0a500", pulsar:false, label:"PRÉ-ABERTURA · B3", bgBorder:"rgba(240,165,0,0.2)" };
  if (totalMin >= 600 && totalMin < 1020) return { cor:"#00e87a", pulsar:true, label:"AO VIVO · B3", bgBorder:"rgba(0,232,122,0.15)" };
  if (totalMin >= 1020 && totalMin < 1050) return { cor:"#f0a500", pulsar:false, label:"LEILÃO DE FECHAMENTO", bgBorder:"rgba(240,165,0,0.2)" };
  return { cor:"#555", pulsar:false, label:"MERCADO FECHADO", bgBorder:"rgba(255,255,255,0.06)" };
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
          {isAlta?"+":""}{stock.variacao.toFixed(2)}%
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
    <nav style={{ position:"relative", zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:"860px", margin:"0 auto 28px", padding:"10px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px" }}>
      <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px", color:"#fff", letterSpacing:"-0.02em" }}>
          RADAR <span style={{ color:"#00e87a" }}>B3</span>
        </span>
      </button>
      <div style={{ display:"flex", gap:"4px" }}>
        {[{label:"Dashboard",key:"home"},{label:"Blue Chips",key:"bluechips"},{label:"Blog",key:"blog"}].map(({label,key}) => (
          <button key={key} onClick={() => setPage(key)} style={{
            background: page===key ? (key==="bluechips" ? "rgba(30,144,255,0.15)" : "rgba(0,232,122,0.1)") : "none",
            border: page===key ? (key==="bluechips" ? "1px solid rgba(30,144,255,0.4)" : "1px solid rgba(0,232,122,0.25)") : "1px solid transparent",
            borderRadius:"8px", padding:"6px 16px", cursor:"pointer",
            fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500,
            color: page===key ? (key==="bluechips" ? "#1e90ff" : "#00e87a") : "rgba(255,255,255,0.4)",
            letterSpacing:"0.05em", transition:"all 0.2s",
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
      {page === "blog" && <BlogPage onDashboard={() => setPage("home")} />}

      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginTop:"40px", fontSize:"10px", color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>
        RADAR B3 · Dados com fins informativos · Não constitui recomendação de investimento
      </div>
    </div>
  );
}
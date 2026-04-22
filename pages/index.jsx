import { useState, useEffect } from "react";

// ─── SUBSTITUA PELO SEU TOKEN DA BRAPI ───────────────────────────────────────
const BRAPI_TOKEN = "kw46S3LE73zni8i6q5Z3d8";

// ─── POSTS DO BLOG ────────────────────────────────────────────────────────────
const blogPosts = [
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

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────
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

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
function generateSparkline(finalVariacao, points = 12) {
  const seed = Math.abs(finalVariacao * 137.5);
  const pseudo = (n) => ((Math.sin(seed + n * 9.7) + Math.cos(seed * 0.3 + n * 3.1)) / 2);
  const data = [];
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const trend = finalVariacao * progress;
    const noise = pseudo(i) * Math.abs(finalVariacao) * 0.35;
    data.push(trend + noise);
  }
  data[points - 1] = finalVariacao;
  return data;
}

function Sparkline({ variacao, isAlta, width = 52, height = 28 }) {
  const data = generateSparkline(variacao);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const lastX = pad + w;
  const lastY = pad + h - ((data[data.length - 1] - min) / range) * h;
  const areaPoints = `${pad},${pad + h} ${points} ${lastX},${pad + h}`;
  const color = isAlta ? "#00e87a" : "#ff4444";
  const gradId = `g${isAlta ? 1 : 0}${Math.round(Math.abs(variacao) * 10)}`;
  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} opacity="0.9" />
    </svg>
  );
}

// ─── STOCK CARD ───────────────────────────────────────────────────────────────
function StockCard({ stock, rank, tipo, animate }) {
  const isAlta = tipo === "alta";
  const intensity = 1 - (rank - 1) / 10;
  const bgAlta   = `rgba(0,${Math.round(180+intensity*60)},${Math.round(80+intensity*40)},${0.08+intensity*0.10})`;
  const bgBaixa  = `rgba(${Math.round(200+intensity*55)},${Math.round(20+intensity*10)},${Math.round(30+intensity*10)},${0.08+intensity*0.10})`;
  const bdAlta   = `rgba(0,${Math.round(210+intensity*45)},100,${0.2+intensity*0.4})`;
  const bdBaixa  = `rgba(${Math.round(220+intensity*35)},40,50,${0.2+intensity*0.4})`;

  return (
    <div style={{
      background: isAlta ? bgAlta : bgBaixa,
      border: `1px solid ${isAlta ? bdAlta : bdBaixa}`,
      borderRadius: "10px", padding: "12px 14px",
      display: "flex", alignItems: "center", gap: "12px",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateX(0)" : `translateX(${isAlta ? "-30px" : "30px"})`,
      transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${rank * 0.07}s`,
      cursor: "default", position: "relative", overflow: "hidden",
    }}>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color: isAlta?"rgba(0,230,120,0.45)":"rgba(255,80,80,0.45)", width:"18px", minWidth:"18px", textAlign:"center", flexShrink:0, fontWeight:600 }}>
        {rank}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", width:"90px", minWidth:"90px", flexShrink:0 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"15px", fontWeight:800, color: isAlta?"#00e87a":"#ff5050", letterSpacing:"0.04em", whiteSpace:"nowrap", lineHeight:1 }}>
          {stock.ticker}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", fontWeight:700, color: isAlta?"#00ff8c":"#ff4444", lineHeight:1 }}>
          {isAlta ? "+" : ""}{stock.variacao.toFixed(2)}%
        </div>
      </div>
      <div style={{ width:"1px", height:"34px", background:"rgba(255,255,255,0.08)", flexShrink:0 }} />
      <div style={{ display:"flex", flexDirection:"column", gap:"3px", flex:1 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.85)", fontWeight:500, whiteSpace:"nowrap" }}>
          {formatPreco(stock.preco)}
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.02em", whiteSpace:"nowrap" }}>
          Vol {formatVolume(stock.volume)}
        </div>
      </div>
      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
        <Sparkline variacao={stock.variacao} isAlta={isAlta} width={54} height={30} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"8px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.05em" }}>9h→agora</span>
      </div>
      <div style={{ fontSize:"13px", flexShrink:0, opacity:0.5 }}>{isAlta ? "▲" : "▼"}</div>
    </div>
  );
}

// ─── SKELETON CARD (carregando) ───────────────────────────────────────────────
function SkeletonCard({ rank }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "10px", padding: "12px 14px",
      display: "flex", alignItems: "center", gap: "12px",
      animation: "pulse 1.5s infinite",
    }}>
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

// ─── COL HEADER ───────────────────────────────────────────────────────────────
function ColHeader({ tipo }) {
  const isAlta = tipo === "alta";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px", paddingBottom:"10px", borderBottom:`1px solid ${isAlta?"rgba(0,230,120,0.2)":"rgba(255,70,70,0.2)"}` }}>
      <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: isAlta?"#00e87a":"#ff4444", boxShadow:`0 0 10px ${isAlta?"#00e87a":"#ff4444"}`, animation:"pulse 2s infinite" }} />
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px", letterSpacing:"0.12em", textTransform:"uppercase", color: isAlta?"#00e87a":"#ff4444" }}>
        {isAlta ? "Maiores Altas" : "Maiores Baixas"}
      </span>
      <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>TOP 10</span>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  return (
    <nav style={{
      position:"relative", zIndex:10,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      maxWidth:"860px", margin:"0 auto 28px",
      padding:"10px 18px",
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:"12px",
    }}>
      <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px", color:"#fff", letterSpacing:"-0.02em" }}>
          RADAR <span style={{ color:"#00e87a" }}>B3</span>
        </span>
      </button>
      <div style={{ display:"flex", gap:"4px" }}>
        {[{ label:"Dashboard", key:"home" }, { label:"Blog", key:"blog" }].map(({ label, key }) => (
          <button key={key} onClick={() => setPage(key)} style={{
            background: page===key ? "rgba(0,232,122,0.1)" : "none",
            border: page===key ? "1px solid rgba(0,232,122,0.25)" : "1px solid transparent",
            borderRadius:"8px", padding:"6px 16px", cursor:"pointer",
            fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500,
            color: page===key ? "#00e87a" : "rgba(255,255,255,0.4)",
            letterSpacing:"0.05em", transition:"all 0.2s",
          }}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
function BlogCard({ post, onClick, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(post)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? "rgba(0,232,122,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius:"12px", padding:"20px", cursor:"pointer",
        transition:"all 0.25s ease",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        animation: `fadeUp 0.4s ease ${index * 0.08}s both`,
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:600, color: post.tagColor, background:`${post.tagColor}18`, border:`1px solid ${post.tagColor}40`, borderRadius:"4px", padding:"2px 8px", letterSpacing:"0.08em" }}>
          {post.tag}
        </span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>
          {post.data} · {post.tempo} de leitura
        </span>
      </div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"#fff", lineHeight:1.3, marginBottom:"8px", letterSpacing:"-0.01em" }}>
        {post.titulo}
      </h3>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>
        {post.resumo}
      </p>
      <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"14px", fontFamily:"'DM Mono',monospace", fontSize:"11px", color: hov ? "#00e87a" : "rgba(255,255,255,0.3)", transition:"color 0.2s" }}>
        Ler artigo <span style={{ fontSize:"14px" }}>→</span>
      </div>
    </div>
  );
}

// ─── BLOG POST VIEW ───────────────────────────────────────────────────────────
function BlogPostView({ post, onBack }) {
  return (
    <div style={{ maxWidth:"640px", margin:"0 auto", position:"relative", zIndex:2 }}>
      <button onClick={onBack} style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"6px 14px", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", marginBottom:"28px", display:"flex", alignItems:"center", gap:"6px" }}>
        ← Voltar ao Blog
      </button>
      <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"16px" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:600, color: post.tagColor, background:`${post.tagColor}18`, border:`1px solid ${post.tagColor}40`, borderRadius:"4px", padding:"2px 8px" }}>
          {post.tag}
        </span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>
          {post.data} · {post.tempo} de leitura
        </span>
      </div>
      <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(22px,4vw,30px)", color:"#fff", lineHeight:1.2, letterSpacing:"-0.02em", marginBottom:"24px" }}>
        {post.titulo}
      </h1>
      <div style={{ height:"1px", background:"linear-gradient(90deg,rgba(0,232,122,0.4),transparent)", marginBottom:"28px" }} />
      {post.conteudo.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.65)", lineHeight:1.9, marginBottom:"20px" }}>
          {para}
        </p>
      ))}
      <div style={{ marginTop:"36px", background:"rgba(0,232,122,0.06)", border:"1px solid rgba(0,232,122,0.2)", borderRadius:"12px", padding:"20px 24px" }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"14px", color:"#00e87a", marginBottom:"6px" }}>Pronto para investir na B3?</p>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", marginBottom:"14px", lineHeight:1.6 }}>
          Abra sua conta gratuitamente em uma das principais corretoras do Brasil e comece a operar hoje.
        </p>
        <button style={{ background:"#00e87a", color:"#0a0c0f", border:"none", borderRadius:"8px", padding:"10px 20px", cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"12px", letterSpacing:"0.05em" }}>
          ABRIR CONTA GRÁTIS →
        </button>
      </div>
    </div>
  );
}

// ─── PÁGINA BLOG ──────────────────────────────────────────────────────────────
function BlogPage() {
  const [postAberto, setPostAberto] = useState(null);
  if (postAberto) return <BlogPostView post={postAberto} onBack={() => setPostAberto(null)} />;
  return (
    <div style={{ position:"relative", zIndex:2, maxWidth:"860px", margin:"0 auto" }}>
      <div style={{ marginBottom:"28px", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>Aprenda sobre o mercado</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(22px,4vw,32px)", color:"#fff", letterSpacing:"-0.02em" }}>
          Blog <span style={{ color:"#00e87a" }}>Radar B3</span>
        </h2>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.3)", marginTop:"8px" }}>Conteúdo para traders e investidores da bolsa brasileira</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
        {blogPosts.map((post, i) => <BlogCard key={post.id} post={post} onClick={setPostAberto} index={i} />)}
      </div>
    </div>
  );
}

// ─── PÁGINA DASHBOARD ─────────────────────────────────────────────────────────
function DashboardPage({ animate, timeStr, altas, baixas, loading, erro }) {
  return (
    <>
      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginBottom:"28px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"6px", padding:"4px 14px", marginBottom:"10px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background: erro ? "#ff4444" : "#00e87a", boxShadow:`0 0 8px ${erro ? "#ff4444" : "#00e87a"}`, animation:"pulse 1.5s infinite" }} />
          <span style={{ fontSize:"10px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>
            {erro ? "ERRO AO CARREGAR" : loading ? "CARREGANDO..." : "AO VIVO · B3"}
          </span>
        </div>
        <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>
          Maiores movimentações do dia {timeStr ? `· Atualizado às ${timeStr}` : ""}
        </p>
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
            {loading
              ? Array.from({length:10},(_,i) => <SkeletonCard key={i} rank={i+1} />)
              : altas.map((s,i) => <StockCard key={s.ticker} stock={s} rank={i+1} tipo="alta" animate={animate} />)
            }
          </div>
        </div>
        <div>
          <ColHeader tipo="baixa" />
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {loading
              ? Array.from({length:10},(_,i) => <SkeletonCard key={i} rank={i+1} />)
              : baixas.map((s,i) => <StockCard key={s.ticker} stock={s} rank={i+1} tipo="baixa" animate={animate} />)
            }
          </div>
        </div>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:"728px", margin:"32px auto 0", height:"90px", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.02)" }}>
        <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.15em", textTransform:"uppercase" }}>Espaço publicitário · 728×90</span>
      </div>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [animate, setAnimate] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [altas, setAltas] = useState([]);
  const [baixas, setBaixas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const timeStr = lastUpdate
    ? lastUpdate.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" })
    : "";

  // Busca dados reais da Brapi
  async function fetchDados() {
    try {
      setErro(null);
      const url = `https://brapi.dev/api/quote/list?token=${BRAPI_TOKEN}&sortBy=change&sortOrder=desc&type=stock`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
      const json = await res.json();

      const stocks = json.stocks || [];

      // Filtra apenas ações brasileiras reais (tickers com 5 ou 6 caracteres terminando em número)
      const acoesValidas = stocks.filter(s =>
        s.stock &&
        s.close > 0 &&
        s.change !== null &&
        s.change !== undefined &&
        /^[A-Z]{4}\d{1,2}$/.test(s.stock)
      );

      // Mapeia para o formato do card
      const mapear = (s) => ({
        ticker: s.stock,
        preco: s.close,
        variacao: s.change,
        volume: s.volume * s.close, // converte quantidade → volume financeiro
      });

      // Top 10 altas (variação positiva)
      const topAltas = acoesValidas
        .filter(s => s.change > 0)
        .slice(0, 10)
        .map(mapear);

      // Top 10 baixas (variação negativa, ordena do mais negativo)
      const topBaixas = [...acoesValidas]
        .filter(s => s.change < 0)
        .reverse()
        .slice(0, 10)
        .map(mapear);

      setAltas(topAltas);
      setBaixas(topBaixas);
      setLastUpdate(new Date());
      setLoading(false);
      setTimeout(() => setAnimate(true), 100);

    } catch (e) {
      setErro("Não foi possível carregar os dados. Tentando novamente em 60s...");
      setLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDados();
    // Atualiza a cada 60 segundos
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

      {page === "home" && (
        <DashboardPage
          animate={animate}
          timeStr={timeStr}
          altas={altas}
          baixas={baixas}
          loading={loading}
          erro={erro}
        />
      )}
      {page === "blog" && <BlogPage />}

      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginTop:"40px", fontSize:"10px", color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>
        RADAR B3 · Dados com fins informativos · Não constitui recomendação de investimento
      </div>
    </div>
  );
}
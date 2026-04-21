import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { icon: "⚡", title: "CI/CD Pipeline Tool", desc: "Tự động hóa deployment với Docker & GitHub Actions", tags: ["Docker", "Node.js", "AWS"] },
  { icon: "🛒", title: "E-commerce Platform", desc: "Full-stack app với Vue, Supabase & Stripe", tags: ["Vue", "Supabase", "Stripe"] },
  { icon: "📊", title: "Monitoring Dashboard", desc: "Real-time metrics & alerting system", tags: ["Grafana", "Prometheus", "K8s"] },
];

const POSTS = [
  { title: "Setup Kubernetes cluster từ zero", tag: "devops", time: "5 phút", date: "15 Apr" },
  { title: "Vue 3 Composition API patterns thực tế", tag: "frontend", time: "8 phút", date: "10 Apr" },
  { title: "Tối ưu PostgreSQL query cho production", tag: "backend", time: "6 phút", date: "03 Apr" },
];

const TECHS = ["Vue.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS", "CI/CD", "Tailwind CSS", "Supabase"];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: Math.random() * 2.5 + 1,
    }));

    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      t += 0.003;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x * w, my = mouse.current.y * h;

      nodes.forEach(n => {
        n.x += n.vx + Math.sin(t + n.y * 5) * 0.0002;
        n.y += n.vy + Math.cos(t + n.x * 5) * 0.0002;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.x = Math.max(0, Math.min(1, n.x));
        n.y = Math.max(0, Math.min(1, n.y));
      });

      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const lineColor = isDark ? "rgba(100,180,255," : "rgba(30,100,200,";
      const nodeColor = isDark ? "rgba(130,200,255," : "rgba(50,120,220,";
      const glowColor = isDark ? "rgba(80,160,255," : "rgba(30,100,200,";

      nodes.forEach((a, i) => {
        const ax = a.x * w, ay = a.y * h;
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const bx = b.x * w, by = b.y * h;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.25;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        const distMouse = Math.hypot(ax - mx, ay - my);
        if (distMouse < 250) {
          const alpha = (1 - distMouse / 250) * 0.4;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = lineColor + alpha + ")";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        const pulse = Math.sin(t * 2 + i) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(ax, ay, a.r * 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glowColor + 0.08 * pulse + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ax, ay, a.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor + (0.6 + pulse * 0.4) + ")";
        ctx.fill();
      });

      const gridAlpha = isDark ? 0.04 : 0.06;
      ctx.strokeStyle = isDark ? `rgba(100,180,255,${gridAlpha})` : `rgba(30,100,200,${gridAlpha})`;
      ctx.lineWidth = 0.5;
      const spacing = 60;
      for (let x = 0; x < w; x += spacing) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += spacing) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function TerminalText() {
  const [text, setText] = useState("");
  const full = "building scalable systems...";
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { i++; setText(full.slice(0, i)); if (i >= full.length) clearInterval(iv); }, 60);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(100,200,255,0.7)", letterSpacing: 0.5 }}>
      {">"} {text}<span style={{ animation: "blink 1s step-end infinite", opacity: 0.7 }}>_</span>
    </span>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || document.documentElement.scrollTop || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const root = {
    "--bg": dark ? "#0a0e17" : "#fafbfc",
    "--bg2": dark ? "#111827" : "#f1f3f6",
    "--text": dark ? "#e2e8f0" : "#1a202c",
    "--text2": dark ? "#94a3b8" : "#64748b",
    "--border": dark ? "rgba(148,163,184,0.12)" : "rgba(0,0,0,0.08)",
    "--accent": "#3b82f6",
    "--accent2": "#06b6d4",
  };

  return (
    <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'Satoshi', 'DM Sans', sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(100,100,100,0.3); border-radius: 3px; }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)", transition: "background 0.4s" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["about", "projects", "blog", "contact"].map(l => (
              <span key={l} style={{ fontSize: 13, color: "var(--text2)", cursor: "pointer", transition: "color 0.2s", fontWeight: 500 }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"} onMouseLeave={e => e.target.style.color = "var(--text2)"}>{l}</span>
            ))}
            <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = "var(--bg2)"; e.target.style.transform = "rotate(180deg)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "rotate(0)"; }}>
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", overflow: "hidden", minHeight: 420, display: "flex", alignItems: "center" }}>
        <HeroCanvas />
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)" : "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "80px 32px 60px", width: "100%" }}>
          <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, border: "0.5px solid var(--border)", background: dark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: 0.5 }}>FULL STACK & DEVOPS ENGINEER</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginBottom: 8, letterSpacing: -1.5 }}>
            Xin chào, mình là{" "}
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite", backgroundSize: "200% auto" }}>
              Your Name
            </span>
          </h1>
          <TerminalText />
          <p style={{ fontSize: 16, color: "var(--text2)", marginTop: 16, maxWidth: 500, lineHeight: 1.7 }}>
            Mình xây dựng ứng dụng web từ frontend đến infrastructure. Đam mê tự động hóa, clean code và chia sẻ kiến thức.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button style={{ fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(59,130,246,0.3)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
              Xem dự án
            </button>
            <button style={{ fontSize: 13, fontWeight: 500, padding: "10px 24px", borderRadius: 8, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text)"; }}>
              Liên hệ
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        <Section>
          <div style={{ padding: "60px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Featured projects</h2>
            <span style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>xem tất cả →</span>
          </div>
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <Section key={i} delay={i * 0.12}>
              <div style={{ border: "0.5px solid var(--border)", borderRadius: 14, padding: 22, background: dark ? "rgba(17,24,39,0.6)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", cursor: "pointer", transition: "all 0.35s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = dark ? "0 12px 32px rgba(59,130,246,0.12)" : "0 12px 32px rgba(59,130,246,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: "100%", height: 80, background: dark ? "rgba(59,130,246,0.06)" : "rgba(59,130,246,0.04)", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)", color: "var(--accent)", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>
            </Section>
          ))}
        </div>

        <Section>
          <div style={{ padding: "60px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Bài viết mới</h2>
            <span style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>xem tất cả →</span>
          </div>
        </Section>

        <div style={{ border: "0.5px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          {POSTS.map((p, i) => (
            <Section key={i} delay={i * 0.1}>
              <div style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < POSTS.length - 1 ? "0.5px solid var(--border)" : "none", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{p.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: dark ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0.08)", color: "var(--accent2)", fontWeight: 500 }}>{p.tag}</span>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{p.time} đọc</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "var(--text2)", whiteSpace: "nowrap" }}>{p.date}</span>
              </div>
            </Section>
          ))}
        </div>

        <Section>
          <div style={{ padding: "60px 0 20px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Tech stack</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {TECHS.map((t, i) => (
                <span key={t} style={{ fontSize: 12, padding: "7px 16px", borderRadius: 8, border: "0.5px solid var(--border)", color: "var(--text2)", fontWeight: 500, cursor: "default", transition: "all 0.3s", animation: `float 3s ease-in-out ${i * 0.2}s infinite` }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; e.target.style.background = dark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; e.target.style.background = "transparent"; }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <footer style={{ padding: "40px 0", borderTop: "0.5px solid var(--border)", marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>© 2026 your.name</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["GitHub", "LinkedIn", "Twitter"].map(s => (
              <span key={s} style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"} onMouseLeave={e => e.target.style.color = "var(--text2)"}>{s}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

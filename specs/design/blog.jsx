import { useState, useEffect, useRef } from "react";

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

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}

const POSTS = [
  { title: "Setup Kubernetes cluster từ zero đến production", excerpt: "Hướng dẫn chi tiết cách setup K8s cluster trên AWS EKS, từ networking, ingress controller đến monitoring stack.", tag: "devops", readTime: "12 phút", date: "15 Apr 2026", featured: true },
  { title: "Vue 3 Composition API — patterns thực tế", excerpt: "Tổng hợp các patterns mình hay dùng với Composition API: composables, provide/inject, suspense và error boundaries.", tag: "frontend", readTime: "8 phút", date: "10 Apr 2026", featured: true },
  { title: "Tối ưu PostgreSQL query cho 1 triệu records", excerpt: "Chia sẻ kinh nghiệm tối ưu query từ 3s xuống 50ms: indexing strategy, query plan analysis, partitioning.", tag: "backend", readTime: "10 phút", date: "03 Apr 2026", featured: false },
  { title: "Docker multi-stage builds — giảm 90% image size", excerpt: "Từ 1.2GB xuống 120MB với multi-stage builds, distroless images và layer caching strategy.", tag: "devops", readTime: "6 phút", date: "28 Mar 2026", featured: false },
  { title: "Tailwind CSS tips mà docs không nói", excerpt: "Các tricks nâng cao: custom plugins, arbitrary values, responsive containers, dark mode patterns.", tag: "frontend", readTime: "5 phút", date: "20 Mar 2026", featured: false },
  { title: "Rate limiting — từ lý thuyết đến production", excerpt: "So sánh Token Bucket vs Sliding Window, implement với Redis và deploy trên distributed system.", tag: "backend", readTime: "9 phút", date: "14 Mar 2026", featured: false },
];

const TAG_COLORS = {
  devops: { bg: "#8b5cf6", bgLight: "rgba(139,92,246,", label: "DevOps" },
  frontend: { bg: "#3b82f6", bgLight: "rgba(59,130,246,", label: "Frontend" },
  backend: { bg: "#06b6d4", bgLight: "rgba(6,182,212,", label: "Backend" },
};

const SAMPLE_ARTICLE = `## Tại sao Kubernetes?

Trong thế giới microservices, việc quản lý hàng chục containers trên nhiều servers trở nên phức tạp. Kubernetes giải quyết vấn đề này bằng cách tự động hóa deployment, scaling và management.

## Prerequisites

Trước khi bắt đầu, bạn cần chuẩn bị:

- AWS CLI đã cấu hình credentials
- kubectl và eksctl đã cài đặt
- Hiểu biết cơ bản về Docker và networking

## Bước 1: Tạo EKS Cluster

\`\`\`bash
eksctl create cluster \\
  --name production \\
  --region ap-southeast-1 \\
  --nodegroup-name workers \\
  --node-type t3.medium \\
  --nodes 3
\`\`\`

Quá trình này mất khoảng 15-20 phút. eksctl sẽ tự động tạo VPC, subnets, security groups và IAM roles.

## Bước 2: Cấu hình Networking

Sau khi cluster ready, setup ingress controller:

\`\`\`bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/aws/deploy.yaml
\`\`\`

## Bước 3: Monitoring Stack

Deploy Prometheus + Grafana để monitor cluster health, resource usage và application metrics.

## Kết luận

Setup K8s cluster không khó như mọi người nghĩ. Quan trọng là hiểu rõ networking model và security best practices. Trong bài tiếp theo, mình sẽ chia sẻ về GitOps workflow với ArgoCD.`;

export default function BlogPage() {
  const [dark, setDark] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!selectedPost) return;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedPost]);

  const filtered = POSTS.filter(p => {
    if (activeTag && p.tag !== activeTag) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const root = {
    "--bg": dark ? "#0a0e17" : "#fafbfc",
    "--bg2": dark ? "#111827" : "#f1f3f6",
    "--text": dark ? "#e2e8f0" : "#1a202c",
    "--text2": dark ? "#94a3b8" : "#64748b",
    "--border": dark ? "rgba(148,163,184,0.12)" : "rgba(0,0,0,0.08)",
    "--accent": "#3b82f6",
    "--accent2": "#06b6d4",
  };

  const Nav = () => (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)" }}>
      {selectedPost && <div style={{ position: "absolute", bottom: 0, left: 0, width: readingProgress + "%", height: 2, background: "linear-gradient(90deg, var(--accent), var(--accent2))", transition: "width 0.1s" }} />}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["about", "projects", "blog", "contact"].map(l => (
            <span key={l} onClick={() => { if (l === "blog") { setSelectedPost(null); } }} style={{ fontSize: 13, color: l === "blog" ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontWeight: l === "blog" ? 600 : 500 }}>{l}</span>
          ))}
          <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>{dark ? "☀" : "☾"}</button>
        </div>
      </div>
    </nav>
  );

  if (selectedPost) {
    const p = selectedPost;
    const tc = TAG_COLORS[p.tag];
    return (
      <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'); * { margin:0;padding:0;box-sizing:border-box; }`}</style>
        <Nav />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ padding: "32px 0 16px" }}>
            <span onClick={() => setSelectedPost(null)} style={{ fontSize: 13, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>← Tất cả bài viết</span>
          </div>

          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 5, background: tc.bgLight + (dark ? "0.15)" : "0.08)"), color: tc.bg, fontWeight: 600 }}>{tc.label}</span>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>{p.date}</span>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>·</span>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>{p.readTime} đọc</span>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, lineHeight: 1.3, marginBottom: 16 }}>{p.title}</h1>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{p.excerpt}</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ width: "100%", height: 280, borderRadius: 16, background: "linear-gradient(135deg, " + tc.bgLight + (dark ? "0.12)" : "0.06)") + ", " + tc.bgLight + (dark ? "0.04)" : "0.02)") + ")", border: "0.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 14, color: "var(--text2)", fontFamily: "'JetBrains Mono', monospace" }}>cover-image.png</span>
            </div>
          </Reveal>

          <Reveal>
            <article style={{ marginBottom: 60 }}>
              {SAMPLE_ARTICLE.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) return <h2 key={i} style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16, letterSpacing: -0.5 }}>{block.replace("## ", "")}</h2>;
                if (block.startsWith("```")) {
                  const lines = block.split("\n");
                  const lang = lines[0].replace("```", "");
                  const code = lines.slice(1, -1).join("\n");
                  return (
                    <div key={i} style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20, border: "0.5px solid var(--border)" }}>
                      <div style={{ padding: "8px 16px", background: dark ? "rgba(30,41,59,0.8)" : "rgba(241,245,249,0.8)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "0.5px solid var(--border)" }}>
                        <span style={{ fontSize: 11, color: "var(--text2)", fontFamily: "'JetBrains Mono', monospace" }}>{lang}</span>
                        <span style={{ fontSize: 11, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>Copy</span>
                      </div>
                      <pre style={{ padding: 16, background: dark ? "rgba(15,23,42,0.9)" : "rgba(248,250,252,0.9)", overflow: "auto", margin: 0 }}>
                        <code style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "var(--text)", lineHeight: 1.7 }}>{code}</code>
                      </pre>
                    </div>
                  );
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} style={{ marginBottom: 16, paddingLeft: 20 }}>
                      {block.split("\n").map((li, j) => (
                        <li key={j} style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 4 }}>{li.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.9, marginBottom: 16 }}>{block}</p>;
              })}
            </article>
          </Reveal>

          <Reveal>
            <div style={{ padding: "24px 28px", borderRadius: 14, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: "var(--text2)" }}>Chia sẻ bài viết:</span>
                {["Twitter", "LinkedIn", "Facebook"].map(s => (
                  <span key={s} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "0.5px solid var(--border)", color: "var(--text2)", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 60 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Bài viết liên quan</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                {POSTS.filter(pp => pp.tag === p.tag && pp.title !== p.title).slice(0, 2).map((rp, i) => (
                  <div key={i} onClick={() => { setSelectedPost(rp); window.scrollTo(0, 0); }} style={{ padding: 18, borderRadius: 12, border: "0.5px solid var(--border)", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: TAG_COLORS[rp.tag].bgLight + (dark ? "0.12)" : "0.06)"), color: TAG_COLORS[rp.tag].bg, fontWeight: 500 }}>{TAG_COLORS[rp.tag].label}</span>
                    <p style={{ fontSize: 14, fontWeight: 600, marginTop: 8, lineHeight: 1.4 }}>{rp.title}</p>
                    <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{rp.readTime} đọc</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <footer style={{ padding: "40px 0", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text2)" }}>© 2026 your.name</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["GitHub", "LinkedIn", "Twitter"].map(s => (<span key={s} style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer" }}>{s}</span>))}
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'); * { margin:0;padding:0;box-sizing:border-box; }`}</style>
      <Nav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ padding: "60px 0 12px" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>Blog</h1>
            <p style={{ fontSize: 14, color: "var(--text2)" }}>Chia sẻ kiến thức & kinh nghiệm thực tế</p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 0 24px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm bài viết..." style={{ width: "100%", padding: "10px 16px 10px 36px", borderRadius: 10, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text)", fontSize: 13, outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--text2)" }}>⌕</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span onClick={() => setActiveTag(null)} style={{ fontSize: 12, padding: "8px 16px", borderRadius: 8, border: "0.5px solid " + (!activeTag ? "var(--accent)" : "var(--border)"), background: !activeTag ? (dark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.05)") : "transparent", color: !activeTag ? "var(--accent)" : "var(--text2)", fontWeight: 500, cursor: "pointer" }}>Tất cả</span>
              {Object.entries(TAG_COLORS).map(([key, tc]) => (
                <span key={key} onClick={() => setActiveTag(activeTag === key ? null : key)} style={{ fontSize: 12, padding: "8px 16px", borderRadius: 8, border: "0.5px solid " + (activeTag === key ? tc.bg : "var(--border)"), background: activeTag === key ? tc.bgLight + (dark ? "0.12)" : "0.06)") : "transparent", color: activeTag === key ? tc.bg : "var(--text2)", fontWeight: 500, cursor: "pointer" }}>{tc.label}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {filtered.filter(p => p.featured).length > 0 && !activeTag && !searchQuery && (
          <Reveal>
            <div style={{ marginBottom: 32 }}>
              {filtered.filter(p => p.featured).slice(0, 1).map((p, i) => {
                const tc = TAG_COLORS[p.tag];
                return (
                  <div key={i} onClick={() => setSelectedPost(p)} style={{ display: "flex", gap: 24, padding: 28, borderRadius: 16, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.35s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = dark ? "0 16px 40px rgba(59,130,246,0.1)" : "0 16px 40px rgba(59,130,246,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ width: 200, height: 140, borderRadius: 12, background: "linear-gradient(135deg, " + tc.bgLight + (dark ? "0.12)" : "0.06)") + ", " + tc.bgLight + (dark ? "0.04)" : "0.02)") + ")", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 5, background: "rgba(255,255,255,0.15)", color: tc.bg, fontWeight: 500 }}>Featured</span>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 5, background: tc.bgLight + (dark ? "0.15)" : "0.08)"), color: tc.bg, fontWeight: 600 }}>{tc.label}</span>
                        <span style={{ fontSize: 12, color: "var(--text2)" }}>{p.date}</span>
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, letterSpacing: -0.5 }}>{p.title}</h2>
                      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 8 }}>{p.excerpt}</p>
                      <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>Đọc bài viết → {p.readTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 60 }}>
          {(activeTag || searchQuery ? filtered : filtered.filter(p => !p.featured || activeTag || searchQuery)).map((p, i) => {
            const tc = TAG_COLORS[p.tag];
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div onClick={() => setSelectedPost(p)} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 22px", borderRadius: 14, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.3)" : "transparent", cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = tc.bg; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{ width: 4, height: 40, borderRadius: 2, background: tc.bg, flexShrink: 0, opacity: 0.6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: tc.bgLight + (dark ? "0.12)" : "0.06)"), color: tc.bg, fontWeight: 500 }}>{tc.label}</span>
                      <span style={{ fontSize: 11, color: "var(--text2)" }}>{p.date}</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                    <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>{p.excerpt.slice(0, 100)}...</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 12, color: "var(--text2)" }}>{p.readTime}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text2)" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
            <p style={{ fontSize: 14 }}>Không tìm thấy bài viết nào</p>
          </div>
        )}

        <footer style={{ padding: "40px 0", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>© 2026 your.name</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["GitHub", "LinkedIn", "Twitter"].map(s => (<span key={s} style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer" }}>{s}</span>))}
          </div>
        </footer>
      </div>
    </div>
  );
}

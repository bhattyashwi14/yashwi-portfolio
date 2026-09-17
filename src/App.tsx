import React, { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700;800;900&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07050E; --glass: rgba(255,255,255,0.03); --glass2: rgba(255,255,255,0.06);
    --pink: #E879A0; --pink2: #F0A3BE; --pink3: rgba(232,121,160,0.12);
    --lav: #A78BFA; --lav2: #C4B5FD; --lav3: rgba(167,139,250,0.1);
    --amber: #F59E0B; --green: #34D399; --rose: #FB7185;
    --ink: #F2EDF9; --ink2: #B8AECF; --ink3: #5C5078;
    --border: rgba(255,255,255,0.07); --border2: rgba(232,121,160,0.2); --border3: rgba(167,139,250,0.2);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg); color: var(--ink);
    font-family: 'Satoshi', system-ui, sans-serif;
    line-height: 1.6; overflow-x: hidden; min-height: 100vh;
  }

  /* SCENE */
  .scene { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .blob { position: absolute; border-radius: 50%; filter: blur(120px); animation: blobDrift 25s ease-in-out infinite; }
  .blob1 { width: 800px; height: 800px; background: radial-gradient(circle, rgba(167,139,250,0.12), transparent 65%); top: -300px; right: -200px; animation-delay: 0s; }
  .blob2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(232,121,160,0.1), transparent 65%); bottom: 10%; left: -200px; animation-delay: -8s; }
  .blob3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(167,139,250,0.07), transparent 65%); bottom: -100px; right: 10%; animation-delay: -16s; }
  @keyframes blobDrift { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,40px) scale(1.05); } 66% { transform: translate(-20px,20px) scale(0.95); } }

  .noise { position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(7,5,14,0.7); backdrop-filter: blur(32px) saturate(180%);
    border-bottom: 1px solid var(--border);
  }
  .logo {
    font-family: 'DM Mono', monospace; font-size: 1rem; font-weight: 500;
    background: linear-gradient(135deg, var(--pink), var(--lav));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    text-decoration: none; letter-spacing: 0.08em;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { color: var(--ink3); text-decoration: none; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: var(--pink2); }
  .nav-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(52,211,153,0.06); border: 1px solid rgba(52,211,153,0.18);
    border-radius: 100px; padding: 5px 12px;
    font-size: 0.65rem; font-family: 'DM Mono', monospace; color: var(--green); letter-spacing: 0.06em;
  }
  .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.55); } }

  /* REVEAL */
  .reveal { clip-path: inset(0 0 100% 0); opacity: 0; transition: clip-path 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease; }
  .reveal.shown { clip-path: inset(0 0 0% 0); opacity: 1; }
  .reveal-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .reveal-up.shown { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.2s; } .d3 { transition-delay: 0.3s; }
  .d4 { transition-delay: 0.4s; } .d5 { transition-delay: 0.5s; } .d6 { transition-delay: 0.6s; }

  /* GRAD */
  .grad {
    background: linear-gradient(135deg, var(--pink) 0%, var(--lav) 50%, var(--pink2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  main { position: relative; z-index: 1; padding-top: 70px; }

  /* HERO */
  .hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr 380px;
    gap: 3rem; align-items: center; padding: 6rem 3rem 4rem;
    max-width: 1200px; margin: 0 auto;
  }
  .hero-chip {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.18);
    border-radius: 100px; padding: 6px 14px;
    font-size: 0.68rem; font-family: 'DM Mono', monospace; color: var(--lav2);
    letter-spacing: 0.06em; margin-bottom: 2.5rem;
  }
  .hero h1 { font-size: clamp(3rem, 5.5vw, 5rem); font-weight: 900; line-height: 1.02; letter-spacing: -0.04em; color: #fff; margin-bottom: 2rem; }
  .soft { color: rgba(255,255,255,0.35); font-weight: 400; }
  .hero-sub { max-width: 540px; color: var(--ink2); font-size: 1.05rem; line-height: 1.85; font-weight: 300; margin-bottom: 1.8rem; }
  .hero-sub p { margin-bottom: 0.85rem; }
  .hero-sub strong { color: var(--ink); font-weight: 500; }
  .quote-pill {
    display: flex; align-items: flex-start; gap: 10px;
    background: linear-gradient(135deg, rgba(232,121,160,0.06), rgba(167,139,250,0.06));
    border: 1px solid rgba(232,121,160,0.18); border-radius: 12px; padding: 1rem 1.2rem;
    font-size: 0.9rem; font-style: italic; color: var(--pink2); margin-bottom: 2.5rem; max-width: 520px; line-height: 1.55;
  }
  .qm { color: var(--pink); font-size: 1.8rem; font-style: normal; line-height: 0.8; flex-shrink: 0; margin-top: 2px; }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-pri {
    background: linear-gradient(135deg, var(--pink), var(--lav)); color: #fff;
    padding: 0.78rem 1.8rem; border-radius: 10px; font-weight: 700; font-size: 0.9rem;
    text-decoration: none; letter-spacing: 0.02em; transition: all 0.22s;
    box-shadow: 0 4px 30px rgba(232,121,160,0.3);
  }
  .btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(232,121,160,0.45); }
  .btn-sec {
    border: 1px solid var(--border); color: var(--ink2); padding: 0.78rem 1.8rem;
    border-radius: 10px; font-weight: 500; font-size: 0.9rem; text-decoration: none;
    letter-spacing: 0.02em; transition: all 0.22s; backdrop-filter: blur(8px);
  }
  .btn-sec:hover { border-color: var(--lav); color: var(--lav); transform: translateY(-2px); }

  /* HERO RIGHT */
  .hero-right { display: flex; flex-direction: column; gap: 1rem; }
  .hero-stat-card {
    background: var(--glass); backdrop-filter: blur(24px); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.4rem 1.6rem; transition: all 0.25s; position: relative; overflow: hidden;
  }
  .hero-stat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(232,121,160,0.04), rgba(167,139,250,0.04)); opacity: 0; transition: opacity 0.25s; }
  .hero-stat-card:hover { border-color: rgba(232,121,160,0.2); transform: translateX(-4px); }
  .hero-stat-card:hover::before { opacity: 1; }
  .stat-n { font-size: 2.4rem; font-weight: 800; line-height: 1; background: linear-gradient(135deg, var(--pink), var(--lav)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .stat-l { font-size: 0.68rem; color: var(--ink3); letter-spacing: 0.08em; text-transform: uppercase; font-family: 'DM Mono', monospace; margin-top: 0.2rem; }
  .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .stat-mini { background: var(--glass); backdrop-filter: blur(16px); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; transition: all 0.2s; }
  .stat-mini:hover { border-color: rgba(167,139,250,0.22); transform: translateY(-2px); }
  .stat-mini .stat-n { font-size: 1.6rem; }

  /* SECTION */
  .section { padding: 5rem 3rem; max-width: 1200px; margin: 0 auto; }
  .section-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); margin: 0 3rem; }
  .sec-label { font-size: 0.67rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--pink); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; }
  .sec-label::before { content: ''; width: 16px; height: 1px; background: linear-gradient(90deg, var(--pink), var(--lav)); display: block; }
  .sec-h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 0.6rem; }

  /* BENTO CARDS */
  .bento-card {
    background: var(--glass); backdrop-filter: blur(20px) saturate(180%); border: 1px solid var(--border);
    border-radius: 20px; padding: 2rem; position: relative; overflow: hidden;
    transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
  }
  .bento-card::after { content: ''; position: absolute; inset: 0; border-radius: 20px; background: linear-gradient(135deg, rgba(232,121,160,0.03), rgba(167,139,250,0.03)); opacity: 0; transition: opacity 0.28s; }
  .bento-card:hover { transform: translateY(-4px); border-color: rgba(232,121,160,0.18); box-shadow: 0 20px 60px rgba(232,121,160,0.08); }
  .bento-card:hover::after { opacity: 1; }
  .about-bento { display: grid; grid-template-columns: 1.4fr 1fr; grid-template-rows: auto auto; gap: 1.2rem; }
  .bento-tall { grid-row: span 2; }
  .bento-card h3 { font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 1rem; letter-spacing: -0.02em; }
  .bento-card p { color: var(--ink2); font-size: 0.95rem; line-height: 1.82; font-weight: 300; }
  .bento-card p strong { color: var(--ink); font-weight: 500; }
  .bento-accent { border-color: rgba(232,121,160,0.2); background: linear-gradient(135deg, rgba(232,121,160,0.06), rgba(167,139,250,0.06)); }
  .academia-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 1rem; }
  .ac-cell { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; padding: 0.8rem; text-align: center; transition: all 0.2s; }
  .ac-cell:hover { background: rgba(255,255,255,0.07); border-color: rgba(167,139,250,0.25); }
  .ac-n { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--pink), var(--lav)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
  .ac-l { font-size: 0.58rem; color: var(--ink3); letter-spacing: 0.07em; text-transform: uppercase; font-family: 'DM Mono', monospace; margin-top: 0.2rem; }

  /* EXPERIENCE */
  .exp-glass {
    background: var(--glass2); backdrop-filter: blur(28px) saturate(200%); border: 1px solid var(--border);
    border-radius: 24px; padding: 3rem; position: relative; overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .exp-glass:hover { border-color: rgba(232,121,160,0.25); box-shadow: 0 30px 80px rgba(232,121,160,0.1); transform: translateY(-4px); }
  .exp-glow-orb { position: absolute; width: 300px; height: 300px; border-radius: 50%; filter: blur(80px); pointer-events: none; }
  .exp-glow-top { background: radial-gradient(circle, rgba(232,121,160,0.15), transparent 70%); top: -100px; right: -60px; }
  .exp-glow-bot { background: radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%); bottom: -80px; left: -40px; }
  .exp-co { font-size: 0.72rem; font-family: 'DM Mono', monospace; color: var(--pink2); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.4rem; }
  .exp-title { font-size: 1.5rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 0.3rem; }
  .exp-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.2); border-radius: 100px; padding: 5px 12px; font-size: 0.65rem; font-family: 'DM Mono', monospace; color: var(--green); letter-spacing: 0.05em; }
  .exp-divider { height: 1px; background: linear-gradient(90deg, var(--pink), var(--lav), transparent); margin: 1.5rem 0; }
  .exp-body { display: grid; grid-template-columns: 1fr 280px; gap: 3rem; }
  .exp-text { color: var(--ink2); font-size: 0.95rem; line-height: 1.85; font-weight: 300; }
  .exp-text p { margin-bottom: 0.85rem; }
  .exp-text p:last-child { margin-bottom: 0; }
  .exp-text strong { color: var(--ink); font-weight: 500; }
  .exp-text em { color: var(--pink2); font-style: italic; }
  .exp-sidebar { display: flex; flex-direction: column; gap: 0.8rem; }
  .exp-tag-group h4 { font-size: 0.62rem; font-family: 'DM Mono', monospace; color: var(--ink3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .exp-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .etag { font-size: 0.67rem; font-family: 'DM Mono', monospace; background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.18); color: var(--lav2); padding: 3px 8px; border-radius: 5px; }

  /* SKILLS */
  .skills-glass { background: var(--glass); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; }
  .sk-topbar { background: linear-gradient(135deg, rgba(232,121,160,0.07), rgba(167,139,250,0.07)); border-bottom: 1px solid var(--border); padding: 1rem 1.8rem; display: flex; align-items: center; gap: 10px; }
  .sk-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, var(--pink), var(--lav)); }
  .sk-topbar span { font-size: 0.67rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--lav2); font-family: 'DM Mono', monospace; }
  .sk-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .sk-cell { padding: 1.4rem 1.6rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background 0.2s; }
  .sk-cell:nth-child(3n) { border-right: none; }
  .sk-cell:nth-last-child(-n+3) { border-bottom: none; }
  .sk-cell:hover { background: rgba(255,255,255,0.03); }
  .sk-lbl { font-size: 0.6rem; font-family: 'DM Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.7rem; font-weight: 600; }
  .lh { color: var(--pink2); } .lm { color: var(--lav2); } .ll { color: var(--ink3); }
  .pills { display: flex; flex-wrap: wrap; gap: 4px; }
  .ph { font-size: 0.68rem; font-family: 'DM Mono', monospace; padding: 3px 8px; border-radius: 5px; background: rgba(232,121,160,0.08); border: 1px solid rgba(232,121,160,0.2); color: var(--pink2); transition: all 0.18s; }
  .pm { font-size: 0.68rem; font-family: 'DM Mono', monospace; padding: 3px 8px; border-radius: 5px; background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.18); color: var(--lav2); transition: all 0.18s; }
  .pd { font-size: 0.68rem; font-family: 'DM Mono', monospace; padding: 3px 8px; border-radius: 5px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); color: var(--ink3); transition: all 0.18s; }
  .sk-cell:hover .ph { background: rgba(232,121,160,0.15); border-color: rgba(232,121,160,0.38); }
  .sk-cell:hover .pm { background: rgba(167,139,250,0.13); border-color: rgba(167,139,250,0.32); }
  .sk-cell:hover .pd { color: var(--ink2); }

  /* PROJECTS */
  .feat-label { font-size: 0.67rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--lav2); font-family: 'DM Mono', monospace; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 8px; }
  .feat-label::before { content: ''; width: 14px; height: 1px; background: var(--lav2); display: block; }
  .feat-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
  .fcard { background: var(--glass); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; text-decoration: none; display: block; transition: all 0.28s cubic-bezier(0.16,1,0.3,1); position: relative; }
  .fcard::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--pink), var(--lav), transparent); opacity: 0; transition: opacity 0.3s; z-index: 1; }
  .fcard:hover { border-color: rgba(232,121,160,0.28); transform: translateY(-5px); box-shadow: 0 16px 48px rgba(232,121,160,0.12); }
  .fcard:hover::before { opacity: 1; }
  .fcard-visual { height: 90px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .fcard-body { padding: 1rem; }
  .fcard-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem; }
  .fcard h3 { font-size: 0.9rem; font-weight: 700; color: #fff; }
  .fbadge { font-size: 0.56rem; font-family: 'DM Mono', monospace; padding: 2px 6px; border-radius: 3px; letter-spacing: 0.04em; }
  .fb-ml { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); color: var(--amber); }
  .fb-fs { background: rgba(232,121,160,0.1); border: 1px solid rgba(232,121,160,0.25); color: var(--pink2); }
  .fb-data { background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.25); color: var(--lav2); }
  .fb-java { background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.2); color: var(--green); }
  .fcard-stack { font-size: 0.64rem; color: var(--ink3); font-family: 'DM Mono', monospace; margin-bottom: 0.5rem; }
  .fcard-stats { display: flex; gap: 0.7rem; flex-wrap: wrap; }
  .fst { font-size: 0.68rem; color: var(--ink2); }
  .fst span { background: linear-gradient(135deg, var(--pink2), var(--lav2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 600; }

  /* DETAIL CARDS */
  .proj-card { background: var(--glass); backdrop-filter: blur(20px) saturate(180%); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; margin-bottom: 2rem; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); position: relative; scroll-margin-top: 80px; }
  .proj-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--pink), var(--lav), transparent); opacity: 0; transition: opacity 0.3s; z-index: 1; }
  .proj-card:hover { border-color: rgba(232,121,160,0.2); transform: translateY(-4px); box-shadow: 0 24px 70px rgba(232,121,160,0.09); }
  .proj-card:hover::before { opacity: 1; }
  .proj-screens { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid var(--border); }
  .proj-screens.one { grid-template-columns: 1fr; }
  .screen { height: 160px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); }
  .screen:not(:last-child) { border-right: 1px solid var(--border); }
  .proj-body { padding: 2rem 2.2rem; }
  .proj-hdr { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem; gap: 1rem; }
  .proj-hdr h3 { font-size: 1.25rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .proj-gh { font-size: 0.67rem; font-family: 'DM Mono', monospace; color: var(--pink); border: 1px solid rgba(232,121,160,0.25); padding: 4px 10px; border-radius: 6px; text-decoration: none; flex-shrink: 0; transition: all 0.2s; letter-spacing: 0.04em; }
  .proj-gh:hover { background: rgba(232,121,160,0.08); border-color: rgba(232,121,160,0.45); }
  .proj-role { font-size: 0.68rem; color: var(--ink3); font-family: 'DM Mono', monospace; margin-bottom: 1.3rem; letter-spacing: 0.04em; }
  .proj-story { color: var(--ink2); font-size: 0.93rem; line-height: 1.85; font-weight: 300; }
  .proj-story p { margin-bottom: 0.85rem; }
  .proj-story p:last-child { margin-bottom: 0; }
  .proj-story strong { color: var(--ink); font-weight: 500; }
  .proj-story em { color: var(--pink2); font-style: italic; }
  .proj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 1.3rem; }
  .ptag { font-size: 0.66rem; font-family: 'DM Mono', monospace; background: rgba(167,139,250,0.06); border: 1px solid rgba(167,139,250,0.15); color: var(--lav2); padding: 3px 8px; border-radius: 5px; transition: all 0.18s; }
  .proj-card:hover .ptag { border-color: rgba(167,139,250,0.28); color: var(--lav3); }

  /* OTHER PROJECTS */
  .other-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .mini-card { background: var(--glass); backdrop-filter: blur(16px); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.25s; }
  .mini-card:hover { border-color: rgba(232,121,160,0.2); transform: translateY(-3px); box-shadow: 0 12px 36px rgba(232,121,160,0.08); }
  .mini-visual { height: 70px; display: flex; align-items: center; justify-content: center; position: relative; }
  .mini-body { padding: 1rem; }
  .mini-card h4 { font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 0.2rem; }
  .mini-role { font-size: 0.62rem; color: var(--ink3); font-family: 'DM Mono', monospace; margin-bottom: 0.5rem; }
  .mini-desc { font-size: 0.78rem; color: var(--ink2); line-height: 1.6; font-weight: 300; }

  /* EVENTS */
  .event-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .ev-card { background: var(--glass); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: all 0.28s cubic-bezier(0.16,1,0.3,1); position: relative; }
  .ev-card:hover { transform: translateY(-5px); border-color: rgba(232,121,160,0.22); box-shadow: 0 16px 50px rgba(232,121,160,0.1); }
  .ev-visual { height: 90px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .ev-ico { font-size: 2rem; position: relative; z-index: 1; }
  .ev-shine { position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; border-radius: 50%; filter: blur(30px); pointer-events: none; }
  .ev-body { padding: 1.1rem 1.2rem; }
  .ev-title { font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; line-height: 1.3; }
  .ev-desc { font-size: 0.74rem; color: var(--ink2); line-height: 1.55; font-weight: 300; }
  .ev-meta { font-size: 0.6rem; font-family: 'DM Mono', monospace; margin-top: 0.55rem; letter-spacing: 0.05em; }

  /* CERTS */
  .cert-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .cert-card { background: var(--glass); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: all 0.28s cubic-bezier(0.16,1,0.3,1); }
  .cert-card:hover { border-color: rgba(167,139,250,0.28); transform: translateY(-4px); box-shadow: 0 14px 44px rgba(167,139,250,0.1); }
  .cert-visual { height: 80px; display: flex; align-items: center; justify-content: center; gap: 10px; position: relative; overflow: hidden; }
  .cert-ico { font-size: 1.8rem; position: relative; z-index: 1; }
  .cert-issuer-badge { position: relative; z-index: 1; font-size: 0.52rem; font-weight: 700; font-family: 'DM Mono', monospace; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; }
  .cert-body { padding: 1rem 1.2rem; }
  .cert-issuer { font-size: 0.6rem; font-family: 'DM Mono', monospace; color: var(--lav2); letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 0.3rem; }
  .cert-name { font-size: 0.82rem; font-weight: 600; color: #fff; line-height: 1.35; }

  /* TIMELINE */
  .tl-wrap { position: relative; padding-left: 2.5rem; }
  .tl-line { position: absolute; left: 0; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(to bottom, var(--pink), var(--lav), rgba(167,139,250,0.05)); }
  .tl-item { position: relative; padding-bottom: 2.5rem; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-dot { position: absolute; left: -2.5rem; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, var(--pink), var(--lav)); transform: translateX(-4.5px); transition: box-shadow 0.25s; cursor: default; }
  .tl-item:hover .tl-dot { box-shadow: 0 0 20px rgba(232,121,160,0.7); }
  .tl-yr { font-size: 0.63rem; font-family: 'DM Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.35rem; background: linear-gradient(135deg, var(--pink2), var(--lav2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .tl-item h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem; line-height: 1.3; letter-spacing: -0.01em; }
  .tl-item p { font-size: 0.88rem; color: var(--ink2); line-height: 1.72; font-weight: 300; }
  .tl-item p strong { color: var(--ink); font-weight: 500; }

  /* CONTACT */
  .contact-glass {
    background: linear-gradient(135deg, rgba(232,121,160,0.06), rgba(167,139,250,0.06));
    backdrop-filter: blur(28px); border: 1px solid rgba(232,121,160,0.15);
    border-radius: 28px; padding: 3.5rem; position: relative; overflow: hidden; text-align: center;
  }
  .contact-glow { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(100px); pointer-events: none; }
  .cg1 { background: radial-gradient(circle, rgba(232,121,160,0.12), transparent 70%); top: -150px; left: -100px; }
  .cg2 { background: radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%); bottom: -100px; right: -80px; }
  .contact-h { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 0.5rem; position: relative; z-index: 1; line-height: 1.15; }
  .contact-body { color: var(--ink2); font-size: 0.95rem; line-height: 1.85; font-weight: 300; max-width: 580px; margin: 1.5rem auto 2.5rem; position: relative; z-index: 1; }
  .contact-body strong { color: var(--ink); font-weight: 500; }
  .c-links { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; position: relative; z-index: 1; }
  .c-link { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid var(--border); padding: 0.62rem 1.2rem; border-radius: 10px; text-decoration: none; color: var(--ink2); font-size: 0.78rem; font-family: 'DM Mono', monospace; letter-spacing: 0.04em; transition: all 0.22s; }
  .c-link:hover { border-color: var(--pink); color: var(--pink2); background: rgba(232,121,160,0.06); transform: translateY(-2px); }

  footer { border-top: 1px solid var(--border); padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; }
  footer p { font-size: 0.7rem; color: var(--ink3); font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
  .fg { background: linear-gradient(135deg, var(--pink2), var(--lav2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  /* ACTIVITY ROW */
  .activity-row { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 0.5rem; }
  .activity-item { display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 1rem; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid var(--border); }
  .activity-item span:first-child { font-size: 0.78rem; color: var(--ink2); }
  .activity-val { font-size: 1rem; font-weight: 700; background: linear-gradient(135deg, var(--pink), var(--lav)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
`;

const YashwiPortfolio: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -10px 0px",
    }
  );

  const elements = document.querySelectorAll(".reveal, .reveal-up");

  elements.forEach((el) => {
    observer.observe(el);
  });

  // Show hero elements immediately
  document.querySelectorAll(".hero .reveal, .hero .reveal-up").forEach((el) => {
    el.classList.add("shown");
  });

  return () => {
    observer.disconnect();
    document.head.removeChild(styleEl);
  };
}, []);

  return (
    <>
      {/* AMBIENT */}
      <div className="scene">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>
      <div className="noise" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav>
          <a href="#" className="logo">YB_</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#exp">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#work">Projects</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-pill"><span className="pulse-dot" />Open to Internships</div>
        </nav>

        <main>
          {/* HERO */}
          <div className="hero">
            <div className="hero-left">
              <div className="hero-chip reveal">✦ CSE · LJ University, Ahmedabad · 2024–2028</div>
              <h1 className="reveal d1">
                No one&apos;s coming<br />
                <span className="soft">to save me.</span><br />
                <span className="grad">So I figure it<br />out myself.</span>
              </h1>
              <div className="hero-sub reveal d2">
                <p>I&apos;m Yashwi a second year, fourth semester student and I&apos;m, <strong>dead serious about where I&apos;m going.</strong></p>
                <p>I panic. I overthink. I question everything. And then I open my laptop and get to work anyway because waiting until I feel ready has never been an option I gave myself.</p>
                <p>I&apos;m building my foundations in <strong>DSA, Machine Learning, and Backend Development.</strong> Not because someone told me to, but because I want to be the person people come to when they&apos;re stuck and rely on me for technical doubts and problem solving.</p>
              </div>
              <div className="quote-pill reveal d3">
                <span className="qm">&ldquo;</span>A builder in progress who takes her growth seriously.&rdquo;
              </div>
              <div className="hero-btns reveal d4">
                <a href="#work" className="btn-pri">See my work</a>
                <a href="mailto:bhattyashwi@gmail.com" className="btn-sec">Get in touch</a>
              </div>
            </div>
            <div className="hero-right reveal-up d2">
              <div className="hero-stat-card">
                <div className="stat-n">9.47</div>
                <div className="stat-l">Overall CGPA · Trending ↑</div>
              </div>
              <div className="stat-row">
                <div className="stat-mini"><div className="stat-n">75+</div><div className="stat-l">LeetCode</div></div>
                <div className="stat-mini"><div className="stat-n">670+</div><div className="stat-l">GitHub</div></div>
              </div>
              <div className="stat-row">
                <div className="stat-mini"><div className="stat-n">10</div><div className="stat-l">Hackathons</div></div>
                <div className="stat-mini"><div className="stat-n">1</div><div className="stat-l">Internship</div></div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="section-divider" />
          <section className="section" id="about">
            <div className="sec-label reveal">Who I am</div>
            <div className="sec-h2 reveal d1">Serious about growth.<br /><span className="grad">Even when it&apos;s uncomfortable.</span></div>
            <div className="about-bento" style={{ marginTop: "2.5rem" }}>
              <div className="bento-card bento-tall reveal-up">
                <h3>The person who shows up anyway.</h3>
                <p>I&apos;m not the person who has it all figured out. I&apos;m the person who shows up anyway. For the 25-mark test, the late-night bug, the hackathon I&apos;m not sure I&apos;ll do well in.</p>
                <br />
                <p>When I&apos;m in a room, I want to be the person people rely on. Not because I have all the answers, but because I know how to find them. That standard drives me more than any deadline ever could.</p>
                <br />
                <p>Right now I&apos;m a 5th semester CSE student at LJ University, Ahmedabad with CGPA <strong>9.47.</strong> Actively strengthening my DSA and ML foundations, and building things that are more than just submissions.</p>
              </div>
              <div className="bento-card bento-accent reveal-up d1">
                <h3>Academic Performance</h3>
                <div className="academia-grid">
                  <div className="ac-cell"><div className="ac-n">9.25</div><div className="ac-l">Sem 1 SPI</div></div>
                  <div className="ac-cell"><div className="ac-n">9.19</div><div className="ac-l">Sem 2 SPI</div></div>
                  <div className="ac-cell"><div className="ac-n">9.83</div><div className="ac-l">Sem 3 SPI</div></div>
                  <div className="ac-cell"><div className="ac-n">9.60</div><div className="ac-l">Sem 4 SPI</div></div>
                </div>
              </div>
              <div className="bento-card reveal-up d2" style={{ background: "linear-gradient(135deg,rgba(232,121,160,0.07),rgba(167,139,250,0.07))", borderColor: "rgba(167,139,250,0.18)" }}>
                <h3>Activity</h3>
                <div className="activity-row">
                  <div className="activity-item"><span>LeetCode Solved</span><span className="activity-val">75+</span></div>
                  <div className="activity-item"><span>GitHub Contributions</span><span className="activity-val">670+</span></div>
                  <div className="activity-item"><span>Hackathons</span><span className="activity-val">10</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <div className="section-divider" />
          <section className="section" id="exp">
            <div className="sec-label reveal">Real world</div>
            <div className="sec-h2 reveal d1">Experience</div>
            <div className="exp-glass reveal-up d1">
              <div className="exp-glow-orb exp-glow-top" />
              <div className="exp-glow-orb exp-glow-bot" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <div>
                    <div className="exp-co">NARVIX TECH · AI ENGINEERING INTERN</div>
                    <div className="exp-title">AI Engineering Intern</div>
                  </div>
                  <div className="exp-badge"><span className="pulse-dot" />Completed · 2 Months</div>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--ink3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", marginBottom: 0 }}>
                  Python · Google Cloud · OAuth 2.0 · GBP API · Schema.org
                </div>
              </div>
              <div className="exp-divider" />
              <div className="exp-body">
                <div className="exp-text">
                  <p>This is where building alone stopped being enough — and building right started mattering. At Narvix Tech, I worked on the <strong>Google Business Profile (GBP) Audit Engine POC</strong> — a system that takes a completely subjective SEO audit process and turns it into something deterministic, repeatable, and rule-based.</p>
                  <p>I designed the audit rules engine from scratch — a <strong>9-lever checklist with PASS/WEAK/FAIL/SKIP logic</strong> — encoding what a senior SEO consultant would instinctively know into something a machine could apply consistently. Then built the full data pipeline: OAuth 2.0 HTTP client with retry and pagination, fetching from 4 live Google APIs, normalizing and serializing into clean JSON.</p>
                  <p>The part I&apos;m most proud of: the <em>NAP consistency checker</em> — extracting Schema.org JSON-LD from business websites and comparing field-level data against their GBP listing. One automated entry point: fetch → rules → NAP → Markdown report. Knowledge Base, ADRs, unit tests, integration tests, live tests — all authored.</p>
                  <p><strong>Reflecto taught me to build alone. Narvix taught me to build for someone else — and to build it so well they don&apos;t have to think about it.</strong></p>
                </div>
                <div className="exp-sidebar">
                  <div className="exp-tag-group"><h4>Stack</h4><div className="exp-tags"><span className="etag">Python</span><span className="etag">Google Cloud</span><span className="etag">OAuth 2.0</span><span className="etag">GBP API</span><span className="etag">Schema.org</span><span className="etag">REST APIs</span></div></div>
                  <div className="exp-tag-group"><h4>Delivered</h4><div className="exp-tags"><span className="etag">Audit Engine</span><span className="etag">NAP Checker</span><span className="etag">Unit Tests</span><span className="etag">ADR Docs</span><span className="etag">KB Docs</span><span className="etag">Automation</span></div></div>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <div className="section-divider" />
          <section className="section" id="skills">
            <div className="sec-label reveal">What I work with</div>
            <div className="sec-h2 reveal d1">Skills</div>
            <div className="skills-glass reveal-up d1">
              <div className="sk-topbar"><div className="sk-dot" /><span>Stack · always expanding</span></div>
              <div className="sk-grid">
                <div className="sk-cell"><div className="sk-lbl lh">⚡ ML / Data Science</div><div className="pills"><span className="ph">Scikit-learn</span><span className="ph">TensorFlow/Keras</span><span className="ph">XGBoost</span><span className="ph">LSTM</span><span className="ph">Prophet</span><span className="ph">Pandas</span><span className="ph">NumPy</span><span className="ph">Matplotlib</span><span className="ph">Seaborn</span><span className="ph">Plotly</span><span className="ph">Streamlit</span></div></div>
                <div className="sk-cell"><div className="sk-lbl lh">⚡ Core Languages</div><div className="pills"><span className="ph">Python</span><span className="ph">Java</span><span className="ph">JavaScript</span><span className="ph">SQL</span></div></div>
                <div className="sk-cell"><div className="sk-lbl lm">◈ Backend & Frameworks</div><div className="pills"><span className="pm">Django</span><span className="pm">Django REST</span><span className="pm">Node.js</span><span className="pm">Express.js</span><span className="pm">React.js</span><span className="pm">REST APIs</span><span className="pm">JWT</span></div></div>
                <div className="sk-cell"><div className="sk-lbl lm">▦ Frontend & Databases</div><div className="pills"><span className="pm">HTML5</span><span className="pm">CSS3</span><span className="pm">Tailwind</span><span className="pm">Bootstrap</span><span className="pm">MySQL</span><span className="pm">PostgreSQL</span><span className="pm">MongoDB</span><span className="pm">SQLite</span></div></div>
                <div className="sk-cell"><div className="sk-lbl lm">&#123; &#125; Concepts & Cloud</div><div className="pills"><span className="pm">OOP</span><span className="pm">DSA</span><span className="pm">DBMS</span><span className="pm">SDLC</span><span className="pm">Agile</span><span className="pm">OAuth 2.0</span><span className="pm">Google Cloud</span><span className="pm">Git/GitHub</span><span className="pm">Postman</span><span className="pm">Jupyter</span></div></div>
                <div className="sk-cell"><div className="sk-lbl ll">◎ Exploring</div><div className="pills"><span className="pd">Deep Learning</span><span className="pd">BeautifulSoup</span><span className="pd">Web Scraping</span><span className="pd">LangChain</span><span className="pd">Advanced NLP</span></div></div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <div className="section-divider" />
          <section className="section" id="work">
            <div className="sec-label reveal">What I&apos;ve built</div>
            <div className="sec-h2 reveal d1">Projects</div>

            <div className="feat-label reveal-up d1">Featured Projects</div>
            <div className="feat-bento reveal-up d2">
              {/* BitVision mini */}
              <a className="fcard" href="#bv">
                <div className="fcard-visual" style={{ background: "linear-gradient(160deg,#060B14,#0A1828)" }}>
                  <div style={{ width: "100%", height: "100%", padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.5rem", fontWeight: 700, fontFamily: "'DM Mono',monospace", background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>⬡ BitVision</span>
                      <span style={{ fontSize: "0.38rem", color: "#34D399", fontFamily: "'DM Mono',monospace" }}>●LIVE</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "1px", flex: 1, padding: "4px 0 1px" }}>
                      {[28,45,38,62,52,78,66,100].map((h, i) => (
                        <div key={i} style={{ height: `${h}%`, background: "linear-gradient(to top,#F59E0B,rgba(245,158,11,0.15))", borderRadius: "1px", flex: 1 }} />
                      ))}
                    </div>
                    <div style={{ fontSize: "0.35rem", color: "#4B5563", fontFamily: "'DM Mono',monospace" }}>4 ML Models · 2014–2026</div>
                  </div>
                </div>
                <div className="fcard-body">
                  <div className="fcard-top"><h3>BitVision</h3><span className="fbadge fb-ml">ML·AI</span></div>
                  <div className="fcard-stack">React · Django REST · XGBoost · LSTM</div>
                  <div className="fcard-stats"><div className="fst"><span>4</span> models</div><div className="fst"><span>E2E</span> pipeline</div></div>
                </div>
              </a>
              {/* Netflix mini */}
              <a className="fcard" href="#nf">
                <div className="fcard-visual" style={{ background: "#141414" }}>
                  <div style={{ width: "100%", height: "100%", padding: "8px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", borderBottom: "1px solid #222", paddingBottom: "4px" }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 900, color: "#E50914" }}>NETFLIX</span>
                      <span style={{ fontSize: "0.33rem", color: "#555", fontFamily: "'DM Mono',monospace", marginLeft: "3px" }}>EDA</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", flex: 1 }}>
                      <div style={{ background: "#1A1A1A", borderRadius: "2px", padding: "3px", display: "flex", flexDirection: "column", gap: "1px" }}>
                        <div style={{ fontSize: "0.32rem", color: "#888", fontFamily: "'DM Mono',monospace" }}>Growth</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "1px", flex: 1 }}>
                          {[20,45,70,100].map((h, i) => <div key={i} style={{ height: `${h}%`, background: "#E50914", borderRadius: "1px", flex: 1, opacity: 0.4 + i * 0.2 }} />)}
                        </div>
                      </div>
                      <div style={{ background: "#1A1A1A", borderRadius: "2px", padding: "3px", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontSize: "0.32rem", color: "#888", fontFamily: "'DM Mono',monospace" }}>Movies/TV</div>
                        <div style={{ display: "flex", gap: "1px", marginTop: "3px" }}>
                          <div style={{ flex: 0.7, height: "12px", background: "#E50914", borderRadius: "1px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.3rem", color: "#fff" }}>70%</div>
                          <div style={{ flex: 0.3, height: "12px", background: "#7F1D1D", borderRadius: "1px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fcard-body">
                  <div className="fcard-top"><h3>Netflix EDA</h3><span className="fbadge fb-data">Data</span></div>
                  <div className="fcard-stack">Pandas · NumPy · Plotly</div>
                  <div className="fcard-stats"><div className="fst"><span>8K+</span> titles</div><div className="fst"><span>Visual</span> stories</div></div>
                </div>
              </a>
              {/* SkillLink mini */}
              <a className="fcard" href="#sl">
                <div className="fcard-visual" style={{ background: "#0D0F1A" }}>
                  <div style={{ width: "100%", height: "100%", padding: "8px 10px", display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", borderBottom: "1px solid #1A2035", paddingBottom: "3px" }}>
                      <div style={{ width: "9px", height: "9px", borderRadius: "2px", background: "linear-gradient(135deg,#667EEA,#764BA2)" }} />
                      <span style={{ fontSize: "0.48rem", fontWeight: 700, color: "#60A5FA", fontFamily: "'DM Mono',monospace" }}>SkillLink</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", flex: 1 }}>
                      {[["🚀","Learn"],["💡","Teach"],["🤝","Hire"]].map(([ico, label]) => (
                        <div key={label} style={{ background: "#131827", border: "1px solid #1E2A3A", borderRadius: "2px", padding: "3px", display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontSize: "0.65rem" }}>{ico}</span>
                          <span style={{ fontSize: "0.35rem", color: "#fff", fontWeight: 600 }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="fcard-body">
                  <div className="fcard-top"><h3>SkillLink</h3><span className="fbadge fb-fs">Full-Stack</span></div>
                  <div className="fcard-stack">Django · Python · SQLite</div>
                  <div className="fcard-stats"><div className="fst"><span>3</span> roles</div><div className="fst"><span>Live</span> chatbot</div></div>
                </div>
              </a>
              {/* Reflecto mini */}
              <a className="fcard" href="#rf">
                <div className="fcard-visual" style={{ background: "#0D1117" }}>
                  <div style={{ width: "100%", height: "100%", padding: "7px 9px", fontFamily: "'DM Mono',monospace", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
                      {["#FF5F56","#FFBD2E","#27C93F"].map(c => <div key={c} style={{ width: "5px", height: "5px", borderRadius: "50%", background: c }} />)}
                    </div>
                    <div style={{ fontSize: "0.24rem", color: "#4ADE80", letterSpacing: "0.08em", lineHeight: 1.4 }}>██████╗ ███████╗███████╗██╗     ███████╗</div>
                    <div style={{ fontSize: "0.24rem", color: "#4ADE80", letterSpacing: "0.08em", lineHeight: 1.4 }}>██╔══██╗██╔════╝██╔════╝██║     ██╔════╝</div>
                    <div style={{ fontSize: "0.46rem", color: "#9BA3B0", marginTop: "2px" }}>MENU: <span style={{ color: "#E879A0" }}>1</span>JOURNAL <span style={{ color: "#E879A0" }}>2</span>TODO</div>
                  </div>
                </div>
                <div className="fcard-body">
                  <div className="fcard-top"><h3>Reflecto</h3><span className="fbadge fb-java">Java JDBC</span></div>
                  <div className="fcard-stack">Java · MySQL · JDBC</div>
                  <div className="fcard-stats"><div className="fst"><span>2,470</span> lines</div><div className="fst"><span>3</span> custom DSA</div></div>
                </div>
              </a>
            </div>

            {/* BITVISION DETAIL */}
            <div className="proj-card reveal-up" id="bv">
              <div className="proj-screens one">
                <div className="screen">
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#050A12,#081525)", padding: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #1A2A3A", paddingBottom: "5px", gap: "6px" }}>
                      <span style={{ fontSize: "0.55rem", fontWeight: 700, fontFamily: "'DM Mono',monospace", background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>⬡ BitVision</span>
                      <span style={{ marginLeft: "auto", fontSize: "0.38rem", color: "#4B5563", fontFamily: "'DM Mono',monospace" }}>React · Django REST · 4 ML Models</span>
                      <span style={{ fontSize: "0.4rem", color: "#34D399", fontFamily: "'DM Mono',monospace" }}>●LIVE</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px" }}>
                      {[["$97,240","BTC/USD","#F59E0B"],["+2.4%","24h","#34D399"],["XGBoost","Best Model","#A78BFA"]].map(([n,l,c]) => (
                        <div key={l} style={{ background: "#0D1825", border: "1px solid #1A2A3A", borderRadius: "3px", padding: "4px" }}>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: c as string, lineHeight: 1 }}>{n}</div>
                          <div style={{ fontSize: "0.35rem", color: "#4B5563", marginTop: "1px", fontFamily: "'DM Mono',monospace" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "1px", padding: "0 1px" }}>
                      {[30,48,40,65,55,72,60,85,70,93,80,100].map((h, i) => (
                        <div key={i} style={{ height: `${h}%`, background: "linear-gradient(to top,#F59E0B,rgba(245,158,11,0.2))", borderRadius: "1px 1px 0 0", flex: 1 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-hdr"><h3>BitVision — AI-Powered Bitcoin Prediction Platform</h3><a href="https://github.com/bhattyashwi14/bitvision" target="_blank" rel="noreferrer" className="proj-gh">GitHub ↗</a></div>
                <div className="proj-role">React · Django REST Framework · Scikit-learn · XGBoost · Prophet · LSTM · Python</div>
                <div className="proj-story">
                  <p>BitVision is the project where everything clicked — ML theory meeting real data, a React frontend talking to a Django backend talking to actual trained models. <strong>End-to-end ML pipeline on Bitcoin price data from 2014 to 2026</strong> — preprocessing, feature engineering, and four models trained head-to-head: Random Forest, XGBoost, Prophet, and LSTM.</p>
                  <p>My main contribution was the integration layer. <strong>Every feature showing demo data, I replaced with real backend-driven data.</strong> Real predictions. Real confidence intervals. Real technical indicators. Built and connected the APIs, resolved cross-module bugs, added OTP auth, trade history, price alerts.</p>
                  <p>BitVision is where I stopped being someone who understands ML and became someone who <em>ships ML.</em></p>
                </div>
                <div className="proj-tags"><span className="ptag">React</span><span className="ptag">Django REST</span><span className="ptag">XGBoost</span><span className="ptag">LSTM</span><span className="ptag">Prophet</span><span className="ptag">Random Forest</span><span className="ptag">Backtesting</span><span className="ptag">OTP Auth</span><span className="ptag">Scikit-learn</span></div>
              </div>
            </div>

            {/* NETFLIX DETAIL */}
            <div className="proj-card reveal-up d1" id="nf">
              <div className="proj-screens one">
                <div className="screen">
                  <div style={{ width: "100%", height: "100%", background: "#141414", padding: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", borderBottom: "1px solid #222", paddingBottom: "5px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#E50914", fontFamily: "Satoshi,sans-serif", letterSpacing: "-0.02em" }}>NETFLIX</span>
                      <span style={{ fontSize: "0.35rem", color: "#555", fontFamily: "'DM Mono',monospace", marginLeft: "5px" }}>Content Analysis · EDA</span>
                      <span style={{ fontSize: "0.35rem", color: "#666", fontFamily: "'DM Mono',monospace", marginLeft: "auto" }}>8,000+ titles</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", flex: 1 }}>
                      <div style={{ background: "#1A1A1A", borderRadius: "3px", padding: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontSize: "0.36rem", color: "#888", fontFamily: "'DM Mono',monospace" }}>Content Growth</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "1px", flex: 1 }}>
                          {[15,32,55,80,100].map((h, i) => <div key={i} style={{ height: `${h}%`, background: "#E50914", borderRadius: "1px", flex: 1, opacity: 0.4 + i * 0.15 }} />)}
                        </div>
                      </div>
                      <div style={{ background: "#1A1A1A", borderRadius: "3px", padding: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontSize: "0.36rem", color: "#888", fontFamily: "'DM Mono',monospace" }}>Movies vs TV</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1px", marginTop: "4px", flex: 1 }}>
                          <div style={{ flex: 0.7, height: "16px", background: "#E50914", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.32rem", color: "#fff", fontFamily: "'DM Mono',monospace" }}>70%</div>
                          <div style={{ flex: 0.3, height: "16px", background: "#7F1D1D", borderRadius: "2px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-hdr"><h3>Netflix Content Analysis — EDA</h3><a href="https://github.com/bhattyashwi14/netflix-content-analysis" target="_blank" rel="noreferrer" className="proj-gh">GitHub ↗</a></div>
                <div className="proj-role">Python · Pandas · NumPy · Matplotlib · Plotly · Data Science</div>
                <div className="proj-story">
                  <p>My first pure data science project — and the one that made me understand what EDA actually means. Not just cleaning data, but <strong>making data tell a story.</strong> 8,000+ Netflix titles. Raw metadata. What patterns live inside this dataset nobody has articulated yet?</p>
                  <p>Built visual narratives — content growth over time, Movies vs TV split, genre distribution, rating patterns, top content-producing countries. <strong>Every chart had a question it was answering.</strong></p>
                  <p>This is where Pandas and Plotly stopped being syllabus topics and became tools I actually think in.</p>
                </div>
                <div className="proj-tags"><span className="ptag">Python</span><span className="ptag">Pandas</span><span className="ptag">NumPy</span><span className="ptag">Matplotlib</span><span className="ptag">Plotly</span><span className="ptag">EDA</span><span className="ptag">Data Cleaning</span><span className="ptag">Data Visualization</span></div>
              </div>
            </div>

            {/* SKILLLINK DETAIL */}
            <div className="proj-card reveal-up d2" id="sl">
              <div className="proj-screens">
                <div className="screen">
                  <div style={{ width: "100%", height: "100%", background: "#0D0F1A", padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", borderBottom: "1px solid #1A2035", paddingBottom: "4px" }}>
                      <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "linear-gradient(135deg,#667EEA,#764BA2)" }} />
                      <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#60A5FA", fontFamily: "'DM Mono',monospace" }}>SkillLink</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px", flex: 1 }}>
                      {[["🚀","Learn","Peer mentorship"],["💡","Teach","Monetize expertise"],["🤝","Hire","Pre-vetted talent"]].map(([ico,t,s]) => (
                        <div key={t} style={{ background: "#131827", border: "1px solid #1E2A3A", borderRadius: "3px", padding: "4px", display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontSize: "0.72rem" }}>{ico}</span>
                          <span style={{ fontSize: "0.4rem", color: "#fff", fontWeight: 600 }}>{t}</span>
                          <span style={{ fontSize: "0.34rem", color: "#4B5563" }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="screen">
                  <div style={{ width: "100%", height: "100%", background: "#0D0F1A", padding: "10px", display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontSize: "0.44rem", color: "#60A5FA", fontFamily: "'DM Mono',monospace" }}>Tutor Dashboard</span>
                      <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "linear-gradient(135deg,#667EEA,#764BA2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.36rem", color: "#fff" }}>S</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                      <div style={{ background: "#131827", border: "1px solid #1E2A3A", borderRadius: "3px", padding: "5px" }}><div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>1</div><div style={{ fontSize: "0.34rem", color: "#4B5563", fontFamily: "'DM Mono',monospace", marginTop: "1px" }}>Students</div></div>
                      <div style={{ background: "#131827", border: "1px solid #1E2A3A", borderRadius: "3px", padding: "5px" }}><div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>⭐4.5</div><div style={{ fontSize: "0.34rem", color: "#4B5563", fontFamily: "'DM Mono',monospace", marginTop: "1px" }}>Rating</div></div>
                    </div>
                    <div style={{ background: "#131827", border: "1px solid #1E3A5F", borderRadius: "3px", padding: "5px" }}>
                      <div style={{ fontSize: "0.4rem", color: "#60A5FA", fontWeight: 600 }}>📅 Booked Sessions</div>
                      <div style={{ fontSize: "0.34rem", color: "#4B5563", marginTop: "1px" }}>Video Editing · Thu 12 Mar</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-hdr"><h3>SkillLink — Full-Stack Skill Exchange Platform</h3><a href="https://github.com/bhattyashwi14/SkillLink" target="_blank" rel="noreferrer" className="proj-gh">GitHub ↗</a></div>
                <div className="proj-role">Team project · Python · Django · SQLite · Frontend + Backend</div>
                <div className="proj-story">
                  <p>SkillLink is where everything I&apos;d learned from building alone became something I could use under pressure, on a team, with real stakes. <strong>Three completely separate role dashboards</strong> — each with OTP email verification, automated booking confirmations, a live-database chatbot, and a full hiring workflow.</p>
                  <p>The most important moment wasn&apos;t a feature. It was <strong>the night before Innovation Village</strong> — broken project, investors in the morning. We stopped, called our professor, simplified to what mattered, and shipped a working version overnight.</p>
                  <p>SkillLink is the proof that Reflecto&apos;s lessons — break it down, don&apos;t panic, stay in it — work in the real world too.</p>
                </div>
                <div className="proj-tags"><span className="ptag">Django</span><span className="ptag">Python</span><span className="ptag">SQLite</span><span className="ptag">OTP Auth</span><span className="ptag">RBAC</span><span className="ptag">Live DB Chatbot</span><span className="ptag">Slot Booking</span><span className="ptag">Email Automation</span></div>
              </div>
            </div>

            {/* REFLECTO DETAIL */}
            <div className="proj-card reveal-up d3" id="rf">
              <div className="proj-screens one">
                <div className="screen">
                  <div style={{ width: "100%", height: "100%", background: "#0D1117", fontFamily: "'DM Mono',monospace", padding: "10px", display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                      {["#FF5F56","#FFBD2E","#27C93F"].map(c => <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />)}
                      <span style={{ fontSize: "0.44rem", color: "#444", marginLeft: "5px" }}>Reflecto.java · ReflectoFinal_1</span>
                    </div>
                    <div style={{ fontSize: "0.26rem", color: "#4ADE80", letterSpacing: "0.1em", lineHeight: 1.4 }}>██████╗ ███████╗███████╗██╗     ███████╗ ██████╗████████╗ ██████╗</div>
                    <div style={{ fontSize: "0.26rem", color: "#4ADE80", letterSpacing: "0.1em", lineHeight: 1.4 }}>██╔══██╗██╔════╝██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██╔═══██╗</div>
                    <div style={{ fontSize: "0.26rem", color: "#4ADE80", letterSpacing: "0.1em", lineHeight: 1.4 }}>██████╔╝█████╗  █████╗  ██║     █████╗  ██║        ██║   ██║   ██║</div>
                    <div style={{ fontSize: "0.54rem", color: "#4ADE80", marginTop: "3px" }}>Logged in! · Quote: &quot;Dream it. Wish it. Do it.&quot;</div>
                    <div style={{ fontSize: "0.54rem", color: "#9BA3B0" }}>MENU: <span style={{ color: "#E879A0" }}>1</span> JOURNAL · <span style={{ color: "#E879A0" }}>2</span> TO-DO · <span style={{ color: "#E879A0" }}>3</span> CHALLENGES · <span style={{ color: "#E879A0" }}>4</span> POSTS</div>
                    <div style={{ fontSize: "0.54rem", color: "#E879A0" }}>ENTER YOUR CHOICE: _</div>
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-hdr"><h3>Reflecto — Console-Based Productivity System</h3></div>
                <div className="proj-role">Java · MySQL · JDBC · Semester 2</div>
                <div className="proj-story">
                  <p>The project I&apos;m most proud of — and the most honest one here. <strong>Built entirely on my own, without AI tools, without anyone giving me the answer.</strong> When it broke — and it broke constantly — the only way out was through.</p>
                  <p>2,470 lines of Java across five independent modules. <em>I didn&apos;t use Java Collections.</em> I built a Singly Linked List, a Stack, and a Deque from scratch — because I needed to understand what was happening underneath. Custom exception framework. MySQL via JDBC with CallableStatement stored procedures for every CRUD operation.</p>
                  <p>Still has bugs. Still a work in progress. But Reflecto taught me what ownership feels like — and that understanding the struggle <em>is</em> the learning.</p>
                </div>
                <div className="proj-tags"><span className="ptag">Java</span><span className="ptag">MySQL</span><span className="ptag">JDBC</span><span className="ptag">Custom DSA</span><span className="ptag">Custom Exceptions</span><span className="ptag">Stored Procedures</span><span className="ptag">OOP</span></div>
              </div>
            </div>

            {/* OTHER PROJECTS */}
            <div className="feat-label reveal-up" style={{ marginTop: "0.5rem" }}>Other Projects</div>
            <div className="other-bento reveal-up d1">
              {[
                { title: "Library Management System", role: "Java · OOP · Sem 1", desc: "Inheritance, encapsulation, polymorphism. Book/Member/Library modules. My first real project.", bg: "linear-gradient(135deg,#0D1B2A,#1A3A5C)", ico: "📚", tag: "Java·OOP", tagColor: "#60A5FA" },
                { title: "Pharmacy System", role: "Java · Multithreading", desc: "Medicine records with multithreading for efficient concurrent operations.", bg: "linear-gradient(135deg,#1A0D2E,#2D1B4E)", ico: "💊", tag: "Threads", tagColor: "#A78BFA" },
                { title: "Online Voting System", role: "Java · Thread Safety", desc: "Secure voting simulation handling concurrency without race conditions.", bg: "linear-gradient(135deg,#0F2027,#203A43)", ico: "🗳️", tag: "Thread-Safe", tagColor: "#34D399" },
                { title: "Smart Parking System", role: "Java · Logic Design", desc: "Efficient slot allocation — clean exercise in state management.", bg: "linear-gradient(135deg,#1A1A0D,#3A3A1B)", ico: "🅿️", tag: "Logic", tagColor: "#F59E0B" },
              ].map(({ title, role, desc, bg, ico, tag, tagColor }) => (
                <div className="mini-card" key={title}>
                  <div className="mini-visual" style={{ background: bg }}>
                    <span style={{ fontSize: "1.8rem" }}>{ico}</span>
                    <div style={{ position: "absolute", bottom: "5px", right: "7px", fontSize: "0.46rem", color: tagColor, fontFamily: "'DM Mono',monospace", opacity: 0.7 }}>{tag}</div>
                  </div>
                  <div className="mini-body"><h4>{title}</h4><div className="mini-role">{role}</div><div className="mini-desc">{desc}</div></div>
                </div>
              ))}
            </div>
          </section>

          {/* HACKATHONS */}
          <div className="section-divider" />
          <section className="section">
            <div className="sec-label reveal">Competing & Learning</div>
            <div className="sec-h2 reveal d1">Hackathons & Events</div>
            <div className="event-bento reveal-up d1">
              {[
                { title: "ISRO Bharatiya Antariksh Hackathon 2026", desc: "National-level space tech hackathon by ISRO.", meta: "ISRO · 2026 · National", metaColor: "var(--lav2)", ico: "🛸", bg: "linear-gradient(135deg,#0A1628,#0D2240)", glow: "rgba(59,130,246,0.18)", glowColor: "rgba(59,130,246,0.3)" },
                { title: "SVNIT eRakshak Cyber Security", desc: "Cybersecurity hackathon at SVNIT — a completely new domain, tackled head-on.", meta: "SVNIT · 2026", metaColor: "var(--rose)", ico: "🔐", bg: "linear-gradient(135deg,#1A0A0A,#2D1010)", glow: "rgba(239,68,68,0.15)", glowColor: "rgba(239,68,68,0.3)" },
                { title: "LDCE Tarkshastra 2026", desc: "Qualified round. Problem-solving under time pressure.", meta: "LDCE · 2026 · Qualified", metaColor: "var(--green)", ico: "⚡", bg: "linear-gradient(135deg,#0F1A0A,#1A2D10)", glow: "rgba(52,211,153,0.12)", glowColor: "rgba(52,211,153,0.3)" },
                { title: "Odoo Hackathon", desc: "Unfamiliar stack — learned fast, adapted faster, shipped anyway.", meta: "Odoo · 2026", metaColor: "var(--amber)", ico: "🟠", bg: "linear-gradient(135deg,#1A1000,#2D1E00)", glow: "rgba(245,158,11,0.14)", glowColor: "rgba(245,158,11,0.3)" },
                { title: "Bit & Build — Google DSC", desc: "Google Developer Student Club hackathon. Collaborated, competed, built under constraints.", meta: "Google DSC · 2025", metaColor: "var(--lav2)", ico: "◉", bg: "linear-gradient(135deg,#0A0A1A,#10102D)", glow: "rgba(167,139,250,0.14)", glowColor: "rgba(167,139,250,0.3)" },
                { title: "Innovation Village — LJ University", desc: "Presented SkillLink. Broken project the night before. Working version by morning.", meta: "LJ University · 2025–26", metaColor: "var(--pink2)", ico: "🏛", bg: "linear-gradient(135deg,#1A0A14,#2D1020)", glow: "rgba(232,121,160,0.14)", glowColor: "rgba(232,121,160,0.3)" },
                { title: "Devolution — DA-IICT", desc: "Technical workshop at DA-IICT. Exposed to ideas and people far ahead.", meta: "DA-IICT · Jan 2025", metaColor: "var(--lav2)", ico: "🚀", bg: "linear-gradient(135deg,#0A0A1A,#141428)", glow: "rgba(167,139,250,0.12)", glowColor: "rgba(167,139,250,0.25)" },
                { title: "JUG-GUJ Java Community Day", desc: "Gujarat Java User Group event. Real developers, real talks, real inspiration.", meta: "JUG-GUJ · 2025", metaColor: "var(--green)", ico: "☕", bg: "linear-gradient(135deg,#0D1A0A,#1A2D14)", glow: "rgba(52,211,153,0.1)", glowColor: "rgba(52,211,153,0.25)" },
                { title: "Blockchain — Arbitrum Builders Lab", desc: "Hands-on blockchain and Web3 fundamentals workshop by Arbitrum.", meta: "Arbitrum · 2025", metaColor: "var(--pink2)", ico: "⛓️", bg: "linear-gradient(135deg,#1A0A1A,#2D102D)", glow: "rgba(232,121,160,0.1)", glowColor: "rgba(232,121,160,0.25)" },
              ].map(({ title, desc, meta, metaColor, ico, bg, glow, glowColor }) => (
                <div className="ev-card" key={title}>
                  <div className="ev-visual" style={{ background: bg }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%,${glow},transparent 65%)` }} />
                    <div className="ev-shine" style={{ background: glowColor }} />
                    <span className="ev-ico">{ico}</span>
                  </div>
                  <div className="ev-body">
                    <div className="ev-title">{title}</div>
                    <div className="ev-desc">{desc}</div>
                    <div className="ev-meta" style={{ color: metaColor }}>{meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <div className="section-divider" />
          <section className="section">
            <div className="sec-label reveal">Credentials</div>
            <div className="sec-h2 reveal d1">Certifications</div>
            <div className="cert-bento reveal-up d1">
              {[
                { ico: "🎓", issuer: "Coursera", name: "Introduction to Java Programming", badge: "COURSERA", bg: "linear-gradient(135deg,#0A1628,#0052CC)" },
                { ico: "🏛", issuer: "University of Pennsylvania", name: "Inheritance & Data Structures in Java", badge: "UPENN", bg: "linear-gradient(135deg,#001F5B,#011F8A)" },
                { ico: "💻", issuer: "IBM · Coursera", name: "Intro to HTML, CSS & JavaScript", badge: "IBM", bg: "linear-gradient(135deg,#0A0A1E,#1F1F5E)" },
                { ico: "📊", issuer: "IBM · Coursera", name: "EDA for Machine Learning", badge: "IBM", bg: "linear-gradient(135deg,#0A1A14,#0D3028)" },
                { ico: "⚡", issuer: "Infosys Springboard", name: "Agile Scrum · Presentations · Email Writing · Time Management", badge: "INFOSYS", bg: "linear-gradient(135deg,#1A0A0A,#3D1010)" },
                { ico: "⛓️", issuer: "Arbitrum Builders Lab", name: "Web3 & Rust Foundations", badge: "ARBITRUM", bg: "linear-gradient(135deg,#0A0A1A,#1A0A2E)" },
              ].map(({ ico, issuer, name, badge, bg }) => (
                <div className="cert-card" key={name}>
                  <div className="cert-visual" style={{ background: bg }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30%,rgba(255,255,255,0.06),transparent 60%)" }} />
                    <span className="cert-ico">{ico}</span>
                    <span className="cert-issuer-badge">{badge}</span>
                  </div>
                  <div className="cert-body">
                    <div className="cert-issuer">{issuer}</div>
                    <div className="cert-name">{name}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* JOURNEY */}
          <div className="section-divider" />
          <section className="section" id="journey">
            <div className="sec-label reveal">The story so far</div>
            <div className="sec-h2 reveal d1">Journey</div>
            <div className="tl-wrap">
              <div className="tl-line" />
              {[
                { yr: "2026 · Right now", h: "DSA grind. ML & Data Science. Every day.", p: <><strong>75+ LeetCode — 3 Hard, 26+ Medium.</strong> Building ML and Data Science depth intentionally. The exams hit, the streak breaks, and I come back anyway. That consistency is the whole point.</> },
                { yr: "2026 · Narvix Tech", h: "First real internship. AI Engineering. Built for someone else.", p: <>GBP Audit Engine POC — turned a subjective SEO process into a deterministic, rule-based system. <strong>Reflecto taught me to build alone. Narvix taught me to build right.</strong></> },
                { yr: "2026 · Hackathons", h: "ISRO BAH · SVNIT eRakshak · LDCE Tarkshastra · Odoo", p: <>Four hackathons in 2026 alone — including ISRO&apos;s national-level space tech hackathon. Competing at higher levels, in unfamiliar domains, under real pressure.</> },
                { yr: "2025–26 · SkillLink", h: "Innovation Village. Real stage. Real investors.", p: <>Broken project the night before. Working version by morning. Learned more about pressure and asking for help than any classroom taught.</> },
                { yr: "2025 · Reflecto", h: "2,470 lines. Built alone. No shortcuts.", p: <>Custom data structures. Custom exceptions. MySQL via JDBC. All from scratch, no AI, no hand-holding. The project that made me a real programmer.</> },
                { yr: "2024–25 · Foundations", h: "Certifications. Workshops. Always in the room.", p: <>Java — Coursera · DSA — UPenn · IBM HTML/CSS/JS · EDA for ML — IBM · Agile Scrum · Web3 &amp; Rust — Arbitrum. Devolution (DA-IICT) · JUG-GUJ · HexHunt · Blockchain. I go to things. I stay curious.</> },
              ].map(({ yr, h, p }, i) => (
                <div className={`tl-item reveal-up d${i}`} key={yr}>
                  <div className="tl-dot" />
                  <div className="tl-yr">{yr}</div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <div className="section-divider" />
          <section className="section" id="contact">
            <div className="contact-glass reveal-up">
              <div className="contact-glow cg1" />
              <div className="contact-glow cg2" />
              <div className="sec-label" style={{ justifyContent: "center" }}>Let&apos;s connect</div>
              <div className="contact-h">
                Looking to contribute, learn,<br />and grow through meaningful<br />
                <span className="grad">internship opportunities.</span>
              </div>
              <div className="contact-body">
                I&apos;m not going to pretend I know everything. But I learn fast, take ownership, and do the work. I ask questions, embrace difficult problems, and keep showing up until I figure things out. I don&apos;t mind stepping into unfamiliar territory or making mistakes, as long as I&apos;m learning from them. I believe growth comes from curiosity, consistency, and the willingness to keep learning. Not from pretending to know it all. If that resonates with the kind of people you want on your team, I&apos;d love to connect.
              </div>
              <div className="c-links">
                <a href="mailto:bhattyashwi@gmail.com" className="c-link">✉ bhattyashwi@gmail.com</a>
                <a href="https://linkedin.com/in/yashwi-bhatt-441b87384" target="_blank" rel="noreferrer" className="c-link">in LinkedIn</a>
                <a href="https://github.com/bhattyashwi14" target="_blank" rel="noreferrer" className="c-link">⌥ GitHub</a>
                <a href="https://leetcode.com/u/bhattyashwi__/" target="_blank" rel="noreferrer" className="c-link">◎ LeetCode</a>
                <a href="https://yashwi-portfolio-site-syia.vercel.app" target="_blank" rel="noreferrer" className="c-link">◈ Portfolio</a>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>Yashwi Bhatt · CSE @ LJ University · <span className="fg">2024–2028</span></p>
          <p>Made with <span className="fg">stubbornness ♥</span></p>
        </footer>
      </div>
    </>
  );
};

export default YashwiPortfolio;
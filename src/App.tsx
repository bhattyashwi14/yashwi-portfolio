import React, { useEffect, useState } from 'react';

export default function App() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in') });
    }, {threshold: 0.08});
    document.querySelectorAll('.fade').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const featuredProjects = [
    {
      id: 'reflecto',
      title: 'Reflecto',
      tags: ['Java + MySQL', '2470 LOC', 'Custom DSA']
    },
    {
      id: 'skilllink',
      title: 'SkillLink',
      tags: ['Django + SQLite', 'Multi-role platform', 'Live DB chatbot']
    },
    {
      id: 'library',
      title: 'Library System',
      tags: ['Java + OOP', '1st Semester', 'Foundations']
    }
  ];

  const projects = [
    {
      id: 'reflecto',
      title: 'Reflecto',
      github: 'https://github.com/bhattyashwi14/Reflecto',
      role: 'Team project · Java · MySQL · JDBC · 2nd Semester',
      body: [
        "This is the project I'm most proud of and the most honest one on this page. I built it entirely on my own, without AI tools, without asking anyone for the answer. Every bug was mine to find. Every solution was mine to figure out. And there were a lot of bugs.",
        "Reflecto is a personal productivity system: Journal, To-Do List, Challenges, Posts, and User Auth — 2,470 lines of Java, structured across independent modules that talk to each other cleanly. The part I'm most proud of technically: I didn't use Java Collections. I built the data structures from scratch, a Singly Linked List, a Stack, a Deque. Because I wanted to actually understand what was happening underneath. I also wrote a custom exception framework (LengthException, DigitException, EmptyDataException) rather than defaulting to generic handlers. MySQL is integrated via JDBC using stored procedures with CallableStatement for all CRUD operations.",
        "It still has bugs. It's still a work in progress. But building Reflecto taught me what patience actually looks like in code and how to break a problem down until it stops feeling impossible."
      ],
      stack: ['Java', 'MySQL', 'JDBC', 'Custom DSA', 'Custom Exceptions', 'OOP', 'Stored Procedures']
    },
    {
      id: 'skilllink',
      title: 'SkillLink',
      github: 'https://github.com/bhattyashwi14/SkillLink',
      role: 'Team project · Python · Django · SQLite · Frontend + Backend · 3rd Semester',
      body: [
        "SkillLink was where I applied everything. A multi-role platform: Learners find tutors, Tutors offer sessions, Clients hire for skill-based projects. Three completely separate dashboards, each with their own permissions and workflows. OTP-based email verification, automated booking confirmations, a live-database chatbot that queries real records (not static responses), and a full hiring workflow where clients post requests and tutors accept or reject with live status tracking.",
        "The most real moment of this project wasn't a feature, it was the night before presenting it at Innovation Village. The project was broken. Every fix created a new problem. We were overthinking it, going in circles, with investors to face the next morning. We stopped, called our professor, simplified the problem down to what actually mattered, and shipped a working version overnight. That night taught me more about building under pressure than any lecture ever has.",
        "SkillLink is where Reflecto's lessons of patience, breaking things down, not panicking became something I could actually use on a team, on a deadline, with real stakes."
      ],
      stack: ['Django', 'Python', 'SQLite', 'OTP Auth', 'Role-Based Access', 'Live DB Chatbot', 'HTML/CSS']
    },
    {
      id: 'library',
      title: 'Library Management System',
      github: 'https://github.com/bhattyashwi14/Library-Management-System',
      role: 'Team project · Java · OOP · 1st Semester',
      body: [
        "My first real project. Console-based, built with inheritance, encapsulation, and polymorphism — Book, Member, and Library modules with borrow/return tracking and member management. Small, but I understood every line I wrote. That mattered more than the feature count."
      ],
      stack: ['Java', 'OOP', 'Inheritance']
    }
  ];

  const currentlyBuilding = [
    { title: 'Data Science & ML', desc: 'Learning path through TensorFlow, model evaluation, and preprocessing' },
    { title: 'DSA Strengthening', desc: 'Through LeetCode grind — consistency over streaks' },
    { title: 'Backend Exploration', desc: 'Understanding how systems work under the hood' },
    { title: 'Discipline Building', desc: 'Getting better each day, one commit at a time' }
  ];

  const skills = [
    { name: 'Languages', vals: ['Java', 'Python', 'JavaScript'] },
    { name: 'Backend', vals: ['Django', 'Node.js', 'Express.js', 'REST APIs'] },
    { name: 'Frontend', vals: ['React.js', 'HTML5', 'CSS3', 'Tailwind'] },
    { name: 'Databases', vals: ['MySQL', 'MongoDB', 'SQLite', 'JDBC'] },
    { name: 'Concepts', vals: ['OOP', 'DSA', 'SDLC', 'Agile', 'DBMS'] },
    { name: 'Learning', vals: ['Machine Learning', 'Data Science', 'TensorFlow'] }
  ];

  const journeyItems = [
    {
      year: 'Hackathons',
      title: 'Hackovate · Bit & Build (Google DSC) · LDCE Online Round Qualified',
      desc: 'Three hackathons across two years. Each one a different kind of pressure and each one left me better at shipping under constraints, making decisions with incomplete information, and not giving up when things break at 2am.'
    },
    {
      year: 'Showcase',
      title: 'Innovation Village: Presented SkillLink to an industry panel',
      desc: 'Real stage. Real investors. We had a broken project the night before and a working one by morning. The moment it stopped feeling like a student project and started feeling like something real.'
    },
    {
      year: 'DSA Grind',
      title: '60+ LeetCode problems' ,
      desc: "Not a flashy number. But I show up. Even when the college exams hit and the streak breaks, I come back. That's the part I'm most consistent about."
    },
    {
      year: 'ML Exploration',
      title: 'Actively building foundations in Machine Learning & Data Science',
      desc: "Working through fundamentals: algorithms, data preprocessing, model evaluation. It's early. But it's intentional. AI and ML is where I want to go deep."
    },
    {
      year: 'Certificates',
      title: 'Java (Coursera) · DSA — UPenn · HTML/CSS/JS — IBM · Agile Scrum · Web3 & Rust — Arbitrum',
      desc: 'Plus workshops at DAIICT Devolution, JUG-GUJ Java Community Day, HexHunt, and Blockchain by Arbitrum Builders Lab. I go to things. I stay in the room. I stay curious.'
    }
  ];

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --bg: #0B0F1A;
          --bg2: #0F1520;
          --bg3: #141C2E;
          --ink: #E8E2D9;
          --ink2: #9BA3B0;
          --ink3: #5C6474;
          --gold: #EC4899;
          --gold2: #F472B6;
          --gold3: #FBC4D4;
          --lavender: #A855F7;
          --lavender2: #C084FC;
          --border: #1C2438;
          --border2: #263046;
        }
        html { scroll-behavior: smooth; font-size: 16px; }
        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        .wrap { max-width: 760px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }
        nav { padding: 1.6rem 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
        .logo { font-size: 0.85rem; font-weight: 600; color: var(--gold); letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: var(--ink3); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .nav-links a:hover { color: var(--gold); }

        .hero { padding: 7rem 0 5rem; border-bottom: 1px solid var(--border); }
        .hero-eyebrow { font-size: 0.75rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink3); margin-bottom: 2rem; display: flex; align-items: center; gap: 12px; }
        .hero-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--gold); display: block; }
        .hero h1 { font-size: clamp(2.4rem, 5.5vw, 3.8rem); font-weight: 700; line-height: 1.08; letter-spacing: -0.03em; color: #fff; margin-bottom: 2rem; }
        .hero h1 .accent { color: var(--gold); }
        .hero h1 .quiet { color: var(--ink2); font-weight: 400; }
        .hero-body { max-width: 540px; color: var(--ink2); font-size: 1.05rem; line-height: 1.8; font-weight: 300; }
        .hero-body p { margin-bottom: 1.1rem; }
        .hero-body strong { color: var(--ink); font-weight: 500; }
        .builder-line { display: inline-block; margin-top: 0.5rem; font-size: 0.82rem; font-style: italic; color: var(--gold2); letter-spacing: 0.03em; border-left: 2px solid var(--gold); padding-left: 0.9rem; }
        .hero-cta { margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .btn { display: inline-block; padding: 0.65rem 1.5rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; text-decoration: none; letter-spacing: 0.03em; transition: all 0.18s; }
        .btn-fill { background: var(--gold); color: #0B0F1A; }
        .btn-fill:hover { background: var(--gold2); transform: translateY(-1px); }
        .btn-line { border: 1px solid var(--border2); color: var(--ink2); }
        .btn-line:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-1px); }

        .section { padding: 5rem 0; border-bottom: 1px solid var(--border); }
        .section:last-of-type { border-bottom: none; }
        .section-eyebrow { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 10px; }
        .section-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--gold); display: block; }
        .section h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 2.5rem; }

        .about-text { color: var(--ink2); font-size: 1rem; line-height: 1.85; font-weight: 300; }
        .about-text p { margin-bottom: 1.2rem; }
        .about-text strong { color: var(--ink); font-weight: 500; }
        .about-text em { color: var(--gold2); font-style: normal; font-weight: 500; }
        .numbers-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-top: 3rem; }
        .num-cell { background: var(--bg2); padding: 1.4rem 1rem; text-align: center; transition: background 0.2s; }
        .num-cell:hover { background: var(--bg3); }
        .num-big { font-size: 1.9rem; font-weight: 700; color: var(--gold); line-height: 1; margin-bottom: 0.3rem; letter-spacing: -0.02em; }
        .num-label { font-size: 0.7rem; color: var(--ink3); letter-spacing: 0.06em; text-transform: uppercase; }

        .skills-section-inner { border: 1px solid var(--gold); border-radius: 12px; overflow: hidden; background: var(--bg2); }
        .skills-header { background: rgba(236, 72, 153, 0.08); border-bottom: 1px solid rgba(236, 72, 153, 0.2); padding: 0.9rem 1.4rem; display: flex; align-items: center; gap: 8px; }
        .skills-header-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
        .skills-header span { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold2); font-family: 'SF Mono', 'Monaco', monospace; }
        .skills-cols { display: grid; grid-template-columns: 1fr 1fr; }
        .skill-row { padding: 1rem 1.4rem; display: flex; gap: 1rem; align-items: baseline; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border); transition: background 0.15s; }
        .skill-row:nth-child(even) { border-right: none; }
        .skill-row:nth-last-child(-n+2) { border-bottom: none; }
        .skill-row:hover { background: var(--bg3); }
        .skill-name { font-size: 0.72rem; color: var(--gold2); letter-spacing: 0.08em; text-transform: uppercase; min-width: 85px; flex-shrink: 0; padding-top: 2px; font-family: 'SF Mono', 'Monaco', monospace; font-weight: 500; }
        .skill-vals { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill-val { font-size: 0.78rem; color: var(--ink); background: rgba(255,255,255,0.06); border: 1px solid rgba(236, 72, 153, 0.15); padding: 2px 9px; border-radius: 4px; font-family: 'SF Mono', 'Monaco', monospace; transition: border-color 0.2s, color 0.2s; }
        .skill-row:hover .skill-val { border-color: rgba(236, 72, 153, 0.35); color: var(--gold3); }

        /* FEATURED PROJECTS - New Section */
        .featured-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .featured-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          background: var(--bg2);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--lavender), var(--gold2));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .featured-card:hover { border-color: var(--lavender); transform: translateY(-4px); }
        .featured-card:hover::before { opacity: 1; }
        .featured-card h3 { font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .featured-tags { display: flex; flex-direction: column; gap: 0.5rem; }
        .featured-tag { font-size: 0.72rem; color: var(--ink2); font-family: 'SF Mono', monospace; }
        .featured-tag::before { content: '→ '; color: var(--lavender); }

        /* CURRENTLY BUILDING - New Section */
        .building-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .building-item {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .building-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--lavender), var(--gold));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .building-item:hover { border-color: var(--lavender); transform: translateY(-2px); }
        .building-item:hover::before { opacity: 1; }
        .building-item h3 { font-size: 0.95rem; color: var(--lavender); margin-bottom: 0.5rem; font-weight: 600; }
        .building-item p { font-size: 0.8rem; color: var(--ink3); line-height: 1.5; }

        .project { border: 1px solid var(--border); border-radius: 12px; padding: 2rem; margin-bottom: 1.4rem; background: var(--bg2); transition: border-color 0.2s, transform 0.2s; position: relative; overflow: hidden; }
        .project::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--gold); opacity: 0; transition: opacity 0.3s; }
        .project:hover { border-color: var(--border2); transform: translateY(-2px); }
        .project:hover::after { opacity: 0.6; }
        .project-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; gap: 1rem; }
        .project h3 { font-size: 1.2rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .project-link { font-size: 0.75rem; color: var(--gold); text-decoration: none; border: 1px solid rgba(236, 72, 153, 0.3); padding: 3px 10px; border-radius: 4px; font-family: 'SF Mono', monospace; letter-spacing: 0.04em; flex-shrink: 0; transition: all 0.2s; }
        .project-link:hover { background: rgba(236, 72, 153, 0.08); }
        .project-role { font-size: 0.75rem; color: var(--ink3); font-family: 'SF Mono', monospace; letter-spacing: 0.05em; margin-bottom: 1.2rem; }
        .project-body { color: var(--ink2); font-size: 0.92rem; line-height: 1.78; font-weight: 300; margin-bottom: 1.4rem; }
        .project-body p { margin-bottom: 0.9rem; }
        .project-body p:last-child { margin-bottom: 0; }
        .project-body strong { color: var(--ink); font-weight: 500; }
        .project-body em { color: var(--gold2); font-style: italic; }
        .tech-label { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink3); margin-bottom: 0.5rem; font-family: 'SF Mono', monospace; }
        .project-stack { display: flex; flex-wrap: wrap; gap: 5px; }
        .stack-tag { font-size: 0.72rem; font-family: 'SF Mono', monospace; color: var(--ink3); border: 1px solid var(--border2); padding: 2px 8px; border-radius: 3px; letter-spacing: 0.03em; transition: color 0.2s, border-color 0.2s; }
        .project:hover .stack-tag { color: var(--ink2); border-color: rgba(236, 72, 153, 0.2); }

        .journey-item { display: grid; grid-template-columns: 100px 1fr; gap: 2rem; padding: 1.8rem 0; border-bottom: 1px solid var(--border); align-items: start; }
        .journey-item:first-child { padding-top: 0; }
        .journey-item:last-child { border-bottom: none; padding-bottom: 0; }
        .journey-year { font-size: 0.7rem; font-family: 'SF Mono', monospace; letter-spacing: 0.08em; color: var(--lavender); text-transform: uppercase; padding-top: 3px; }
        .journey-right h3 { font-size: 0.98rem; font-weight: 600; color: #fff; margin-bottom: 0.4rem; line-height: 1.3; }
        .journey-right p { font-size: 0.88rem; color: var(--ink2); line-height: 1.7; font-weight: 300; }
        .journey-right p strong { color: var(--ink); font-weight: 500; }

        .contact-text { font-size: 1.05rem; color: var(--ink2); line-height: 1.85; font-weight: 300; max-width: 500px; margin-bottom: 2.5rem; }
        .contact-text strong { color: var(--ink); font-weight: 500; }
        .contact-grid { display: flex; flex-wrap: wrap; gap: 0.7rem; }
        .contact-item { display: flex; align-items: center; gap: 8px; background: var(--bg2); border: 1px solid var(--border); padding: 0.6rem 1.1rem; border-radius: 7px; text-decoration: none; color: var(--ink2); font-size: 0.82rem; font-family: 'SF Mono', monospace; letter-spacing: 0.03em; transition: all 0.18s; }
        .contact-item:hover { border-color: var(--gold); color: var(--gold); }

        footer { padding: 2rem 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        footer p { font-size: 0.75rem; color: var(--ink3); font-family: 'SF Mono', monospace; letter-spacing: 0.05em; }

        .fade { opacity: 0; transform: translateY(16px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .fade.in { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.08s; }
        .d2 { transition-delay: 0.16s; }
        .d3 { transition-delay: 0.24s; }

        /* Modal */
        .modal-backdrop { position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-content { background: var(--bg); border: 1px solid var(--lavender); border-radius: 12px; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2.5rem; position: relative; }
        .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--lavender); font-size: 1.5rem; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: var(--lavender2); }

        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr; }
          .building-grid { grid-template-columns: 1fr; }
          .numbers-row { grid-template-columns: repeat(2, 1fr); }
          .skills-cols { grid-template-columns: 1fr; }
          .skill-row { border-right: none !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .building-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="wrap">
        <nav>
          <a href="#" className="logo">Yashwi Bhatt</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#work">Projects</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div className="hero-eyebrow">CSE Student · LJ University · Ahmedabad</div>
          <h1>
            No one's coming<br />
            <span className="quiet">to save me.</span><br />
            <span className="accent">So I figure it out myself.</span>
          </h1>
          <div className="hero-body">
            <p>I'm Yashwi a second year, fourth semester student and I'm, <strong>dead serious about where I'm going.</strong></p>
            <p>I panic. I overthink. I question everything. And then I open my laptop and get to work anyway because waiting until I feel ready has never been an option I gave myself.</p>
            <p>I'm building my foundations in <strong>DSA, Machine Learning, and Backend Development.</strong> Not because someone told me to, but because I want to be the person people come to when they're stuck.</p>
            <span className="builder-line">"A builder in progress who takes her growth seriously."</span>
          </div>
          <div className="hero-cta">
            <a href="#work" className="btn btn-fill">See my work</a>
            <a href="mailto:bhattyashwi@gmail.com" className="btn btn-line">Get in touch</a>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section-eyebrow">Who I am</div>
          <h2>Serious about growth.<br />Even when it's uncomfortable.</h2>
          <div className="about-text">
            <p>I'm not the person who has it all figured out. I'm the person who <strong>shows up anyway.</strong> For the 25-mark test, the late-night bug, the hackathon I'm not sure I'll do well in.</p>
            <p>When I'm in a room, I want to be the person people <em>look to</em>. Not because I'm loud, but because I actually know my stuff. That standard drives me more than any deadline ever could.</p>
            <p>Right now I'm a 4th semester CSE student at LJ University, Ahmedabad. <strong>CGPA 9.83 last semester</strong>, actively strengthening my DSA and ML foundations, and building things that are more than just submissions.</p>
          </div>
          <div className="numbers-row fade">
            <div className="num-cell">
              <div className="num-big">9.83</div>
              <div className="num-label">Sem 3 CGPA</div>
            </div>
            <div className="num-cell">
              <div className="num-big">60+</div>
              <div className="num-label">LeetCode</div>
            </div>
            <div className="num-cell">
              <div className="num-big">500+</div>
              <div className="num-label">GitHub</div>
            </div>
            <div className="num-cell">
              <div className="num-big">3</div>
              <div className="num-label">Hackathons</div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="section-eyebrow">What I work with</div>
          <h2>Skills</h2>
          <div className="skills-section-inner fade">
            <div className="skills-header">
              <div className="skills-header-dot"></div>
              <span>Current stack · actively expanding</span>
            </div>
            <div className="skills-cols">
              {skills.map((skill, idx) => (
                <div key={idx} className="skill-row">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-vals">
                    {skill.vals.map((val, i) => (
                      <span key={i} className="skill-val">{val}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS - BEFORE detailed projects */}
        <section className="section">
          <div className="section-eyebrow">What I've built</div>
          <h2>Featured Projects</h2>
          <div className="featured-grid fade">
            {featuredProjects.map((fp) => (
              <div key={fp.id} className="featured-card" onClick={() => setExpandedProject(fp.id)}>
                <h3>{fp.title}</h3>
                <div className="featured-tags">
                  {fp.tags.map((t, i) => (
                    <div key={i} className="featured-tag">{t}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CURRENTLY BUILDING */}
        <section className="section">
          <div className="section-eyebrow">Right now</div>
          <h2>Currently Building</h2>
          <div className="building-grid fade">
            {currentlyBuilding.map((item, idx) => (
              <div key={idx} className="building-item">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS - Detailed */}
        <section className="section" id="work">
          <h2>All Projects</h2>
          {projects.map((project, idx) => (
            <div key={project.id} className={`project fade ${idx === 1 ? 'd1' : ''} ${idx === 2 ? 'd2' : ''}`}>
              <div className="project-top">
                <h3>{project.title}</h3>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    GitHub ↗
                  </a>
                )}
              </div>
              <div className="project-role">{project.role}</div>
              <div className="project-body">
                {project.body.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              <div className="tech-label">Stack</div>
              <div className="project-stack">
                {project.stack.map((tag, i) => (
                  <span key={i} className="stack-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* JOURNEY */}
        <section className="section" id="journey">
          <div className="section-eyebrow">Beyond projects</div>
          <h2>The journey</h2>
          {journeyItems.map((item, idx) => (
            <div key={idx} className={`journey-item fade ${idx === 1 ? 'd1' : ''} ${idx === 2 ? 'd2' : ''} ${idx === 3 ? 'd3' : ''}`}>
              <div className="journey-year">{item.year}</div>
              <div className="journey-right">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="section-eyebrow">Let's talk</div>
          <h2>Looking to contribute, learn,<br />and grow through meaningful internship opportunities.</h2>
          <div className="contact-text">
            I'm not going to pretend I know everything. But I <strong>learn fast, take things seriously, and do the work.</strong> Even when it's hard, even when I'm scared I'll get it wrong. If that's the kind of energy your team needs, I'd love to talk.
          </div>
          <div className="contact-grid">
            <a href="mailto:bhattyashwi@gmail.com" className="contact-item">bhattyashwi@gmail.com</a>
            <a href="https://linkedin.com/in/yashwi-bhatt-441b87384" target="_blank" className="contact-item">LinkedIn</a>
            <a href="https://github.com/bhattyashwi14" target="_blank" className="contact-item">GitHub</a>
            <a href="https://leetcode.com/u/bhattyashwi__/" target="_blank" className="contact-item">LeetCode</a>
            <a
                href="Yashwi_Bhatt_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                Resume
            </a>
          </div>
        </section>

        <footer>
          <p>Yashwi Bhatt · CSE @ LJ University · 2024–2028</p>
        </footer>
      </div>

      {/* Modal */}
      {expandedProject && (
        <div className="modal-backdrop" onClick={() => setExpandedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setExpandedProject(null)}>×</button>
            {(() => {
              const project = projects.find(p => p.id === expandedProject);
              if (!project) return null;
              return (
                <>
                  <div className="project-top">
                    <h3 style={{ fontSize: '1.8rem' }}>{project.title}</h3>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                  <div className="project-role">{project.role}</div>
                  <div className="project-body" style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.9' }}>
                    {project.body.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                  <div className="tech-label">Stack</div>
                  <div className="project-stack">
                    {project.stack.map((tag, i) => (
                      <span key={i} className="stack-tag">{tag}</span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

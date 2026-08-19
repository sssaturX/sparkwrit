import { Generator } from "@/components/Generator";

export default function Home() {
  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden>
            S
          </span>
          <span>
            <span className="brand-name">Sparkwrit</span>
            <span className="brand-tag">AI writing studio</span>
          </span>
        </a>
        <nav className="top-links" aria-label="Ссылки">
          <a
            href="https://github.com/sssaturX/sparkwrit"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="nav-cta" href="#studio">
            Открыть студию
          </a>
        </nav>
      </header>

      <section className="hero">
        <p className="hero-kicker">Sparkwrit</p>
        <h1>
          Текст с нужной <em>тональностью</em> за минуту
        </h1>
        <p>
          Посты, резюме и сопроводительные письма — выбери тон, опиши тему и
          получи готовый текст.
        </p>
      </section>

      <div id="studio">
        <Generator />
      </div>

      <footer className="footer">
        <span>Vibe Coding intensive · тема 1</span>
        <span>Next.js · OpenAI · Vercel</span>
      </footer>
    </div>
  );
}

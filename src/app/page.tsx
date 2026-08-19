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
            <span className="brand-tag">AI writing micro-SaaS</span>
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
          <a
            href="https://sparkwrit.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
          <a href="#studio">Студия</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Текст с нужной тональностью за минуту</h1>
        <p>
          Посты, резюме и сопроводительные письма — с выбором тона, историей в
          браузере и деплоем на Vercel.
        </p>
      </section>

      <div id="studio">
        <Generator />
      </div>

      <footer className="footer">
        <span>Vibe Coding intensive · тема 1: AI Micro-SaaS</span>
        <span>Next.js · OpenAI · localStorage · Vercel</span>
      </footer>
    </div>
  );
}

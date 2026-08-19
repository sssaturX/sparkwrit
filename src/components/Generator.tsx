"use client";

import { useCallback, useEffect, useState } from "react";
import { Toast } from "@/components/Toast";
import { clearHistory, loadHistory, saveHistory } from "@/lib/history";
import {
  CONTENT_TYPES,
  TONES,
  type ContentType,
  type HistoryItem,
  type Tone,
} from "@/lib/types";

export function Generator() {
  const [type, setType] = useState<ContentType>("post");
  const [tone, setTone] = useState<Tone>("professional");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"demo" | "openai" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, tone, topic, audience, extra }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка генерации");
        return;
      }

      setResult(data.result);
      setMode(data.mode);

      const item: HistoryItem = {
        id: crypto.randomUUID(),
        type,
        tone,
        topic,
        result: data.result,
        createdAt: new Date().toISOString(),
      };
      const next = [item, ...history].slice(0, 30);
      setHistory(next);
      saveHistory(next);
      showToast(data.mode === "demo" ? "Готово · демо-режим" : "Готово · OpenAI");
    } catch {
      setError("Сеть недоступна. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      showToast("Скопировано в буфер");
    } catch {
      showToast("Не удалось скопировать");
    }
  }

  function restoreItem(item: HistoryItem) {
    setType(item.type);
    setTone(item.tone);
    setTopic(item.topic);
    setResult(item.result);
    setMode(null);
    showToast("Загрузка из истории");
  }

  function onClearHistory() {
    clearHistory();
    setHistory([]);
    showToast("История очищена");
  }

  return (
    <>
      <div className="studio">
        <aside className="panel form-panel reveal">
          <form onSubmit={onGenerate} className="stack">
            <fieldset className="fieldset">
              <legend>Что генерируем</legend>
              <div className="type-grid" role="radiogroup" aria-label="Тип контента">
                {CONTENT_TYPES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={type === item.id}
                    className={`type-btn ${type === item.id ? "active" : ""}`}
                    onClick={() => setType(item.id)}
                  >
                    <span className="type-label">{item.label}</span>
                    <span className="type-hint">{item.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Тональность</legend>
              <div className="tone-row" role="radiogroup" aria-label="Тон">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={tone === item.id}
                    className={`tone-chip ${tone === item.id ? "active" : ""}`}
                    onClick={() => setTone(item.id)}
                    title={item.desc}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span>Тема / контекст</span>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Например: как я перешёл в продукт из разработки за 8 месяцев"
                rows={4}
                required
                minLength={8}
              />
            </label>

            <label className="field">
              <span>Аудитория (опционально)</span>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Джуны, HR, фаундеры…"
              />
            </label>

            <label className="field">
              <span>Дополнительно (опционально)</span>
              <input
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="CTA, ключевые цифры, запрет на клише…"
              />
            </label>

            {error && <p className="error-box">{error}</p>}

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" aria-hidden />
                  Генерируем…
                </span>
              ) : (
                "Сгенерировать"
              )}
            </button>
          </form>
        </aside>

        <section className="panel result-panel reveal delay-1">
          <div className="result-head">
            <h2>Результат</h2>
            <div className="result-actions">
              {mode && (
                <span className={`mode-pill mode-${mode}`}>
                  {mode === "demo" ? "Demo" : "OpenAI"}
                </span>
              )}
              <button
                type="button"
                className="ghost-btn"
                onClick={copyResult}
                disabled={!result}
              >
                Копировать
              </button>
            </div>
          </div>

          {result ? (
            <pre className="result-body">{result}</pre>
          ) : (
            <div className="result-empty">
              <p>Здесь появится готовый текст.</p>
              <p className="muted">
                Без ключа OpenAI приложение работает в демо-режиме — удобно для
                локального запуска и питча.
              </p>
            </div>
          )}
        </section>

        <aside className="panel history-panel reveal delay-2">
          <div className="result-head">
            <h2>История</h2>
            <button
              type="button"
              className="ghost-btn"
              onClick={onClearHistory}
              disabled={history.length === 0}
            >
              Очистить
            </button>
          </div>
          {history.length === 0 ? (
            <p className="muted history-empty">Пока пусто — сгенерируйте первый текст.</p>
          ) : (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id}>
                  <button type="button" className="history-item" onClick={() => restoreItem(item)}>
                    <span className="history-meta">
                      {CONTENT_TYPES.find((t) => t.id === item.type)?.label} ·{" "}
                      {TONES.find((t) => t.id === item.tone)?.label}
                    </span>
                    <span className="history-topic">{item.topic}</span>
                    <time dateTime={item.createdAt}>
                      {new Date(item.createdAt).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  );
}

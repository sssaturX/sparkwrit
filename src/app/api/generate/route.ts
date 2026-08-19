import { NextResponse } from "next/server";
import { buildDemoResult, buildSystemPrompt } from "@/lib/demo";
import type { ContentType, Tone } from "@/lib/types";

const ALLOWED_TYPES: ContentType[] = ["post", "resume", "cover"];
const ALLOWED_TONES: Tone[] = [
  "professional",
  "friendly",
  "bold",
  "witty",
  "concise",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type as ContentType;
    const tone = body.tone as Tone;
    const topic = String(body.topic ?? "").trim();
    const audience = String(body.audience ?? "").trim();
    const extra = String(body.extra ?? "").trim();

    if (!ALLOWED_TYPES.includes(type) || !ALLOWED_TONES.includes(tone)) {
      return NextResponse.json(
        { error: "Некорректный тип или тон." },
        { status: 400 },
      );
    }

    if (topic.length < 8) {
      return NextResponse.json(
        { error: "Опишите тему подробнее (минимум 8 символов)." },
        { status: 400 },
      );
    }

    if (topic.length > 1200) {
      return NextResponse.json(
        { error: "Тема слишком длинная (макс. 1200 символов)." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const result = buildDemoResult(type, tone, topic, audience, extra);
      return NextResponse.json({
        result,
        mode: "demo" as const,
      });
    }

    const userPrompt = [
      `Тема / контекст: ${topic}`,
      audience ? `Аудитория: ${audience}` : null,
      extra ? `Дополнительно: ${extra}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.75,
        messages: [
          { role: "system", content: buildSystemPrompt(type, tone) },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("OpenAI error:", openaiRes.status, errText);
      return NextResponse.json(
        {
          error:
            "OpenAI вернул ошибку. Проверьте ключ и лимиты, либо уберите OPENAI_API_KEY для демо-режима.",
        },
        { status: 502 },
      );
    }

    const data = (await openaiRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const result = data.choices?.[0]?.message?.content?.trim();
    if (!result) {
      return NextResponse.json(
        { error: "Пустой ответ от модели. Попробуйте ещё раз." },
        { status: 502 },
      );
    }

    return NextResponse.json({ result, mode: "openai" as const });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось сгенерировать текст. Попробуйте позже." },
      { status: 500 },
    );
  }
}

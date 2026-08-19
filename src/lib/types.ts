export type ContentType = "post" | "resume" | "cover";

export type Tone =
  | "professional"
  | "friendly"
  | "bold"
  | "witty"
  | "concise";

export interface GenerateRequest {
  type: ContentType;
  tone: Tone;
  topic: string;
  audience?: string;
  extra?: string;
}

export interface HistoryItem {
  id: string;
  type: ContentType;
  tone: Tone;
  topic: string;
  result: string;
  createdAt: string;
}

export const CONTENT_TYPES: {
  id: ContentType;
  label: string;
  hint: string;
}[] = [
  {
    id: "post",
    label: "Пост",
    hint: "LinkedIn / X / Telegram",
  },
  {
    id: "resume",
    label: "Резюме",
    hint: "Блок опыта или summary",
  },
  {
    id: "cover",
    label: "Письмо",
    hint: "Сопроводительное письмо",
  },
];

export const TONES: { id: Tone; label: string; desc: string }[] = [
  { id: "professional", label: "Профессиональный", desc: "Чётко и уверенно" },
  { id: "friendly", label: "Дружелюбный", desc: "Тёплый и живой" },
  { id: "bold", label: "Смелый", desc: "Сильный акцент на результат" },
  { id: "witty", label: "Острый", desc: "С лёгким юмором" },
  { id: "concise", label: "Лаконичный", desc: "Коротко и по делу" },
];

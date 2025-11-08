// src/lib/openrouter.ts
import { OpenRouter } from "@openrouter/sdk";

declare global {
  // eslint-disable-next-line no-var
  var __openrouter__: OpenRouter | undefined;
}

export function getOpenRouter() {
  if (global.__openrouter__) return global.__openrouter__;
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey)
    throw new Error("OPENROUTER_API_KEY manquant dans l'environnement.");
  const client = new OpenRouter({ apiKey });
  if (process.env.NODE_ENV !== "production") global.__openrouter__ = client;
  return client;
}

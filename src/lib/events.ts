// Privacy-first conversion analytics. No cookies, no third parties, no IPs, no
// fingerprinting — just a count of the actions that turn a visitor into a lead
// (WhatsApp taps, call taps, email taps, form submits) so the owner can see what
// actually works. Stored as NDJSON in data/events.ndjson.
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

export const EVENT_TYPES = [
  "whatsapp_click",
  "call_click",
  "email_click",
  "lead_submitted",
  "booking_submitted",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export function isEventType(v: unknown): v is EventType {
  return typeof v === "string" && (EVENT_TYPES as readonly string[]).includes(v);
}

export interface ConversionEvent {
  type: EventType;
  path: string; // page the action happened on (no query, trimmed)
  locale: string;
  at: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.ndjson");

export async function recordEvent(e: ConversionEvent): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(EVENTS_FILE, JSON.stringify(e) + "\n", "utf8");
  } catch (err) {
    console.error("[event] could not write data/events.ndjson:", err);
  }
}

export async function readEvents(): Promise<ConversionEvent[]> {
  try {
    const raw = await fs.readFile(EVENTS_FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as ConversionEvent;
        } catch {
          return null;
        }
      })
      .filter((x): x is ConversionEvent => x !== null);
  } catch {
    return [];
  }
}

export function summarise(events: ConversionEvent[]) {
  const byType: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  for (const e of events) {
    byType[e.type] = (byType[e.type] ?? 0) + 1;
    byPath[e.path] = (byPath[e.path] ?? 0) + 1;
  }
  return { total: events.length, byType, byPath };
}

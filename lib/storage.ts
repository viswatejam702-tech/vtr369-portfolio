"use client";

// ============================================================================
// Simple browser-side content store for the admin panel.
//
// This works immediately with zero setup: anything you add in /admin is
// saved in your browser's localStorage and shows up instantly on the site.
//
// LIMITATION: localStorage is per-browser, per-device. If you want content
// added on your phone to also appear on your laptop / for every visitor
// worldwide, swap this file's get/set functions for calls to a real database
// (Supabase's free tier is the fastest path — see README.md "Going further").
// ============================================================================

export type ContentCategory = "project" | "app" | "landing_page" | "social_post" | "prompt";

export type ContentItem = {
  id: string;
  category: ContentCategory;
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  createdAt: string;
};

const CONTENT_KEY = "vtr369_content_items";
const TICKER_KEY = "vtr369_ticker_items";
const AUTH_KEY = "vtr369_admin_authed";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getContentItems(): ContentItem[] {
  return read<ContentItem[]>(CONTENT_KEY, []);
}

export function addContentItem(item: Omit<ContentItem, "id" | "createdAt">) {
  const items = getContentItems();
  const newItem: ContentItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write(CONTENT_KEY, [newItem, ...items]);
  return newItem;
}

export function deleteContentItem(id: string) {
  write(
    CONTENT_KEY,
    getContentItems().filter((i) => i.id !== id)
  );
}

export function getTickerItems(seed: string[]): string[] {
  return read<string[]>(TICKER_KEY, seed);
}

export function setTickerItems(items: string[]) {
  write(TICKER_KEY, items);
}

export function isAdminAuthed(): boolean {
  return read<boolean>(AUTH_KEY, false);
}

export function setAdminAuthed(v: boolean) {
  write(AUTH_KEY, v);
}

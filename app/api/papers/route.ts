import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export const runtime = "nodejs";

type PaperMeta = {
  id: string;
  title: string;
  description: string;
  field: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
};

const INDEX_PATH = "papers/index.json";
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_BYTES = 20 * 1024 * 1024; // 20MB

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAdmin(req: NextRequest) {
  const provided = req.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;
  // If no server-side secret is configured, refuse writes rather than silently
  // allowing anyone to publish to the public papers library.
  if (!expected) return false;
  return provided === expected;
}

async function readIndex(): Promise<PaperMeta[]> {
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === INDEX_PATH);
    if (!match) return [];
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as PaperMeta[];
  } catch {
    return [];
  }
}

async function writeIndex(papers: PaperMeta[]) {
  await put(INDEX_PATH, JSON.stringify(papers), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function GET() {
  const papers = await readIndex();
  papers.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
  return NextResponse.json({ papers });
}

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "File storage isn't configured yet. Enable Vercel Blob for this project and redeploy." },
      { status: 503 }
    );
  }
  if (!checkAdmin(req)) return unauthorized();

  const form = await req.formData();
  const file = form.get("file");
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const field = String(form.get("field") ?? "Other").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF and Word (.doc/.docx) files are accepted." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (20MB max)." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const blob = await put(`papers/files/${id}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  const papers = await readIndex();
  const entry: PaperMeta = {
    id,
    title,
    description,
    field,
    fileUrl: blob.url,
    fileName: file.name,
    fileType: file.type,
    uploadedAt: new Date().toISOString(),
  };
  papers.unshift(entry);
  await writeIndex(papers);

  return NextResponse.json({ paper: entry }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkAdmin(req)) return unauthorized();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const papers = await readIndex();
  const target = papers.find((p) => p.id === id);
  if (!target) return NextResponse.json({ error: "Not found." }, { status: 404 });

  try {
    await del(target.fileUrl);
  } catch {
    // File may already be gone — proceed to clean up the index regardless.
  }
  await writeIndex(papers.filter((p) => p.id !== id));

  return NextResponse.json({ ok: true });
}

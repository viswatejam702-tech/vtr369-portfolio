import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "Anonymous Visitor").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const company = String(body.company || "").trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const formattedText = `Hi Viswa, my name is ${name}${company ? ` from ${company}` : ""}${
      email ? ` (${email})` : ""
    }. Message: "${message}"`;

    const encodedWhatsApp = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      formattedText
    )}`;

    // Optional webhook forwarding if DISCORD_WEBHOOK_URL or SLACK_WEBHOOK_URL is set in environment
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Portfolio Inquiry from ${name}**\n**Email**: ${email || "N/A"}\n**Company**: ${company || "N/A"}\n**Message**: ${message}\n**Time**: ${timestamp}`,
          }),
        });
      } catch {
        // Non-blocking fallback
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Viswa will reply shortly.",
      directWhatsAppUrl: encodedWhatsApp,
      timestamp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to process message." }, { status: 500 });
  }
}

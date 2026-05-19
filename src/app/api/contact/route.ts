import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Basic validation
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: (body.phone || "").trim(),
        subject: subject.trim(),
        message: message.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    // Kirim email notifikasi ke admin
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: `"${name.trim()}" <${process.env.GMAIL_USER}>`,
        replyTo: email.trim(),
        to: process.env.CONTACT_EMAIL_TO ?? process.env.GMAIL_USER,
        subject: `[Wana Digital] ${subject.trim()}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">Pesan Baru dari Contact Form</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #8a8578; width: 120px;">Nama</td><td style="padding: 8px 0;">${name.trim()}</td></tr>
              <tr><td style="padding: 8px 0; color: #8a8578;">Email</td><td style="padding: 8px 0;">${email.trim()}</td></tr>
              ${
                body.phone
                  ? `<tr><td style="padding: 8px 0; color: #8a8578;">Telepon</td><td style="padding: 8px 0;">${(
                      body.phone as string
                    ).trim()}</td></tr>`
                  : ""
              }
              <tr><td style="padding: 8px 0; color: #8a8578;">Subjek</td><td style="padding: 8px 0;">${subject.trim()}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0dbd3; margin: 16px 0;" />
            <h3 style="color: #1a1a1a;">Pesan</h3>
            <p style="color: #3a3a3a; white-space: pre-wrap;">${message.trim()}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

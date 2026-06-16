import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json(
        { error: "Identifier (phone or email) is required" },
        { status: 400 }
      );
    }

    // In a real application, you would integrate with Twilio for SMS
    // or Resend/SendGrid for email to send the OTP.
    
    // For now, we mock the success response.
    console.log(`Mock: Sending OTP to ${identifier}`);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}

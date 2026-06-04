import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendOTP(phoneNumber: string) {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    return {
      success: true,
      sid: verification.sid,
      status: verification.status,
    };
  } catch (error) {
    console.error("Failed to send OTP:", error);

    return {
      success: false,
      error,
    };
  }
}

export async function verifyOTP(
  phoneNumber: string,
  code: string
): Promise<boolean> {
  const verificationCheck = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
    .verificationChecks.create({
      to: phoneNumber,
      code,
    });

  return verificationCheck.status === "approved";
}
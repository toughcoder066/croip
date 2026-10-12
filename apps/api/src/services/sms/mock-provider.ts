import type { SmsProvider, SmsSendOptions, SmsSendResult } from "./types.js";
import { normalizeGhanaPhoneNumber } from "./phone-utils.js";

export interface SentMessageRecord {
  to: string[];
  sender: string;
  message: string;
  sentAt: Date;
}

export class MockSmsProvider implements SmsProvider {
  public readonly name = "MockSms";
  public readonly sentMessages: SentMessageRecord[] = [];

  async sendSms(options: SmsSendOptions): Promise<SmsSendResult> {
    const recipients = Array.isArray(options.to)
      ? options.to.map(normalizeGhanaPhoneNumber)
      : [normalizeGhanaPhoneNumber(options.to)];

    const sender = options.senderId || "CROIP";

    const record: SentMessageRecord = {
      to: recipients,
      sender,
      message: options.message,
      sentAt: new Date(),
    };

    this.sentMessages.push(record);

    console.log(`[MockSms] 📱 SMS dispatched to ${recipients.join(", ")} from ${sender}: "${options.message}"`);

    return {
      success: true,
      messageId: `mock-msg-${Date.now()}`,
      rawResponse: { status: "success", mock: true },
    };
  }

  async sendOtp(params: {
    phoneNumber: string;
    code: string;
    expiresInMinutes?: number;
    appName?: string;
  }): Promise<SmsSendResult> {
    const minutes = params.expiresInMinutes ?? 10;
    const app = params.appName ?? "CROIP";
    const message = `Your ${app} verification code is ${params.code}. It expires in ${minutes} minutes. Never share this code with anyone.`;

    return this.sendSms({
      to: params.phoneNumber,
      message,
    });
  }

  clear(): void {
    this.sentMessages.length = 0;
  }
}

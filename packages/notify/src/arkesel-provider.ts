import type { SmsProvider, SmsSendOptions, SmsSendResult } from "./types.js";
import { normalizeGhanaPhoneNumber } from "./phone-utils.js";

export interface ArkeselConfig {
  apiKey: string;
  senderId?: string;
  baseUrl?: string;
}

export class ArkeselSmsProvider implements SmsProvider {
  public readonly name = "Arkesel";
  private apiKey: string;
  private defaultSenderId: string;
  private baseUrl: string;

  constructor(config: ArkeselConfig) {
    this.apiKey = config.apiKey;
    this.defaultSenderId = config.senderId || "CROIP";
    this.baseUrl = config.baseUrl || "https://sms.arkesel.com/api/v2/sms/send";
  }

  async sendSms(options: SmsSendOptions): Promise<SmsSendResult> {
    const recipients = Array.isArray(options.to)
      ? options.to.map(normalizeGhanaPhoneNumber)
      : [normalizeGhanaPhoneNumber(options.to)];

    const sender = options.senderId || this.defaultSenderId;

    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          recipients,
          message: options.message,
        }),
      });

      const data = (await response.json()) as any;

      if (!response.ok || (data && data.status === "error")) {
        return {
          success: false,
          error: data?.message || `Arkesel request failed with status ${response.status}`,
          rawResponse: data,
        };
      }

      return {
        success: true,
        messageId: data?.data?.message_id || data?.id || undefined,
        rawResponse: data,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Network error contacting Arkesel SMS gateway",
      };
    }
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
}

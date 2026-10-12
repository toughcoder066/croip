export interface SmsSendOptions {
  to: string | string[];
  message: string;
  senderId?: string;
}

export interface SmsSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  rawResponse?: unknown;
}

export interface SmsProvider {
  name: string;
  sendSms(options: SmsSendOptions): Promise<SmsSendResult>;
  sendOtp(params: {
    phoneNumber: string;
    code: string;
    expiresInMinutes?: number;
    appName?: string;
  }): Promise<SmsSendResult>;
}

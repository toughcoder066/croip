/**
 * Parameters for dispatching an SMS message to one or multiple recipients.
 */
export interface SmsSendOptions {
  /** Single Ghanaian phone number or array of phone numbers. */
  to: string | string[];
  /** Message text content to dispatch. */
  message: string;
  /** Approved alphanumeric Sender ID (defaults to 'CROIP'). */
  senderId?: string;
}

/**
 * Result returned upon attempting SMS delivery through a provider.
 */
export interface SmsSendResult {
  /** Whether the gateway accepted the message for delivery. */
  success: boolean;
  /** Unique gateway tracking reference or message ID. */
  messageId?: string;
  /** Error message if the dispatch failed. */
  error?: string;
  /** Raw unprocessed response payload returned by the gateway. */
  rawResponse?: unknown;
}

/**
 * Common provider interface for SMS and OTP dispatch across Central Platform services.
 */
export interface SmsProvider {
  /** Identifier name of the active provider (e.g. 'Arkesel', 'MockSms'). */
  name: string;
  /** Dispatches an arbitrary SMS text message. */
  sendSms(options: SmsSendOptions): Promise<SmsSendResult>;
  /** Dispatches a standardized security OTP verification message. */
  sendOtp(params: {
    phoneNumber: string;
    code: string;
    expiresInMinutes?: number;
    appName?: string;
  }): Promise<SmsSendResult>;
}

import type { SmsProvider } from "./types.js";
import { ArkeselSmsProvider } from "./arkesel-provider.js";
import { MockSmsProvider } from "./mock-provider.js";

export * from "./types.js";
export * from "./phone-utils.js";
export * from "./arkesel-provider.js";
export * from "./mock-provider.js";

let defaultProviderInstance: SmsProvider | null = null;

export function getSmsProvider(options?: {
  apiKey?: string;
  senderId?: string;
  forceMock?: boolean;
}): SmsProvider {
  if (options?.forceMock) {
    return new MockSmsProvider();
  }

  const apiKey = options?.apiKey || process.env.ARKESEL_API_KEY;
  const senderId = options?.senderId || process.env.ARKESEL_SENDER_ID || "CROIP";

  if (apiKey) {
    return new ArkeselSmsProvider({ apiKey, senderId });
  }

  if (!defaultProviderInstance) {
    defaultProviderInstance = new MockSmsProvider();
  }

  return defaultProviderInstance;
}

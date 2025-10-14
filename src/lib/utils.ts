interface FormatDateOptions {
    day: 'numeric';
    month: 'long';
    year: 'numeric';
}

export const formatdate = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    } as FormatDateOptions);
}

export const formatTime = (time?: string): string => {
    if (!time) return "";
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

// ✅ Get FBC from URL (fbclid param) and store in cookie
// Try to read _fbc from cookie
export function getFbcFromCookie() {
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : null;
}

// Try to read _fbp from cookie
export function getFbpFromCookie() {
  const match = document.cookie.match(/_fbp=([^;]+)/);
  if (match) return match[1];

  // 🔥 Fallback: sometimes fbq holds fbp
  if (typeof window !== "undefined" && window.fbq && window.fbq.get) {
    try {
      const fbp = window.fbq.get("fbp");
      return fbp || null;
    } catch (e) {
      console.warn("Could not get fbp from fbq", e);
    }
  }

  return null;
}

// Try to construct _fbc from URL if fbclid exists
export function getFbcFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${fbc}; path=/; max-age=${60 * 60 * 24 * 90}`;
    return fbc;
  }
  return null;
}





// utils/encryption.ts
export async function encryptSabPaisaPayload(payload: any, authKey: string, ivKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(authKey.padEnd(32, "0")).slice(0, 32);
  const ivData = encoder.encode(ivKey.padEnd(16, "0")).slice(0, 16);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const data = encoder.encode(JSON.stringify(payload));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivData },
    key,
    data
  );

  const encryptedBytes = new Uint8Array(encryptedBuffer);
  let binary = "";
  encryptedBytes.forEach((b) => (binary += String.fromCharCode(b)));

  // Standard Base64
  let base64 = btoa(binary);

  // Convert to URL-safe Base64
  base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return base64;
}

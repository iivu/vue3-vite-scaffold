export function validateTelephone(tel: string): boolean {
    return /^1[3456789]\d{9}$/.test(tel);
  }
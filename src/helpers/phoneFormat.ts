import { parsePhoneNumberWithError } from "libphonenumber-js";

const DEFAULT_REGION = "US";

function parsePhoneNumberOrFail(phoneNumber: string): string {
  const phoneObj = parsePhoneNumberWithError(phoneNumber, DEFAULT_REGION);
  return phoneObj.number as string;
}

function parseNationalPhoneNumberOrFail(phoneNumber: string): string {
  const phoneObj = parsePhoneNumberWithError(phoneNumber, DEFAULT_REGION);
  return phoneObj.nationalNumber as string;
}

export { parseNationalPhoneNumberOrFail, parsePhoneNumberOrFail };

import { DeliveryContents } from "../../typedefs/interfaces/deliveryContents.interface";
import twilio from "twilio";
import { parsePhoneNumberOrFail } from "../phoneFormat";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const originatorPhone = parsePhoneNumberOrFail(process.env.TWILIO_SENDER_PHONE);

async function sendSms(textMsg: DeliveryContents): Promise<void> {
  try {
    const destPhoneNum = parsePhoneNumberOrFail(textMsg.destination);
    await client.messages.create({
      body: `|\>\nSubject: ${textMsg.subject}\n\n${textMsg.text}`,
      to: destPhoneNum,
      from: originatorPhone,
    });
  } catch (err) {
    const errObj = err;
    errObj.message = `SMS send error: ${errObj.message}`;
    throw errObj;
  }
}

export { sendSms };

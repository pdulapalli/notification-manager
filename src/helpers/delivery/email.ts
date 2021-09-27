import sgMail from "@sendgrid/mail";
import { DeliveryContents } from "../../typedefs/interfaces/deliveryContents.interface";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(msg: DeliveryContents): Promise<void> {
  try {
    await sgMail.send({
      to: msg.destination,
      from: process.env.SENDGRID_VERIFIED_SENDER,
      subject: msg.subject,
      text: msg.text,
    });
  } catch (err) {
    const errObj = err;
    errObj.message = `Email send error: ${errObj.message}`;
    throw errObj;
  }
}

export { sendEmail };

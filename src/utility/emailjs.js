import emailjs from "emailjs-com";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// EmailJS is optional: without its keys in .env.local the contact form falls back to the visitor's email app
export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export async function sendEmail(formData) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    },
    PUBLIC_KEY
  );
}

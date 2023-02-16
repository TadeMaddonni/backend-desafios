import twilio from "twilio";

//agregar las credenciales para conectarse a twilio
const accountId = "AC89701427427cf214b650b8b739414294";
const tokenTwilio = "5642cb1e105ba460b8a9b7209195b767";

//twilio phone
const twilioWhatsApp = "whatsapp:+14155238886";
const adminWhatsappPhone = "whatsapp:+";

//cliente de node que se conecta al servicio de twilio
const twilioClient = twilio(accountId, tokenTwilio);

export { twilioClient, twilioWhatsApp, adminWhatsappPhone };

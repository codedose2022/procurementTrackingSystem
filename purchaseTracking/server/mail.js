import mailer from "nodemailer";
import { ForgetPassword } from "./ForgetPwdEmailTemplate.js";
const getEmailData = (to, name, template, token) => {
  let data = null;
  switch (template) {
    case "ForgetPassword":
      data = {
        from: "No Reply <sftdev16@mersatconsultants.com>",
        to,
        subject: `Procurement Portal Password Reset`,
        html: ForgetPassword(token, name),
      };
      break;
    default:
      data;
  }
  return data;
};
export const sendEmail = (to, name, type, token) => {
  const smtpTransport = mailer.createTransport({
    host: "smtp.zoho.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: "sftdev16@mersatconsultants.com",
      pass: "twHdv5Lb4KqL ",
    },
  });

  const mail = getEmailData(to, name, type, token);
  smtpTransport.sendMail(mail, function (error, response) {
   
    if (error) {
     console.log("Invalid email address");
    } else {
      console.log("Email sent successfully");
    }
    smtpTransport.close();
  });
};

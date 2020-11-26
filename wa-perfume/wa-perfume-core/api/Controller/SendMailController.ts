import nodemailer from "nodemailer";
// import handlebars from "handlebars";

const { MAIL_EMAIL, MAIL_PASS } = process.env;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_EMAIL,
    pass: MAIL_PASS
  },
  secure: true
});

function SendMailWithText( to: string, subject: string, text: string ): void {
  var options = {
    from: MAIL_EMAIL,
    to,
    subject,
    text
  };
  transporter.sendMail(options, (err, info) => {
    if ( err )
      console.log(err);
    else
      console.log("email sent to" + info.response);
  });
}

function SendVerifySignUpMailWithTemplate(to: string, subject: string, token: any, firstName: string): void {
  var node_env = process.env.NODE_ENV.trim() === "development" ? "http://localhost:3000" : "https://wa-perfumeshop.now.sh/";
  console.log(node_env);
  var options = {
    from: MAIL_EMAIL,
    to,
    subject,
    html: `
      <p>Hi ${firstName}</p>
      <p>Thanks for being our member</p>
      <p>Please verify your sign up <a href='${node_env}/verify/signup/${token}' target='_blank'>here</a></p>
    `
  };
  transporter.sendMail(options, (err, info) => {
    if ( err )
      console.log(err);
    else
      console.log("email sent to" + info.response);
  });
}
//forget-password
function SendVerifyForgetPasswordMailWithTemplate(to: string, subject: string, token: any): void {
  var node_env = process.env.NODE_ENV.trim() === "development" ? "http://localhost:3000" : "https://wa-perfumeshop.now.sh/";
  console.log(node_env);
  var options = {
    from: MAIL_EMAIL,
    to,
    subject,
    html: `
      <p>If you forget password</p>
      <p>Please click here to get new password <a href='${node_env}/verify/forget-password/${token}' target='_blank'>here</a></p>
    `
  };
  transporter.sendMail(options, (err, info) => {
    if ( err )
      console.log("err SendVerifyForgetPasswordMailWithTemplate", err);
    else
      console.log("email sent to" + info.response);
  });
}
export default {
  SendMailWithText,
  SendVerifySignUpMailWithTemplate,
  SendVerifyForgetPasswordMailWithTemplate
};